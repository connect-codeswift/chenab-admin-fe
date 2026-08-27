import type {
  OrderRow,
  OrderStatus,
  OrderStatusFilter,
} from "@/components/admin/orders/orders-types";

/* Placeholder rows lifted from Figma node 184:1888 — there is no admin API
   yet. Swap this module for query hooks once the backend contract lands. */

export const ORDERS_TOTAL = 248;

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  new: "New",
  confirmed: "Confirmed",
  packed: "Packed",
  dispatched: "Dispatched",
  delivered: "Delivered",
};

export const ORDER_STATUS_FILTERS: readonly OrderStatusFilter[] = [
  "all",
  "new",
  "confirmed",
  "packed",
  "dispatched",
  "delivered",
];

export const ORDER_FILTER_LABEL: Record<OrderStatusFilter, string> = {
  all: "All",
  ...ORDER_STATUS_LABEL,
};

export const ORDERS: readonly OrderRow[] = [
  {
    reference: "CVR-00481",
    placedOn: "04 Aug 2026",
    customer: "Ahmed Raza",
    city: "Lahore",
    itemCount: 2,
    total: 3100,
    payment: "COD",
    status: "new",
  },
  {
    reference: "CVR-00480",
    placedOn: "04 Aug 2026",
    customer: "Sara Khan",
    city: "Karachi",
    itemCount: 3,
    total: 7850,
    payment: "Bank",
    status: "confirmed",
  },
  {
    reference: "CVR-00479",
    placedOn: "03 Aug 2026",
    customer: "Usman Ali",
    city: "Islamabad",
    itemCount: 1,
    total: 2900,
    payment: "Bank",
    status: "packed",
  },
  {
    reference: "CVR-00478",
    placedOn: "03 Aug 2026",
    customer: "Fatima Malik",
    city: "Lahore",
    itemCount: 2,
    total: 4350,
    payment: "COD",
    status: "dispatched",
  },
  {
    reference: "CVR-00477",
    placedOn: "02 Aug 2026",
    customer: "Zain Qureshi",
    city: "Multan",
    itemCount: 1,
    total: 1450,
    payment: "Card",
    status: "delivered",
  },
  {
    reference: "CVR-00476",
    placedOn: "02 Aug 2026",
    customer: "Hamza Siddiqui",
    city: "Rawalpindi",
    itemCount: 4,
    total: 5200,
    payment: "Bank",
    status: "new",
  },
];
