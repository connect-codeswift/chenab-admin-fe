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
import { useOrders } from "@/hooks/use-orders";
import { toOrderRow } from "@/services/order.mapper";
import type { RowSelectionState, Updater } from "@tanstack/react-table";

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

export function OrdersContent() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useOrders(page);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OrderStatusFilter>("all");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const apiOrders: readonly OrderRow[] = (data?.orders ?? []).map(toOrderRow);

  const visibleOrders = apiOrders.filter(
    (order) =>
      (status === "all" || order.status === status) &&
      matchesSearch(order, search),
  );

  function handleRowSelectionChange(updater: Updater<RowSelectionState>) {
    setRowSelection((previous) =>
      typeof updater === "function" ? updater(previous) : updater,
    );
  }

  const selectedReferences = Object.keys(rowSelection).filter(
    (reference) => rowSelection[reference],
  );
  const selectedCount = selectedReferences.length;

  function handleClearSelection() {
    setRowSelection({});
  }

  // Optimistic local status update (no write API yet)
  const [localOverrides, setLocalOverrides] = useState<
    Record<string, OrderStatus>
  >({});

  function handleMarkStatus(nextStatus: OrderStatus) {
    const overrides: Record<string, OrderStatus> = {};
    for (const ref of selectedReferences) {
      overrides[ref] = nextStatus;
    }
    setLocalOverrides((prev) => ({ ...prev, ...overrides }));
    handleClearSelection();
  }

  const displayedOrders = visibleOrders.map((order) =>
    localOverrides[order.reference]
      ? { ...order, status: localOverrides[order.reference] }
      : order,
  );

  const totalPages = data?.pagination.totalPages ?? 1;

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-4">
        <p className="text-body-sm text-ink-muted">Loading orders…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full flex-col gap-4">
        <p className="text-body-sm text-state-critical">
          {error.message ?? "Failed to load orders."}
        </p>
      </div>
    );
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
        {displayedOrders.length} orders shown.
      </p>

      <OrdersTable
        orders={displayedOrders}
        rowSelection={rowSelection}
        onRowSelectionChange={handleRowSelectionChange}
      />

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded px-3 py-1.5 text-body-sm text-ink-primary transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-body-sm text-ink-muted">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded px-3 py-1.5 text-body-sm text-ink-primary transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
