export type DashboardSummaryResponse = {
  weeklyRevenue: {
    thisWeek: string;
    lastWeek: string;
    changePercent: number | null;
  };
  ordersToday: {
    today: number;
    sameWeekdayLastWeek: number;
    changePercent: number | null;
  };
  awaitingAction: {
    count: number;
  };
  outOfStock: {
    count: number;
  };
};

export type RevenueDayResponse = {
  date: string;
  weekday: string;
  revenue: string;
  isToday: boolean;
};

export type RevenueSeriesResponse = {
  days: number;
  series: RevenueDayResponse[];
};

export type TopProductResponse = {
  skuId: string | null;
  name: string;
  size: string;
  sold: number;
  price: string;
};

export type TopProductsResponse = {
  days: number;
  products: TopProductResponse[];
};

export type RecentOrderStatus =
  | "New"
  | "Confirmed"
  | "Packed"
  | "Dispatched"
  | "Delivered"
  | "Cancelled";

export type RecentOrderResponse = {
  id: string;
  reference: string;
  customerName: string;
  items: string;
  total: string;
  status: RecentOrderStatus;
  createdAt: string;
};

export type RecentOrdersResponse = {
  orders: RecentOrderResponse[];
};
