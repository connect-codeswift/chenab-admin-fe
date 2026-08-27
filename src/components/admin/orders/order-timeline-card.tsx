import { OrderCard } from "@/components/admin/orders/order-card";
import type { OrderTimelineEntry } from "@/components/admin/orders/order-detail-types";

export type OrderTimelineCardProps = Readonly<{
  entries: readonly OrderTimelineEntry[];
}>;

export function OrderTimelineCard(props: Readonly<OrderTimelineCardProps>) {
  const { entries } = props;

  return (
    <OrderCard label="Timeline">
      <ol className="flex flex-col gap-4 pt-4">
        {entries.map((entry) => (
          <li key={entry.id} className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-1.5 size-1.75 shrink-0 rounded-full bg-brand-accent"
            />
            <span className="flex flex-col">
              <span className="text-body-sm font-medium text-ink-primary">
                {entry.label}
              </span>
              <span className="text-caption text-ink-muted">
                {entry.actor} · {entry.at}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </OrderCard>
  );
}
