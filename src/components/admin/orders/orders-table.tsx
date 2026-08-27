"use client";

import Link from "next/link";
import { OrderStatusPill } from "@/components/admin/orders/order-status-pill";
import type { OrderRow } from "@/components/admin/orders/orders-types";
import { formatPrice } from "@/lib/format";
import {
  createDataTableColumnHelper,
  DataTable,
} from "@/components/ui/data-table";
import type { RowSelectionState, Updater } from "@tanstack/react-table";

export type OrdersTableProps = Readonly<{
  orders: readonly OrderRow[];
  rowSelection: RowSelectionState;
  onRowSelectionChange: (updater: Updater<RowSelectionState>) => void;
}>;

const checkboxClass = "control-checkbox";

/* The orders table draws its hairlines darker than the dashboard's and sets
   its column heads in muted ink — Figma node 181:14664. */
const headCellClass =
  "border-b border-line-subtle py-4 text-caption font-bold tracking-wider text-ink-muted uppercase";
const bodyCellClass =
  "border-b border-surface-container py-4 text-body-sm text-ink-muted";

const helper = createDataTableColumnHelper<OrderRow>();

const columns = helper.columns([
  helper.display({
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        aria-label="Select all orders"
        className={checkboxClass}
        checked={table.getIsAllRowsSelected()}
        ref={(node) => {
          if (node) {
            node.indeterminate =
              !table.getIsAllRowsSelected() && table.getIsSomeRowsSelected();
          }
        }}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        aria-label={`Select order ${row.original.reference}`}
        className={checkboxClass}
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }),
  helper.accessor("reference", {
    header: "Reference",
    cell: (info) => (
      <Link
        href={`/admin/orders/${info.getValue()}`}
        className="rounded hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
      >
        {info.getValue()}
      </Link>
    ),
    meta: { isRowHeader: true, cellClass: "font-mono text-ink-primary" },
  }),
  helper.accessor("placedOn", { header: "Date" }),
  helper.accessor("customer", {
    header: "Customer",
    meta: { cellClass: "text-ink-primary" },
  }),
  helper.accessor("city", { header: "City" }),
  helper.accessor("itemCount", {
    header: "Items",
    cell: (info) =>
      `${info.getValue()} ${info.getValue() === 1 ? "item" : "items"}`,
  }),
  helper.accessor("total", {
    header: "Total",
    cell: (info) => formatPrice(info.getValue()),
    meta: { cellClass: "font-medium text-ink-primary" },
  }),
  helper.accessor("payment", { header: "Payment" }),
  helper.accessor("status", {
    header: "Status",
    cell: (info) => <OrderStatusPill status={info.getValue()} />,
  }),
]);

export function OrdersTable(props: Readonly<OrdersTableProps>) {
  const { orders, rowSelection, onRowSelectionChange } = props;

  return (
    <div className="overflow-clip rounded bg-surface-base/70">
      <DataTable
        caption="Orders"
        columns={columns}
        data={orders}
        getRowId={(order) => order.reference}
        rowSelection={rowSelection}
        onRowSelectionChange={onRowSelectionChange}
        headCellClass={headCellClass}
        bodyCellClass={bodyCellClass}
        emptyMessage="No orders match these filters."
      />
    </div>
  );
}
