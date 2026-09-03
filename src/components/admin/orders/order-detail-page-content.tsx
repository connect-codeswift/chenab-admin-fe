"use client";

import { OrderDetailContent } from "@/components/admin/orders/order-detail-content";
import { useOrder } from "@/hooks/use-order";
import { toOrderDetail } from "@/services/order.mapper";

export type OrderDetailPageContentProps = Readonly<{
  /** The order reference or ID from the URL. */
  reference: string;
}>;

export function OrderDetailPageContent(
  props: Readonly<OrderDetailPageContentProps>,
) {
  const { reference } = props;
  const { data, isLoading, error } = useOrder(reference);

  if (isLoading) {
    return (
      <p className="p-4 text-body-sm text-ink-muted">Loading order…</p>
    );
  }

  if (error || !data) {
    return (
      <p className="p-4 text-body-sm text-state-critical">
        {error?.message ?? "Order not found."}
      </p>
    );
  }

  const order = toOrderDetail(data.order);

  return <OrderDetailContent order={order} />;
}
