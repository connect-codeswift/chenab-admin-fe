"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { RecentOrdersResponse } from "@/lib/api/dashboard-types";
import { ApiError } from "@/lib/api/types";
import { getDashboardRecentOrders } from "@/services/dashboard.service";

export const dashboardRecentOrdersQueryKey = [
  "dashboard",
  "recent-orders",
] as const;

export function useDashboardRecentOrders(): UseQueryResult<
  RecentOrdersResponse,
  ApiError
> {
  return useQuery({
    queryKey: dashboardRecentOrdersQueryKey,
    queryFn: getDashboardRecentOrders,
  });
}
