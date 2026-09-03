import type { SkuStatus } from "@/lib/api/product-types";

export type ProductVisibility = "visible" | "hidden";

export type { SkuStatus };

/* No id of our own — useFieldArray supplies the React key. */
export type SkuDraft = {
  size: string;
  price: string;
  stock: string;
  status: SkuStatus;
  active: boolean;
};

export type NutritionKey =
  "energy" | "carbohydrate" | "sugars" | "protein" | "fat" | "fibre" | "sodium";

export type ProductBenefit = {
  title: string;
  detail: string;
};

export const BENEFIT_COUNT = 3;

/* Mutable on purpose: react-hook-form writes into this shape. */
export type ProductFormValues = {
  name: string;
  category: string;
  tagline: string;
  heroLine: string;
  longDescription: string;
  /* Cloudinary secure URLs ready to send to the backend. */
  images: string[];
  visibility: ProductVisibility;
  skus: SkuDraft[];
  benefits: ProductBenefit[];
  bestUses: string;
  cookingGuide: string;
  storage: string;
  aboutTheRice: string;
  nutrition: Record<NutritionKey, string>;
  certifications: string[];
};

export const WIZARD_STEPS = [
  { id: "details", label: "Details" },
  { id: "skus", label: "SKUs & Pricing" },
  { id: "content", label: "Content" },
  { id: "nutrition", label: "Nutrition & Certs" },
] as const;

export type WizardStepId = (typeof WIZARD_STEPS)[number]["id"];

export const PRODUCT_CATEGORIES = [
  "Basmati",
  "Sella",
  "Steamed",
  "Broken",
  "Blend",
  "Everyday",
] as const;

export const SKU_STATUS_LABEL: Record<SkuStatus, string> = {
  in_stock: "In stock",
  low_stock: "Low stock",
  out_of_stock: "Out of stock",
};

export const NUTRITION_ROWS: readonly Readonly<{
  key: NutritionKey;
  label: string;
}>[] = [
  { key: "energy", label: "Energy" },
  { key: "carbohydrate", label: "Carbohydrate" },
  { key: "sugars", label: "of which sugars" },
  { key: "protein", label: "Protein" },
  { key: "fat", label: "Fat" },
  { key: "fibre", label: "Fibre" },
  { key: "sodium", label: "Sodium" },
];

export const CERTIFICATIONS = [
  "ISO 22000",
  "HACCP",
  "GMP",
  "Halal",
  "Organic",
] as const;

export function createSkuDraft(size = ""): SkuDraft {
  return { size, price: "", stock: "", status: "in_stock", active: true };
}

export function createEmptyProductForm(): ProductFormValues {
  return {
    name: "",
    category: PRODUCT_CATEGORIES[0],
    tagline: "",
    heroLine: "",
    longDescription: "",
    images: [],
    visibility: "visible",
    skus: [createSkuDraft("1 kg")],
    benefits: Array.from({ length: BENEFIT_COUNT }, () => ({
      title: "",
      detail: "",
    })),
    bestUses: "",
    cookingGuide: "",
    storage: "",
    aboutTheRice: "",
    nutrition: {
      energy: "",
      carbohydrate: "",
      sugars: "",
      protein: "",
      fat: "",
      fibre: "",
      sodium: "",
    },
    certifications: [],
  };
}
