import { PRODUCTS } from "@/components/admin/products/products-data";
import type { ProductRow } from "@/components/admin/products/products-types";
import type { ProductFormValues } from "@/components/admin/products/product-wizard/product-form-types";
import { createEmptyProductForm } from "@/components/admin/products/product-wizard/product-form-types";

/* The detail screen in Figma (nodes 212:7841 / 8420 / 8511 / 8602) is drawn for
   Premium Super Basmati. Every other product composes its editor state from its
   list row, so the screen stays navigable until the admin API exists. */

export type ProductDetail = Readonly<{
  row: ProductRow;
  images: readonly string[];
  priceRange: string;
  values: ProductFormValues;
}>;

const GALLERY = [
  "/images/products/1.png",
  "/images/products/2.png",
  "/images/products/3.png",
  "/images/products/4.png",
] as const;

const DESIGNED_VALUES: Partial<ProductFormValues> = {
  tagline: "The benchmark of Pakistani basmati.",
  heroLine: "Aged 12 months. Extra-long grain. The first choice.",
  benefits: [
    { title: "Extra-long grain", detail: "Grains stay separate and elongate." },
    { title: "Aged 12 months", detail: "Aged for aroma and a firmer bite." },
    { title: "Chenab origin", detail: "Grown in the Chenab river basin." },
  ],
  nutrition: {
    energy: "350 kcal",
    carbohydrate: "77 g",
    sugars: "0.1 g",
    protein: "7 g",
    fat: "0.6 g",
    fibre: "0.4 g",
    sodium: "1 mg",
  },
  certifications: ["ISO 22000", "HACCP", "GMP", "Halal"],
};

function formatRange(row: ProductRow): string {
  const prices = row.packs.map((pack) => pack.price);
  const low = Math.min(...prices).toLocaleString("en-PK");
  const high = Math.max(...prices).toLocaleString("en-PK");

  return `Rs. ${low} – ${high}`;
}

export function getProductDetail(id: string): ProductDetail | undefined {
  const row = PRODUCTS.find((product) => product.id === id);

  if (!row) {
    return undefined;
  }

  const designed = row.id === "premium-super-basmati" ? DESIGNED_VALUES : {};

  return {
    row,
    images: GALLERY,
    priceRange: formatRange(row),
    values: {
      ...createEmptyProductForm(),
      ...designed,
      name: row.name,
      category: row.category,
      visibility: row.visible ? "visible" : "hidden",
      skus: row.packs.map((pack) => ({
        size: pack.size,
        price: String(pack.price),
        stock: String(pack.unitsInStock),
        status: pack.unitsInStock === 0 ? "out" : "in-stock",
        active: true,
      })),
    },
  };
}

export function listProductIds(): readonly string[] {
  return PRODUCTS.map((product) => product.id);
}
