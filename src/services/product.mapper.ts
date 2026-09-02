import type { ProductFormValues } from "@/components/admin/products/product-wizard/product-form-types";
import type { CreateProductRequest } from "@/lib/api/product-types";

/** Maps the product form into the create/update API body. */
export function toProductRequest(
  values: ProductFormValues,
): CreateProductRequest {
  return {
    name: values.name.trim(),
    category: values.category.trim(),
    tagline: values.tagline.trim(),
    heroLine: values.heroLine.trim(),
    longDescription: values.longDescription.trim(),
    images: values.images,
    visibility: values.visibility,
    skus: values.skus.map((sku) => ({
      size: sku.size.trim(),
      price: sku.price,
      stock: sku.stock,
      status: sku.status,
      active: sku.active,
    })),
    benefits: values.benefits.filter(
      (benefit) => benefit.title.trim() || benefit.detail.trim(),
    ),
    bestUses: values.bestUses.trim(),
    cookingGuide: values.cookingGuide.trim(),
    storage: values.storage.trim(),
    aboutTheRice: values.aboutTheRice.trim(),
    nutrition: {
      energy: values.nutrition.energy.trim(),
      carbohydrate: values.nutrition.carbohydrate.trim(),
      sugars: values.nutrition.sugars.trim(),
      protein: values.nutrition.protein.trim(),
      fat: values.nutrition.fat.trim(),
      fibre: values.nutrition.fibre.trim(),
      sodium: values.nutrition.sodium.trim(),
    },
    certifications: values.certifications,
  };
}

/** @deprecated Prefer `toProductRequest`. */
export const toCreateProductRequest = toProductRequest;
