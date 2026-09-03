"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { GetOrderResponse } from "@/lib/api/order-types";
import { ApiError } from "@/lib/api/types";
import { getOrder } from "@/services/order.service";

export const orderQueryKey = (id: string) => ["orders", id] as const;

export function useOrder(id: string): UseQueryResult<GetOrderResponse, ApiError> {
  return useQuery({
    queryKey: orderQueryKey(id),
    queryFn: () => getOrder(id),
    enabled: Boolean(id),
  });
}
