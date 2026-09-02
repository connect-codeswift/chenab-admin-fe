"use client";

import { Icon } from "@iconify/react";
import {
  ORDER_FILTER_LABEL,
  ORDER_STATUS_FILTERS,
} from "@/components/admin/orders/orders-data";
import type { OrderStatusFilter } from "@/components/admin/orders/orders-types";

export type OrdersToolbarProps = Readonly<{
  search: string;
  onSearchChange: (value: string) => void;
  status: OrderStatusFilter;
  onStatusChange: (value: OrderStatusFilter) => void;
}>;

const filterBaseClass =
  "flex h-10 shrink-0 cursor-pointer items-center justify-center rounded border px-4 text-body-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

const filterStateClass = {
  active: "border-ink-primary bg-ink-primary font-medium text-surface-base",
  idle: "border-line-subtle bg-surface-base font-normal text-ink-muted hover:border-line-default",
} as const;

export function OrdersToolbar(props: Readonly<OrdersToolbarProps>) {
  const { search, onSearchChange, status, onStatusChange } = props;

  return (
    <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
      <div className="relative w-full lg:w-75">
        <label className="sr-only" htmlFor="orders-search">
          Search orders
        </label>
        <Icon
          icon="mdi:magnify"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-subtle"
          aria-hidden
        />
        <input
          id="orders-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search order ID or customer"
          className="h-11 w-full rounded border border-line-default bg-surface-base/70 py-2.5 pr-3 pl-9 text-body-sm text-ink-primary outline-none placeholder:text-ink-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
        />
      </div>

      <div
        role="group"
        aria-label="Filter orders by status"
        className="scrollbar-none flex w-full gap-2 overflow-x-auto lg:w-auto"
      >
        {ORDER_STATUS_FILTERS.map((filter) => {
          const state = filter === status ? "active" : "idle";

          return (
            <button
              key={filter}
              type="button"
              aria-pressed={filter === status}
              onClick={() => onStatusChange(filter)}
              className={`${filterBaseClass} ${filterStateClass[state]}`}
            >
              {ORDER_FILTER_LABEL[filter]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
