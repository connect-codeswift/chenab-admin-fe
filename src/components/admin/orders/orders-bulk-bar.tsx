"use client";

import type { OrderStatus } from "@/components/admin/orders/orders-types";

export type OrdersBulkBarProps = Readonly<{
  selectedCount: number;
  onMarkStatus: (status: OrderStatus) => void;
  onClear: () => void;
}>;

const BULK_ACTIONS: readonly Readonly<{
  status: OrderStatus;
  label: string;
}>[] = [
  { status: "confirmed", label: "Mark Confirmed" },
  { status: "dispatched", label: "Mark Dispatched" },
];

const actionClass =
  "cursor-pointer rounded bg-brand-accent px-4 py-2 text-body-sm font-medium text-surface-base transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent motion-reduce:transition-none";

export function OrdersBulkBar(props: Readonly<OrdersBulkBarProps>) {
  const { selectedCount, onMarkStatus, onClear } = props;

  return (
    <div
      role="status"
      className="flex flex-wrap items-center gap-3 rounded bg-brand-deep px-4 py-2.5 sm:px-6"
    >
      <p className="text-body-sm text-ink-on-deep">{selectedCount} selected</p>

      {BULK_ACTIONS.map((action) => (
        <button
          key={action.status}
          type="button"
          onClick={() => onMarkStatus(action.status)}
          className={actionClass}
        >
          {action.label}
        </button>
      ))}

      <button
        type="button"
        onClick={onClear}
        className="ml-auto cursor-pointer rounded text-body-sm text-ink-on-deep-muted hover:text-ink-on-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
      >
        Clear
      </button>
    </div>
  );
}
