import type { OrderStatus } from "@/components/admin/orders/orders-types";

export type OrderLineItem = Readonly<{
  id: string;
  name: string;
  packSize: string;
  quantity: number;
  lineTotal: number;
}>;

export type OrderParty = Readonly<{
  name: string;
  email: string;
  phone: string;
}>;

export type OrderPaymentDetail = Readonly<{
  method: string;
  /* Present once the payment clears; absent while it is still pending. */
  confirmedAt?: string;
  amount: number;
}>;

export type OrderTimelineEntry = Readonly<{
  id: string;
  label: string;
  actor: string;
  at: string;
}>;

export type OrderDetail = Readonly<{
  reference: string;
  status: OrderStatus;
  placedAt: string;
  customer: OrderParty;
  deliverTo: readonly string[];
  items: readonly OrderLineItem[];
  subtotal: number;
  delivery: number;
  total: number;
  payment: OrderPaymentDetail;
  timeline: readonly OrderTimelineEntry[];
}>;
