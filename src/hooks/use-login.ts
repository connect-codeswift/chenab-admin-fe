"use client";

import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { ApiError, type LoginRequest, type LoginResponse } from "@/lib/api/types";
import { setAuthSession } from "@/lib/auth/session";
import { login } from "@/services/auth.service";

export type UseLoginOptions = Omit<
  UseMutationOptions<LoginResponse, ApiError, LoginRequest>,
  "mutationFn"
>;

export function useLogin(
  options?: UseLoginOptions,
): UseMutationResult<LoginResponse, ApiError, LoginRequest> {
  const { onSuccess, ...rest } = options ?? {};

  return useMutation<LoginResponse, ApiError, LoginRequest>({
    mutationKey: ["auth", "login"],
    mutationFn: login,
    ...rest,
    onSuccess: (data, variables, onMutateResult, context) => {
      setAuthSession(data.token, data.user);
      onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
