"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { productsQueryKey } from "@/hooks/use-products";
import { ApiError } from "@/lib/api/types";
import { deleteProduct } from "@/services/product.service";

export type UseDeleteProductOptions = Omit<
  UseMutationOptions<void, ApiError, string>,
  "mutationFn"
>;

export function useDeleteProduct(
  options?: UseDeleteProductOptions,
): UseMutationResult<void, ApiError, string> {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = options ?? {};

  return useMutation<void, ApiError, string>({
    mutationKey: ["products", "delete"],
    mutationFn: deleteProduct,
    ...rest,
    onSuccess: (data, id, onMutateResult, context) => {
      void queryClient.invalidateQueries({ queryKey: productsQueryKey });
      void queryClient.removeQueries({ queryKey: [...productsQueryKey, id] });
      onSuccess?.(data, id, onMutateResult, context);
    },
  });
}
