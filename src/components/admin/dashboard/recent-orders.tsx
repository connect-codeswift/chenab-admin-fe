"use client";

import Link from "next/link";
import type {
  OrderStatus,
  RecentOrder,
} from "@/components/admin/dashboard/dashboard-types";
import { formatPrice } from "@/components/products/products-data";
import {
  createDataTableColumnHelper,
  DataTable,
} from "@/components/ui/data-table";

export type RecentOrdersProps = Readonly<{
  orders: readonly RecentOrder[];
}>;

const statusLabel: Record<OrderStatus, string> = {
  delivered: "Delivered",
  processing: "Processing",
  pending: "Pending",
  cancelled: "Cancelled",
};

const statusPillClass: Record<OrderStatus, string> = {
  delivered: "bg-state-positive/12 text-state-positive-ink",
  processing: "bg-brand-accent/12 text-brand-accent",
  pending: "bg-surface-sunken text-ink-muted",
  cancelled: "bg-state-critical/10 text-state-critical",
};

const helper = createDataTableColumnHelper<RecentOrder>();

const columns = helper.columns([
  helper.accessor("reference", {
    header: "Order",
    meta: { isRowHeader: true, cellClass: "font-medium text-ink-primary" },
  }),
  helper.accessor("customer", { header: "Customer" }),
  helper.accessor("items", {
    header: "Items",
    meta: { cellClass: "text-ink-muted" },
  }),
  helper.accessor("total", {
    header: "Total",
    cell: (info) => formatPrice(info.getValue()),
  }),
  helper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();

      return (
        <span
          className={`inline-flex rounded px-2 py-0.5 text-caption font-medium ${statusPillClass[status]}`}
        >
          {statusLabel[status]}
        </span>
      );
    },
  }),
  helper.accessor("placedOn", {
    header: "Date",
    meta: { align: "right", cellClass: "text-ink-muted" },
  }),
]);

export function RecentOrders(props: Readonly<RecentOrdersProps>) {
  const { orders } = props;

  return (
    <section
      aria-labelledby="recent-orders"
      className="flex flex-col overflow-clip rounded border border-surface-base bg-surface-base/70 panel-glow"
    >
      <div className="flex items-center justify-between gap-4 border-b border-surface-container px-6 pt-6 pb-4">
        <h2 id="recent-orders" className="text-body text-ink-primary">
          Recent orders
        </h2>
        <Link
          href="/admin/orders"
          className="rounded text-body-sm font-medium text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
        >
          View all
        </Link>
      </div>

      <DataTable
        caption="Recent orders"
        columns={columns}
        data={orders}
        emptyMessage="No orders have been placed yet."
      />
    </section>
  );
}
