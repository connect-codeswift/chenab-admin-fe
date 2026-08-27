"use client";

const actionClass =
  "w-full cursor-pointer rounded py-1 text-center text-body-sm text-state-critical hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

/* Both actions are destructive and have no endpoint yet, so they are left
   inert rather than wired to something that silently does nothing. */
export function OrderGuardedActionsCard() {
  return (
    <section className="rounded border border-state-critical/20 bg-surface-base p-6 shadow-xs">
      <h2 className="text-caption text-sm font-medium text-ink-muted">
        Guarded actions
      </h2>
      <div className="flex flex-col items-center gap-2 pt-3.5">
        <button type="button" className={actionClass}>
          Cancel order
        </button>
        <button type="button" className={actionClass}>
          Issue refund
        </button>
      </div>
    </section>
  );
}
