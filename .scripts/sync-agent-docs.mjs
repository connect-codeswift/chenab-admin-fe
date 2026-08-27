#!/usr/bin/env node
/**
 * Sync the agent-facing docs that exist in two places.
 *
 *   AGENTS.md                        -> CLAUDE.md            (byte-identical copy)
 *   .claude/skills/<n>/SKILL.md      -> .cursor/rules/<n>.mdc (body only)
 *
 * The left-hand file is the source of truth in both cases. For skills only the
 * body is copied: each `.mdc` keeps its own frontmatter, because Cursor needs
 * `globs` / `alwaysApply` keys that a skill's frontmatter does not have.
 *
 *   node .scripts/sync-agent-docs.mjs           write the targets
 *   node .scripts/sync-agent-docs.mjs --check   report drift, write nothing, exit 1
 *
 * Run it after `npm run format` — Prettier formats `SKILL.md` (a `.md` file) but
 * not `.mdc`, so formatting the source is what creates drift.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = path.join(ROOT, ".claude", "skills");
const RULES_DIR = path.join(ROOT, ".cursor", "rules");

const check = process.argv.includes("--check");
const rel = (p) => path.relative(ROOT, p);

/** Results are collected so the run prints one table instead of a scroll. */
const results = [];
const record = (status, target, note) => results.push({ status, target, note });

// ---------------------------------------------------------------------------
// Frontmatter
// ---------------------------------------------------------------------------

/** Split `---\n…\n---\n` off the front. Returns null frontmatter when absent. */
function splitFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) return { frontmatter: null, body: text };
  return { frontmatter: match[0].trimEnd(), body: text.slice(match[0].length) };
}

function readFrontmatterField(frontmatter, field) {
  const match = new RegExp(`^${field}:\\s*(.+)$`, "m").exec(frontmatter ?? "");
  return match ? match[1].trim() : null;
}

/**
 * Strip the leading banner comment and surrounding blank lines, so a body can be
 * re-banner'd for its target without accumulating stale comments.
 */
function stripBanner(body) {
  return body
    .replace(
      /^\s*<!--\s*(?:Mirror of|Generated from|Source of truth)[\s\S]*?-->\s*/,
      "",
    )
    .replace(/^\s+/, "");
}

const bannerFor = (name) =>
  `<!-- Generated from .claude/skills/${name}/SKILL.md by \`npm run sync\` — edit the skill, not this file. -->`;

// ---------------------------------------------------------------------------
// AGENTS.md -> CLAUDE.md
// ---------------------------------------------------------------------------

function syncAgentInstructions() {
  const source = path.join(ROOT, "AGENTS.md");
  const target = path.join(ROOT, "CLAUDE.md");

  if (!fs.existsSync(source)) {
    record("missing", rel(source), "source does not exist");
    return;
  }

  const wanted = fs.readFileSync(source, "utf8");
  const current = fs.existsSync(target)
    ? fs.readFileSync(target, "utf8")
    : null;

  if (current === wanted) {
    record("ok", rel(target));
    return;
  }
  if (check) {
    record(
      "drift",
      rel(target),
      current === null ? "missing" : "differs from AGENTS.md",
    );
    return;
  }
  fs.writeFileSync(target, wanted);
  record(current === null ? "created" : "written", rel(target));
}

// ---------------------------------------------------------------------------
// Skills -> Cursor rules
// ---------------------------------------------------------------------------

function listSkills() {
  if (!fs.existsSync(SKILLS_DIR)) return [];
  return fs
    .readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      name: entry.name,
      file: path.join(SKILLS_DIR, entry.name, "SKILL.md"),
    }))
    .filter((skill) => fs.existsSync(skill.file))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Frontmatter for a rule that does not exist yet, seeded from the skill's own. */
function seedFrontmatter(skillFrontmatter, name) {
  const description =
    readFrontmatterField(skillFrontmatter, "description") ?? name;
  return `---\ndescription: ${description}\nglobs: "**/*"\nalwaysApply: false\n---`;
}

function syncSkill(skill) {
  const target = path.join(RULES_DIR, `${skill.name}.mdc`);
  const source = splitFrontmatter(fs.readFileSync(skill.file, "utf8"));
  const exists = fs.existsSync(target);

  // Keep the rule's own frontmatter — Cursor needs globs/alwaysApply.
  let frontmatter;
  let seeded = false;
  if (exists) {
    frontmatter = splitFrontmatter(fs.readFileSync(target, "utf8")).frontmatter;
    if (frontmatter === null) {
      record(
        "skipped",
        rel(target),
        "no frontmatter — fix by hand, refusing to guess",
      );
      return;
    }
  } else {
    frontmatter = seedFrontmatter(source.frontmatter, skill.name);
    seeded = true;
  }

  const body = stripBanner(source.body).trimEnd();
  const wanted = `${frontmatter}\n\n${bannerFor(skill.name)}\n\n${body}\n`;
  const current = exists ? fs.readFileSync(target, "utf8") : null;

  if (current === wanted) {
    record("ok", rel(target));
    return;
  }
  if (check) {
    record(
      "drift",
      rel(target),
      exists ? "body differs from SKILL.md" : "rule missing",
    );
    return;
  }
  if (!exists) fs.mkdirSync(RULES_DIR, { recursive: true });
  fs.writeFileSync(target, wanted);
  record(
    seeded ? "created" : "written",
    rel(target),
    seeded ? "seeded frontmatter — set `globs` by hand" : undefined,
  );
}

/** A rule with no matching skill is a leftover, and no script should delete it silently. */
function reportOrphanRules(skills) {
  if (!fs.existsSync(RULES_DIR)) return;
  const known = new Set(skills.map((skill) => skill.name));
  for (const file of fs.readdirSync(RULES_DIR).sort()) {
    if (!file.endsWith(".mdc")) continue;
    const name = file.slice(0, -".mdc".length);
    if (!known.has(name)) {
      record(
        "orphan",
        rel(path.join(RULES_DIR, file)),
        "no matching skill — delete it or add one",
      );
    }
  }
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

syncAgentInstructions();
const skills = listSkills();
skills.forEach(syncSkill);
reportOrphanRules(skills);

const LABEL = {
  ok: "  ok      ",
  written: "  synced  ",
  created: "  created ",
  drift: "  DRIFT   ",
  orphan: "  orphan  ",
  skipped: "  skipped ",
  missing: "  MISSING ",
};

for (const { status, target, note } of results) {
  console.log(`${LABEL[status]}${target}${note ? `  — ${note}` : ""}`);
}

const drifted = results.filter(
  (r) => r.status === "drift" || r.status === "missing",
);
if (check && drifted.length > 0) {
  console.error(
    `\n${drifted.length} file(s) out of sync. Run \`npm run sync\` and commit the result.`,
  );
  process.exit(1);
}
if (!check) {
  const changed = results.filter(
    (r) => r.status === "written" || r.status === "created",
  ).length;
  console.log(
    changed === 0 ? "\nAlready in sync." : `\n${changed} file(s) updated.`,
  );
}
