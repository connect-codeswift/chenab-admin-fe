"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { ListOrdersResponse } from "@/lib/api/order-types";
import { ApiError } from "@/lib/api/types";
import { listOrders } from "@/services/order.service";

export const ordersQueryKey = (page: number) => ["orders", page] as const;

export function useOrders(
  page = 1,
): UseQueryResult<ListOrdersResponse, ApiError> {
  return useQuery({
    queryKey: ordersQueryKey(page),
    queryFn: () => listOrders(page, 10),
  });
}
