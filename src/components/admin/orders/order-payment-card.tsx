"use client";

import { Icon } from "@iconify/react";
import { OrderCard } from "@/components/admin/orders/order-card";
import type { OrderPaymentDetail } from "@/components/admin/orders/order-detail-types";
import { formatPrice } from "@/lib/format";

export type OrderPaymentCardProps = Readonly<{
  payment: OrderPaymentDetail;
}>;

export function OrderPaymentCard(props: Readonly<OrderPaymentCardProps>) {
  const { payment } = props;

  return (
    <OrderCard label="Payment">
      <div className="flex flex-col gap-2 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <p className="text-body-sm font-medium text-ink-primary">
            {payment.method}
          </p>
          {payment.confirmedAt ? (
            <p className="flex items-center gap-1 pt-0.5 text-body-sm text-state-positive-ink">
              <Icon
                icon="mdi:check-circle"
                className="size-3.5 shrink-0"
                aria-hidden
              />
              Confirmed — {payment.confirmedAt}
            </p>
          ) : (
            <p className="pt-0.5 text-body-sm text-ink-muted">
              Awaiting confirmation
            </p>
          )}
        </div>
        <p className="text-body font-medium text-ink-primary">
          {formatPrice(payment.amount)}
        </p>
      </div>
    </OrderCard>
  );
}
