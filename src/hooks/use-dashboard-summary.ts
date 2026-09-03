"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { DashboardSummaryResponse } from "@/lib/api/dashboard-types";
import { ApiError } from "@/lib/api/types";
import { getDashboardSummary } from "@/services/dashboard.service";

export const dashboardSummaryQueryKey = ["dashboard", "summary"] as const;

export function useDashboardSummary(): UseQueryResult<
  DashboardSummaryResponse,
  ApiError
> {
  return useQuery({
    queryKey: dashboardSummaryQueryKey,
    queryFn: getDashboardSummary,
  });
}
