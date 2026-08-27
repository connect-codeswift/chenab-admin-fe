"use client";

import { useState } from "react";
import { OrderGuardedActionsCard } from "@/components/admin/orders/order-guarded-actions-card";
import { OrderItemsCard } from "@/components/admin/orders/order-items-card";
import { OrderNoteCard } from "@/components/admin/orders/order-note-card";
import { OrderPartiesCard } from "@/components/admin/orders/order-parties-card";
import { OrderPaymentCard } from "@/components/admin/orders/order-payment-card";
import { OrderStatusCard } from "@/components/admin/orders/order-status-card";
import { OrderSummaryBar } from "@/components/admin/orders/order-summary-bar";
import { OrderTimelineCard } from "@/components/admin/orders/order-timeline-card";
import type { OrderDetail } from "@/components/admin/orders/order-detail-types";
import type { OrderStatus } from "@/components/admin/orders/orders-types";

export type OrderDetailContentProps = Readonly<{
  order: OrderDetail;
}>;

export function OrderDetailContent(props: Readonly<OrderDetailContentProps>) {
  const { order } = props;
  /* Local until the status endpoint exists — the pill and the picker stay in
     step so the screen reads correctly while it is being demoed. */
  const [status, setStatus] = useState<OrderStatus>(order.status);

  return (
    <div className="flex flex-col gap-4">
      <OrderSummaryBar
        reference={order.reference}
        status={status}
        placedAt={order.placedAt}
        customerName={order.customer.name}
      />

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <OrderItemsCard
            items={order.items}
            subtotal={order.subtotal}
            delivery={order.delivery}
            total={order.total}
          />
          <OrderPartiesCard
            customer={order.customer}
            deliverTo={order.deliverTo}
          />
          <OrderPaymentCard payment={order.payment} />
          <OrderNoteCard reference={order.reference} />
          <OrderTimelineCard entries={order.timeline} />
        </div>

        <div className="flex w-full shrink-0 flex-col gap-4 lg:w-70">
          <OrderStatusCard status={status} onStatusChange={setStatus} />
          <OrderGuardedActionsCard />
        </div>
      </div>
    </div>
  );
}
