import { apiRequest } from "@/lib/api/client";
import type { LoginRequest, LoginResponse } from "@/lib/api/types";

export function login(credentials: LoginRequest): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/api/v1/auth/login", {
    method: "POST",
    body: credentials,
    token: null,
  });
}
