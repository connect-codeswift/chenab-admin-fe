"use client";

import { OrderCard } from "@/components/admin/orders/order-card";
import { ORDER_STATUS_LABEL } from "@/components/admin/orders/orders-data";
import type { OrderStatus } from "@/components/admin/orders/orders-types";

export type OrderStatusCardProps = Readonly<{
  status: OrderStatus;
  onStatusChange: (status: OrderStatus) => void;
}>;

const STATUS_ORDER: readonly OrderStatus[] = [
  "new",
  "confirmed",
  "packed",
  "dispatched",
  "delivered",
];

const optionBaseClass =
  "w-full cursor-pointer rounded px-3 py-2 text-left text-body-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

const optionStateClass = {
  current: "bg-brand-accent/10 font-medium text-brand-accent",
  other: "font-normal text-ink-muted hover:bg-brand-accent/5",
} as const;

export function OrderStatusCard(props: Readonly<OrderStatusCardProps>) {
  const { status, onStatusChange } = props;

  return (
    <OrderCard label="Update status">
      <div className="flex flex-col gap-1 pt-3">
        {STATUS_ORDER.map((option) => {
          const state = option === status ? "current" : "other";

          return (
            <button
              key={option}
              type="button"
              aria-current={option === status ? "true" : undefined}
              onClick={() => onStatusChange(option)}
              className={`${optionBaseClass} ${optionStateClass[state]}`}
            >
              {ORDER_STATUS_LABEL[option]}
            </button>
          );
        })}
      </div>
    </OrderCard>
  );
}
