import type { ReactNode } from "react";

/* Shared control skin for the admin forms — Figma uses one input treatment
   across every editor field. */
/* No width here on purpose: a `w-full` in this string outranks the fixed
   widths callers set (Tailwind orders `.w-full` after `.w-20`), which silently
   stretched the SKU inputs. Controls inside FormField stretch by flex; anything
   else states its own width. */
export const controlClass =
  "rounded border border-line-default bg-surface-base px-3 py-2.5 text-body-sm text-ink-primary outline-none placeholder:text-ink-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

export type FormFieldProps = Readonly<{
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}>;

export function FormField(props: Readonly<FormFieldProps>) {
  const {
    label,
    htmlFor,
    required,
    error,
    hint,
    className = "",
    children,
  } = props;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="text-caption font-medium text-ink-muted"
      >
        {label}
        {required ? " *" : null}
      </label>
      {children}
      {hint ? <p className="text-caption text-ink-muted">{hint}</p> : null}
      {error ? (
        <p role="alert" className="text-caption text-state-critical">
          {error}
        </p>
      ) : null}
    </div>
  );
}
