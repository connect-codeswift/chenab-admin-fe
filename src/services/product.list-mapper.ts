import type { ProductFormValues } from "@/components/admin/products/product-wizard/product-form-types";
import { BENEFIT_COUNT } from "@/components/admin/products/product-wizard/product-form-types";
import type {
  ProductPack,
  ProductRow,
  ProductStock,
} from "@/components/admin/products/products-types";
import type { Product, ProductSku, SkuStatus } from "@/lib/api/product-types";

const FALLBACK_IMAGE = "/images/products/1.png";

export function deriveSkuStatus(skus: readonly ProductSku[]): SkuStatus {
  if (skus.some((sku) => sku.status === "in_stock")) return "in_stock";
  if (skus.some((sku) => sku.status === "low_stock")) return "low_stock";
  return "out_of_stock";
}

export function deriveProductStock(skus: readonly ProductSku[]): ProductStock {
  const status = deriveSkuStatus(skus);
  if (status === "in_stock") return "in-stock";
  if (status === "low_stock") return "low";
  return "out";
}

export function toProductListRow(product: Product): ProductRow {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    stock: deriveProductStock(product.skus),
    status: deriveSkuStatus(product.skus),
    visible: product.visibility === "visible",
    image: product.images[0] ?? FALLBACK_IMAGE,
    packs: product.skus.map(
      (sku): ProductPack => ({
        size: sku.size,
        price: Number(sku.price) || 0,
        unitsInStock: Number(sku.stock) || 0,
        status: sku.status,
      }),
    ),
  };
}

export function toProductFormValues(product: Product): ProductFormValues {
  const benefits = [...product.benefits];
  while (benefits.length < BENEFIT_COUNT) {
    benefits.push({ title: "", detail: "" });
  }

  return {
    name: product.name,
    category: product.category,
    tagline: product.tagline,
    heroLine: product.heroLine,
    longDescription: product.longDescription,
    images: product.images,
    visibility: product.visibility,
    skus: product.skus.map((sku) => ({
      size: sku.size,
      price: String(sku.price),
      stock: String(sku.stock),
      status: sku.status,
      active: sku.active,
    })),
    benefits: benefits.slice(0, BENEFIT_COUNT),
    bestUses: product.bestUses,
    cookingGuide: product.cookingGuide,
    storage: product.storage,
    aboutTheRice: product.aboutTheRice,
    nutrition: product.nutrition,
    certifications: product.certifications,
  };
}
