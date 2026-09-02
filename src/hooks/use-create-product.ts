"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import type { ProductFormValues } from "@/components/admin/products/product-wizard/product-form-types";
import { ApiError } from "@/lib/api/types";
import type { CreateProductResponse } from "@/lib/api/product-types";
import { productsQueryKey } from "@/hooks/use-products";
import { toProductRequest } from "@/services/product.mapper";
import { createProduct } from "@/services/product.service";

export type UseCreateProductOptions = Omit<
  UseMutationOptions<CreateProductResponse, ApiError, ProductFormValues>,
  "mutationFn"
>;

export function useCreateProduct(
  options?: UseCreateProductOptions,
): UseMutationResult<CreateProductResponse, ApiError, ProductFormValues> {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = options ?? {};

  return useMutation<CreateProductResponse, ApiError, ProductFormValues>({
    mutationKey: ["products", "create"],
    mutationFn: (values) => createProduct(toProductRequest(values)),
    ...rest,
    onSuccess: (data, variables, onMutateResult, context) => {
      void queryClient.invalidateQueries({ queryKey: productsQueryKey });
      onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
