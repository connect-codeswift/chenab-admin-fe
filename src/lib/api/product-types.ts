export type ProductVisibility = "visible" | "hidden";

export type SkuStatus = "available" | "unavailable";

export type ProductSkuPayload = {
  size: string;
  price: string | number;
  stock: string | number;
  status: SkuStatus;
  active: boolean;
};

export type ProductBenefitPayload = {
  title: string;
  detail: string;
};

export type ProductNutritionPayload = {
  energy: string;
  carbohydrate: string;
  sugars: string;
  protein: string;
  fat: string;
  fibre: string;
  sodium: string;
};

/** Body for POST /api/v1/products */
export type CreateProductRequest = {
  name: string;
  category: string;
  tagline: string;
  heroLine: string;
  longDescription: string;
  images: string[];
  visibility: ProductVisibility;
  skus: ProductSkuPayload[];
  benefits: ProductBenefitPayload[];
  bestUses: string;
  cookingGuide: string;
  storage: string;
  aboutTheRice: string;
  nutrition: ProductNutritionPayload;
  certifications: string[];
};

export type ProductSku = {
  id: string;
  size: string;
  price: string;
  stock: string;
  status: SkuStatus;
  active: boolean;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  heroLine: string;
  longDescription: string;
  images: string[];
  visibility: ProductVisibility;
  skus: ProductSku[];
  benefits: ProductBenefitPayload[];
  bestUses: string;
  cookingGuide: string;
  storage: string;
  aboutTheRice: string;
  nutrition: ProductNutritionPayload;
  certifications: string[];
  createdAt: string;
  updatedAt: string;
};

export type CreateProductResponse = {
  product: Product;
};

export type ListProductsResponse = {
  products: Product[];
};

export type GetProductResponse = {
  product: Product;
};

export type UpdateProductResponse = {
  product: Product;
};
