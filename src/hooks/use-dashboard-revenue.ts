"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { RevenueSeriesResponse } from "@/lib/api/dashboard-types";
import { ApiError } from "@/lib/api/types";
import { getDashboardRevenue } from "@/services/dashboard.service";

export const dashboardRevenueQueryKey = ["dashboard", "revenue"] as const;

export function useDashboardRevenue(): UseQueryResult<
  RevenueSeriesResponse,
  ApiError
> {
  return useQuery({
    queryKey: dashboardRevenueQueryKey,
    queryFn: getDashboardRevenue,
  });
}
