import { apiRequest } from "@/lib/api/client";
import type {
  DashboardSummaryResponse,
  RecentOrdersResponse,
  RevenueSeriesResponse,
  TopProductsResponse,
} from "@/lib/api/dashboard-types";

export function getDashboardSummary(): Promise<DashboardSummaryResponse> {
  return apiRequest<DashboardSummaryResponse>("/api/v1/dashboard/summary", {
    method: "GET",
  });
}

export function getDashboardRevenue(): Promise<RevenueSeriesResponse> {
  return apiRequest<RevenueSeriesResponse>("/api/v1/dashboard/revenue", {
    method: "GET",
  });
}

export function getDashboardTopProducts(): Promise<TopProductsResponse> {
  return apiRequest<TopProductsResponse>("/api/v1/dashboard/top-products", {
    method: "GET",
  });
}

export function getDashboardRecentOrders(): Promise<RecentOrdersResponse> {
  return apiRequest<RecentOrdersResponse>("/api/v1/dashboard/recent-orders", {
    method: "GET",
  });
}
