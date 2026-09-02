"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import type { ProductFormValues } from "@/components/admin/products/product-wizard/product-form-types";
import { productsQueryKey } from "@/hooks/use-products";
import { ApiError } from "@/lib/api/types";
import type { UpdateProductResponse } from "@/lib/api/product-types";
import { toProductRequest } from "@/services/product.mapper";
import { updateProduct } from "@/services/product.service";

export type UpdateProductVariables = {
  id: string;
  values: ProductFormValues;
};

export type UseUpdateProductOptions = Omit<
  UseMutationOptions<UpdateProductResponse, ApiError, UpdateProductVariables>,
  "mutationFn"
>;

export function useUpdateProduct(
  options?: UseUpdateProductOptions,
): UseMutationResult<UpdateProductResponse, ApiError, UpdateProductVariables> {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = options ?? {};

  return useMutation<UpdateProductResponse, ApiError, UpdateProductVariables>({
    mutationKey: ["products", "update"],
    mutationFn: ({ id, values }) =>
      updateProduct(id, toProductRequest(values)),
    ...rest,
    onSuccess: (data, variables, onMutateResult, context) => {
      void queryClient.invalidateQueries({ queryKey: productsQueryKey });
      void queryClient.invalidateQueries({
        queryKey: [...productsQueryKey, variables.id],
      });
      onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
