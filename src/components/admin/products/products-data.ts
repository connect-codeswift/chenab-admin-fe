import type { ProductStock } from "@/components/admin/products/products-types";

export const PRODUCTS_PAGE_SIZE = 10;

export const PRODUCT_STOCK_LABEL: Record<ProductStock, string> = {
  "in-stock": "In stock",
  low: "Low stock",
  out: "Out of stock",
};
