import { OrderCard } from "@/components/admin/orders/order-card";
import type { OrderLineItem } from "@/components/admin/orders/order-detail-types";
import { formatPrice } from "@/lib/format";

export type OrderItemsCardProps = Readonly<{
  items: readonly OrderLineItem[];
  subtotal: number;
  delivery: number;
  total: number;
}>;

export function OrderItemsCard(props: Readonly<OrderItemsCardProps>) {
  const { items, subtotal, delivery, total } = props;

  return (
    <OrderCard padded={false}>
      <h2 className="border-b border-line-subtle px-6 py-4 text-sm font-medium text-ink-primary">
        Items
      </h2>

      <ul className="px-6">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`flex items-center gap-4 py-4 ${index === items.length - 1 ? "" : "border-b border-surface-sunken"}`}
          >
            <span
              aria-hidden
              className="size-10 shrink-0 rounded bg-brand-accent/10"
            />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-body-sm font-medium text-ink-primary">
                {item.name}
              </span>
              <span className="text-caption text-ink-muted">
                {item.packSize} · qty {item.quantity}
              </span>
            </span>
            <span className="shrink-0 text-body-sm font-medium text-ink-primary">
              {formatPrice(item.lineTotal)}
            </span>
          </li>
        ))}
      </ul>

      <dl className="flex flex-col gap-2 border-t border-line-subtle px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-body-sm text-ink-muted">Subtotal</dt>
          <dd className="text-body-sm text-ink-muted">
            {formatPrice(subtotal)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-body-sm text-ink-muted">Delivery</dt>
          <dd className="text-body-sm text-ink-muted">
            {formatPrice(delivery)}
          </dd>
        </div>
        <div className="mt-1 flex items-center justify-between gap-4 border-t border-surface-sunken pt-2">
          <dt className="text-body-sm font-medium text-ink-primary">Total</dt>
          <dd className="text-body-sm font-medium text-ink-primary">
            {formatPrice(total)}
          </dd>
        </div>
      </dl>
    </OrderCard>
  );
}
