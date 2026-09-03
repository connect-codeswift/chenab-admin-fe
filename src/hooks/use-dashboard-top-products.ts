"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { TopProductsResponse } from "@/lib/api/dashboard-types";
import { ApiError } from "@/lib/api/types";
import { getDashboardTopProducts } from "@/services/dashboard.service";

export const dashboardTopProductsQueryKey = [
  "dashboard",
  "top-products",
] as const;

export function useDashboardTopProducts(): UseQueryResult<
  TopProductsResponse,
  ApiError
> {
  return useQuery({
    queryKey: dashboardTopProductsQueryKey,
    queryFn: getDashboardTopProducts,
  });
}
