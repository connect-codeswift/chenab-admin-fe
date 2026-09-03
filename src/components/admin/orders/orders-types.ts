export type OrderStatus =
  "new" | "confirmed" | "packed" | "dispatched" | "delivered";

export type OrderPayment = "COD" | "Bank" | "Card";

export type OrderRow = Readonly<{
  id: string;
  reference: string;
  placedOn: string;
  customer: string;
  city: string;
  itemCount: number;
  total: number;
  payment: OrderPayment;
  status: OrderStatus;
}>;

export type OrderStatusFilter = OrderStatus | "all";
