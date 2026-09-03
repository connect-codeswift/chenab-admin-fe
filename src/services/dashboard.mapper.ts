import type {
  DashboardStat,
  OrderStatus,
  RecentOrder,
  RevenueBar,
  TopProduct,
} from "@/components/admin/dashboard/dashboard-types";
import type {
  DashboardSummaryResponse,
  RecentOrderResponse,
  RecentOrdersResponse,
  RecentOrderStatus,
  RevenueSeriesResponse,
  TopProductsResponse,
} from "@/lib/api/dashboard-types";
import { formatPrice } from "@/lib/format";

function formatCompactPrice(amount: number): string {
  if (amount >= 1_000_000) {
    return `Rs. ${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `Rs. ${Math.round(amount / 1_000)}k`;
  }
  return formatPrice(amount);
}

function formatChangeNote(changePercent: number | null): string {
  if (changePercent === null) {
    return "No comparison yet";
  }
  const sign = changePercent > 0 ? "+" : "";
  return `${sign}${changePercent}% vs last week`;
}

function changeTrend(changePercent: number | null): {
  trend: DashboardStat["trend"];
  arrow: DashboardStat["arrow"];
} {
  if (changePercent === null || changePercent >= 0) {
    return { trend: "positive", arrow: "up" };
  }
  return { trend: "critical", arrow: "down" };
}

export function toDashboardStats(
  summary: DashboardSummaryResponse,
): readonly DashboardStat[] {
  const thisWeekRevenue = Number(summary.weeklyRevenue.thisWeek);
  const revenueTrend = changeTrend(summary.weeklyRevenue.changePercent);
  const ordersTrend = changeTrend(summary.ordersToday.changePercent);

  return [
    {
      id: "weekly-revenue",
      label: "Weekly revenue",
      value: formatCompactPrice(thisWeekRevenue),
      note: formatChangeNote(summary.weeklyRevenue.changePercent),
      tone: "dark",
      ...revenueTrend,
    },
    {
      id: "orders-today",
      label: "Orders Today",
      value: String(summary.ordersToday.today),
      note: formatChangeNote(summary.ordersToday.changePercent),
      tone: "light",
      ...ordersTrend,
    },
    {
      id: "awaiting-action",
      label: "Awaiting Action",
      value: String(summary.awaitingAction.count),
      note: "New orders unconfirmed",
      tone: "light",
      trend: summary.awaitingAction.count > 0 ? "critical" : "positive",
      arrow: summary.awaitingAction.count > 0 ? "down" : "up",
    },
    {
      id: "out-of-stock",
      label: "Out of Stock",
      value: String(summary.outOfStock.count),
      note: "SKUs need restocking",
      tone: "light",
      trend: summary.outOfStock.count > 0 ? "critical" : "positive",
      arrow: summary.outOfStock.count > 0 ? "down" : "up",
    },
  ];
}

export function toRevenueBars(
  series: RevenueSeriesResponse,
): readonly RevenueBar[] {
  return series.series.map((day) => ({
    day: day.weekday,
    amount: Number(day.revenue),
  }));
}

export function toTopProducts(
  result: TopProductsResponse,
): readonly TopProduct[] {
  return result.products.map((product, index) => ({
    id: product.skuId ?? `${product.name}-${index}`,
    name: product.name,
    unitsSold: product.sold,
    revenue: Number(product.price),
  }));
}

const STATUS_MAP: Record<RecentOrderStatus, OrderStatus> = {
  New: "new",
  Confirmed: "confirmed",
  Packed: "packed",
  Dispatched: "dispatched",
  Delivered: "delivered",
  Cancelled: "cancelled",
};

function formatPlacedOn(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function toRecentOrder(order: RecentOrderResponse): RecentOrder {
  return {
    id: order.id,
    reference: order.reference,
    customer: order.customerName,
    items: order.items,
    total: Number(order.total),
    status: STATUS_MAP[order.status],
    placedOn: formatPlacedOn(order.createdAt),
  };
}

export function toRecentOrders(
  result: RecentOrdersResponse,
): readonly RecentOrder[] {
  return result.orders.map(toRecentOrder);
}
