import type { ProductRow } from "@/components/admin/products/products-types";
import type { ProductFormValues } from "@/components/admin/products/product-wizard/product-form-types";
import type { Product } from "@/lib/api/product-types";
import {
  toProductFormValues,
  toProductListRow,
} from "@/services/product.list-mapper";

export type ProductDetail = Readonly<{
  row: ProductRow;
  images: readonly string[];
  priceRange: string;
  values: ProductFormValues;
}>;

function formatRange(row: ProductRow): string {
  if (row.packs.length === 0) return "No SKUs";
  const prices = row.packs.map((pack) => pack.price);
  const low = Math.min(...prices).toLocaleString("en-PK");
  const high = Math.max(...prices).toLocaleString("en-PK");
  return `Rs. ${low} – ${high}`;
}

export function toProductDetail(product: Product): ProductDetail {
  const row = toProductListRow(product);
  return {
    row,
    images: product.images.length > 0 ? product.images : [row.image],
    priceRange: formatRange(row),
    values: toProductFormValues(product),
  };
}
