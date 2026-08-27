"use client";

import { useState } from "react";
import { OrdersBulkBar } from "@/components/admin/orders/orders-bulk-bar";
import { OrdersTable } from "@/components/admin/orders/orders-table";
import { OrdersToolbar } from "@/components/admin/orders/orders-toolbar";
import type {
  OrderRow,
  OrderStatus,
  OrderStatusFilter,
} from "@/components/admin/orders/orders-types";
import type { RowSelectionState, Updater } from "@tanstack/react-table";

export type OrdersContentProps = Readonly<{
  orders: readonly OrderRow[];
}>;

function matchesSearch(order: OrderRow, search: string): boolean {
  const term = search.trim().toLowerCase();

  if (term === "") {
    return true;
  }

  return (
    order.reference.toLowerCase().includes(term) ||
    order.customer.toLowerCase().includes(term)
  );
}

export function OrdersContent(props: Readonly<OrdersContentProps>) {
  /* Held locally so a bulk action shows its result — there is no admin API to
     write the new status to yet. */
  const [orders, setOrders] = useState<readonly OrderRow[]>(props.orders);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OrderStatusFilter>("all");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const visibleOrders = orders.filter(
    (order) =>
      (status === "all" || order.status === status) &&
      matchesSearch(order, search),
  );

  function handleRowSelectionChange(updater: Updater<RowSelectionState>) {
    setRowSelection((previous) =>
      typeof updater === "function" ? updater(previous) : updater,
    );
  }

  /* Deselecting can leave a `false` behind rather than dropping the key. */
  const selectedReferences = Object.keys(rowSelection).filter(
    (reference) => rowSelection[reference],
  );
  const selectedCount = selectedReferences.length;

  function handleClearSelection() {
    setRowSelection({});
  }

  function handleMarkStatus(nextStatus: OrderStatus) {
    setOrders((previous) =>
      previous.map((order) =>
        selectedReferences.includes(order.reference)
          ? { ...order, status: nextStatus }
          : order,
      ),
    );
    handleClearSelection();
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <OrdersToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      {selectedCount > 0 ? (
        <OrdersBulkBar
          selectedCount={selectedCount}
          onMarkStatus={handleMarkStatus}
          onClear={handleClearSelection}
        />
      ) : null}

      <p aria-live="polite" className="sr-only">
        {visibleOrders.length} orders shown.
      </p>

      <OrdersTable
        orders={visibleOrders}
        rowSelection={rowSelection}
        onRowSelectionChange={handleRowSelectionChange}
      />
    </div>
  );
}
