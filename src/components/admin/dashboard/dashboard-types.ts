export type StatTone = "dark" | "light";
export type StatTrend = "positive" | "critical";
export type StatArrow = "up" | "down";

export type DashboardStat = Readonly<{
  id: string;
  label: string;
  value: string;
  note: string;
  tone: StatTone;
  trend: StatTrend;
  arrow: StatArrow;
}>;

export type RevenueBar = Readonly<{
  day: string;
  amount: number;
}>;

export type TopProduct = Readonly<{
  id: string;
  name: string;
  unitsSold: number;
  revenue: number;
}>;

export type OrderStatus =
  | "new"
  | "confirmed"
  | "packed"
  | "dispatched"
  | "delivered"
  | "cancelled";

export type RecentOrder = Readonly<{
  id: string;
  reference: string;
  customer: string;
  items: string;
  total: number;
  status: OrderStatus;
  placedOn: string;
}>;
