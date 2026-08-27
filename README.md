# Chenab Valley Rice — Storefront

The public website, online store and private admin panel for **Chenab Valley Rice**, a premium
basmati brand. Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind v4.

> **Status: scaffold.** `src/` currently holds the `create-next-app` starter. The screens below
> are specified but not yet built.

**Start here:** [`.docs/DEVELOPER.md`](.docs/DEVELOPER.md) — routes, domain model, states and
integration points.

| Doc                                        | For                                                               |
| ------------------------------------------ | ----------------------------------------------------------------- |
| [`.docs/DEVELOPER.md`](.docs/DEVELOPER.md) | Implementation guide — routes, domain model, states, integrations |
| [`.docs/GIT.md`](.docs/GIT.md)             | Branching and PR workflow. **We never rebase**                    |
| [`.docs/OVERVIEW.md`](.docs/OVERVIEW.md)   | Full design brief; much of it is for the designer                 |
| [`AGENTS.md`](AGENTS.md)                   | Code conventions                                                  |

## What this app is

| Area       | Screens       | Covers                                                                          |
| ---------- | ------------- | ------------------------------------------------------------------------------- |
| Storefront | `S-01`–`S-06` | Home, Shop, Product detail, Cart, Checkout, Order confirmation                  |
| Editorial  | `S-07`–`S-13` | Our Valley, Quality, Recipes, Delivery & returns, Where to buy, Trade & contact |
| Mobile     | `M-01`–`M-09` | Drawn as separate deliverables — the phone is the primary shopping device       |
| System     | `S-14`        | Search, not-found, loading, empty, error, out-of-stock, consent                 |
| Admin      | `A-1`–`A-8`   | Sign in, dashboard, orders, products, trade inquiries, content, settings        |

Checkout is **guest by default**, with cash on delivery alongside card and bank transfer, and
order confirmation by email and WhatsApp.

The interface is **English only** — there is no bilingual mode, no locale switching and no RTL
layout. Do not add i18n routing or a language toggle.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                 | Does                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `npm run dev`          | Dev server                                                                         |
| `npm run build`        | Production build — **this is the real typecheck**                                  |
| `npm run start`        | Serve the production build                                                         |
| `npm run lint`         | ESLint (`eslint-config-next`, core-web-vitals + typescript)                        |
| `npm run format`       | Prettier, incl. Tailwind class sorting                                             |
| `npm run format:check` | Prettier in check mode                                                             |
| `npm run sync`         | Regenerate `CLAUDE.md` from `AGENTS.md`, and `.cursor/rules/*.mdc` from the skills |
| `npm run sync:check`   | Same, read-only — fails if any generated file drifted                              |

There are **no tests**. A change is done when `npm run lint`, `npm run build` and
`npm run sync:check` are all green.

## Stack notes

- **Next.js 16 App Router.** Conventions differ from older Next — check
  `node_modules/next/dist/docs/` rather than relying on memory.
- **React Compiler is on** (`reactCompiler: true` in `next.config.ts`). Do not add `useMemo`,
  `useCallback` or `memo` for performance.
- **Tailwind v4** — no `tailwind.config.js`. Tokens are declared in `@theme inline` in
  `src/app/globals.css`.
- **Prettier** with `prettier-plugin-tailwindcss`, pointed at `globals.css` via
  `tailwindStylesheet` (the v4 replacement for `tailwindConfig`).
- Path alias `@/*` → `./src/*`.

## Branding is not decided yet

Identity locks in week 3 of the plan. Every colour, mark and typeface is a **named token, not a
value** — build against variables from day one so the identity drops into a finished structure.
See [§2 Foundations](.docs/OVERVIEW.md#2-foundations) for the token list and its constraints.

## Deployment

Vercel, configured in `vercel.json`. The `ignoreCommand` builds on **production only** and skips
preview deployments.

## Conventions for contributors and agents

[AGENTS.md](AGENTS.md) — house rules, structure and the verification loop.

Two sets of files are generated, never hand-edited:

| Source of truth                  | Generated                  |
| -------------------------------- | -------------------------- |
| `AGENTS.md`                      | `CLAUDE.md`                |
| `.claude/skills/<name>/SKILL.md` | `.cursor/rules/<name>.mdc` |

Edit the left column, run `npm run sync`, commit both. `npm run sync:check` fails the build if
they drift — wire it into CI alongside lint.
