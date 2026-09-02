"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { ApiError } from "@/lib/api/types";
import type { GetProductResponse } from "@/lib/api/product-types";
import { productsQueryKey } from "@/hooks/use-products";
import { getProduct } from "@/services/product.service";

export function useProduct(
  id: string,
): UseQueryResult<GetProductResponse, ApiError> {
  return useQuery({
    queryKey: [...productsQueryKey, id],
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
  });
}
