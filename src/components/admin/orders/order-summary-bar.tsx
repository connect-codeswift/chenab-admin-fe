import Image from "next/image";
import Link from "next/link";
import { OrderStatusPill } from "@/components/admin/orders/order-status-pill";
import type { OrderStatus } from "@/components/admin/orders/orders-types";

export type OrderSummaryBarProps = Readonly<{
  reference: string;
  status: OrderStatus;
  placedAt: string;
  customerName: string;
}>;

export function OrderSummaryBar(props: Readonly<OrderSummaryBarProps>) {
  const { reference, status, placedAt, customerName } = props;

  return (
    <div className="flex items-start gap-4 rounded bg-surface-base/70 p-4 sm:gap-6">
      <Link
        href="/orders"
        aria-label="Back to orders"
        className="shrink-0 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
      >
        <Image
          src="/icons/admin/arrow-back.svg"
          alt=""
          width={28}
          height={28}
          className="size-7"
        />
      </Link>

      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-h4 text-ink-primary sm:text-h3">{reference}</h2>
          <OrderStatusPill status={status} />
        </div>
        <p className="pt-1 text-body-sm text-ink-muted">
          Placed {placedAt} — {customerName}
        </p>
      </div>
    </div>
  );
}
