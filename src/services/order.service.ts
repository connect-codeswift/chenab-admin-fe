import { apiRequest } from "@/lib/api/client";
import type {
  GetOrderResponse,
  ListOrdersResponse,
} from "@/lib/api/order-types";

export function listOrders(
  page = 1,
  limit = 10,
): Promise<ListOrdersResponse> {
  return apiRequest<ListOrdersResponse>(
    `/api/v1/orders?page=${page}&limit=${limit}`,
    { method: "GET" },
  );
}

export function getOrder(id: string): Promise<GetOrderResponse> {
  return apiRequest<GetOrderResponse>(`/api/v1/orders/${id}`, {
    method: "GET",
  });
}
