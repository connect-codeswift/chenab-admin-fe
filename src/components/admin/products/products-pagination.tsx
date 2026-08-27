"use client";

export type ProductsPaginationProps = Readonly<{
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}>;

type PageSlot = number | "gap";

/* First, last, and the current page's neighbours; everything else collapses
   into a gap marker. */
function buildPageSlots(page: number, pageCount: number): PageSlot[] {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const slots: PageSlot[] = [1];

  if (page > 3) {
    slots.push("gap");
  }

  for (
    let value = Math.max(2, page - 1);
    value <= Math.min(pageCount - 1, page + 1);
    value += 1
  ) {
    slots.push(value);
  }

  if (page < pageCount - 2) {
    slots.push("gap");
  }

  slots.push(pageCount);

  return slots;
}

const slotBaseClass =
  "flex size-8 items-center justify-center rounded text-caption focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

const slotStateClass = {
  current: "bg-ink-primary font-medium text-surface-base",
  other:
    "cursor-pointer border border-line-subtle font-normal text-ink-muted hover:border-line-default",
} as const;

export function ProductsPagination(props: Readonly<ProductsPaginationProps>) {
  const { page, pageSize, totalCount, onPageChange } = props;
  const pageCount = Math.max(Math.ceil(totalCount / pageSize), 1);
  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalCount);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-line-subtle bg-surface-base px-6 py-4 sm:flex-row">
      <p className="text-caption text-ink-muted">
        Showing {from}–{to} of {totalCount}
      </p>

      <nav aria-label="Products pages" className="flex items-center gap-2">
        {buildPageSlots(page, pageCount).map((slot, index) => {
          if (slot === "gap") {
            return (
              <span
                key={`gap-${index}`}
                aria-hidden
                className={`${slotBaseClass} border border-line-subtle text-ink-muted`}
              >
                …
              </span>
            );
          }

          const state = slot === page ? "current" : "other";

          return (
            <button
              key={slot}
              type="button"
              aria-current={slot === page ? "page" : undefined}
              aria-label={`Page ${slot}`}
              onClick={() => onPageChange(slot)}
              className={`${slotBaseClass} ${slotStateClass[state]}`}
            >
              {slot}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
