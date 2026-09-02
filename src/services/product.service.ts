import { apiRequest } from "@/lib/api/client";
import type {
  CreateProductRequest,
  CreateProductResponse,
  GetProductResponse,
  ListProductsResponse,
  UpdateProductResponse,
} from "@/lib/api/product-types";

export function listProducts(): Promise<ListProductsResponse> {
  return apiRequest<ListProductsResponse>("/api/v1/products", {
    method: "GET",
  });
}

export function getProduct(id: string): Promise<GetProductResponse> {
  return apiRequest<GetProductResponse>(`/api/v1/products/${id}`, {
    method: "GET",
  });
}

export function createProduct(
  body: CreateProductRequest,
): Promise<CreateProductResponse> {
  return apiRequest<CreateProductResponse>("/api/v1/products", {
    method: "POST",
    body,
  });
}

export function updateProduct(
  id: string,
  body: CreateProductRequest,
): Promise<UpdateProductResponse> {
  return apiRequest<UpdateProductResponse>(`/api/v1/products/${id}`, {
    method: "PATCH",
    body,
  });
}

export function deleteProduct(id: string): Promise<void> {
  return apiRequest<void>(`/api/v1/products/${id}`, {
    method: "DELETE",
  });
}
