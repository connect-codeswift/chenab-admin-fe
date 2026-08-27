import { ORDER_STATUS_LABEL } from "@/components/admin/orders/orders-data";
import type { OrderStatus } from "@/components/admin/orders/orders-types";

export type OrderStatusPillProps = Readonly<{
  status: OrderStatus;
}>;

const pillClassByStatus: Record<OrderStatus, string> = {
  new: "bg-surface-sunken text-ink-muted",
  confirmed: "bg-brand-accent/12 text-brand-accent",
  packed: "bg-brand-accent/12 text-brand-accent",
  dispatched: "bg-surface-sunken text-ink-muted",
  delivered: "bg-state-positive/12 text-state-positive-ink",
};

export function OrderStatusPill(props: Readonly<OrderStatusPillProps>) {
  const { status } = props;

  return (
    <span
      className={`inline-flex rounded px-2 py-0.5 text-caption font-medium ${pillClassByStatus[status]}`}
    >
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}
