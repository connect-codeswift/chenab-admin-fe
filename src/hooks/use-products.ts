"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { ApiError } from "@/lib/api/types";
import type { ListProductsResponse } from "@/lib/api/product-types";
import { listProducts } from "@/services/product.service";

export const productsQueryKey = ["products"] as const;

export function useProducts(): UseQueryResult<ListProductsResponse, ApiError> {
  return useQuery({
    queryKey: productsQueryKey,
    queryFn: listProducts,
  });
}
