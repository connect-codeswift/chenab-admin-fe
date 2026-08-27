import {
  DASHBOARD_DATE_LABEL,
  DASHBOARD_GREETING_NAME,
} from "@/components/admin/dashboard/dashboard-data";

export type AdminHeaderProps = Readonly<{
  title?: string;
  /* Rendered in accent after the title — the admin's name today. */
  accent?: string;
  /* Muted line beside the title, e.g. "248 orders total". */
  subtitle?: string;
  meta?: string;
}>;

/* The greeting accent belongs to the default heading only — a screen that
   names itself ("Orders") must not inherit "Boss". */
function resolveAccent(props: Readonly<AdminHeaderProps>): string | undefined {
  if (props.accent !== undefined) {
    return props.accent;
  }

  if (props.title !== undefined) {
    return undefined;
  }

  return DASHBOARD_GREETING_NAME;
}

/* Pinned above the admin panel's scroll region. The defaults are the shell
   greeting; a screen that needs its own heading passes its own. */
export function AdminHeader(props: Readonly<AdminHeaderProps>) {
  const { title = "Welcome In", subtitle, meta = DASHBOARD_DATE_LABEL } = props;
  const accent = resolveAccent(props);

  return (
    <header className="flex shrink-0 flex-col items-start justify-between gap-2 p-2 pt-6 backdrop-blur-md sm:flex-row sm:items-center">
      <div className="flex items-end gap-2">
        <h1 className="text-h3 text-ink-primary sm:text-h2">
          {title}
          {accent ? (
            <>
              {" "}
              <span className="text-brand-accent">{accent}</span>
            </>
          ) : null}
        </h1>
        {subtitle ? (
          <p className="pb-1 text-body-sm text-ink-muted">{subtitle}</p>
        ) : null}
      </div>
      {meta ? <p className="text-body-sm text-ink-muted">{meta}</p> : null}
    </header>
  );
}
