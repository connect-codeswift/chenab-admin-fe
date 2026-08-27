import type { ReactNode } from "react";

export type OrderCardProps = Readonly<{
  label?: string;
  padded?: boolean;
  className?: string;
  children: ReactNode;
}>;

/* The detail page is a stack of these — Figma node 184:2353. White card,
   hairline border, one soft shadow, and an optional 12px muted label. */
export function OrderCard(props: Readonly<OrderCardProps>) {
  const { label, padded = true, className = "", children } = props;
  const paddingClass = padded ? "p-6" : "";

  return (
    <section
      className={`rounded border border-line-subtle bg-surface-base shadow-xs ${paddingClass} ${className}`}
    >
      {label ? (
        <h2 className="text-caption text-sm font-medium text-ink-muted">
          {label}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
