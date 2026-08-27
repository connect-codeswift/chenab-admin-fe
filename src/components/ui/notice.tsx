import type { ReactNode } from "react";

export type NoticeProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

/* A quiet status strip. Used where an action completed its client-side work
   but has no endpoint to send anything to yet. */
export function Notice(props: Readonly<NoticeProps>) {
  const { children, className = "" } = props;

  return (
    <p
      role="status"
      className={`rounded border border-line-subtle bg-surface-sunken px-4 py-3 text-body-sm text-ink-muted ${className}`}
    >
      {children}
    </p>
  );
}
