import type {
  ProductPack,
  ProductRow,
  ProductStock,
} from "@/components/admin/products/products-types";

/* Placeholder catalogue — the four rows drawn in Figma node 188:2577 plus
   enough siblings to exercise pagination. Photography reuses the storefront
   product shots. Replace wholesale when the admin API lands. */

export const PRODUCTS_PAGE_SIZE = 8;

const IMAGES = [
  "/images/products/1.png",
  "/images/products/2.png",
  "/images/products/3.png",
  "/images/products/4.png",
  "/images/products/6.png",
] as const;

function packs(prices: readonly number[], stocks: readonly number[]) {
  /* Bare weights — the SKU table shows the size on its own (Figma 212:9040). */
  const sizes = ["1 kg", "5 kg", "10 kg"];

  return sizes.map<ProductPack>((size, index) => ({
    size,
    price: prices[index],
    unitsInStock: stocks[index],
  }));
}

function product(
  id: string,
  name: string,
  category: string,
  stock: ProductStock,
  visible: boolean,
  imageIndex: number,
  prices: readonly number[],
  stocks: readonly number[],
): ProductRow {
  return {
    id,
    name,
    category,
    stock,
    visible,
    image: IMAGES[imageIndex % IMAGES.length],
    packs: packs(prices, stocks),
  };
}

export const PRODUCTS: readonly ProductRow[] = [
  product(
    "premium-super-basmati",
    "Premium Super Basmati",
    "Basmati",
    "low",
    true,
    0,
    [3250, 5800, 13500],
    [42, 6, 3],
  ),
  product(
    "1121-steam-basmati",
    "1121 Steam Basmati",
    "Basmati",
    "out",
    true,
    1,
    [3400, 6100, 14200],
    [0, 0, 0],
  ),
  product(
    "golden-sella",
    "Golden Sella",
    "Sella",
    "in-stock",
    true,
    2,
    [3600, 6400, 15000],
    [88, 54, 21],
  ),
  product(
    "brown-basmati",
    "Brown Basmati",
    "Basmati",
    "low",
    false,
    3,
    [3100, 5600, 13000],
    [12, 4, 2],
  ),
  product(
    "classic-daaghi-basmati",
    "Classic Daaghi Basmati",
    "Basmati",
    "in-stock",
    true,
    4,
    [4200, 7600, 17800],
    [64, 40, 18],
  ),
  product(
    "premium-steamed-basmati",
    "Premium Steamed Basmati",
    "Steamed",
    "in-stock",
    true,
    0,
    [3900, 7100, 16400],
    [51, 33, 15],
  ),
  product(
    "broken-basmati-rice",
    "Broken Basmati Rice",
    "Broken",
    "low",
    true,
    1,
    [1800, 3200, 7400],
    [9, 5, 2],
  ),
  product(
    "brown-rice-with-quinoa",
    "Brown Rice with Quinoa",
    "Blend",
    "in-stock",
    false,
    2,
    [4800, 8600, 20100],
    [30, 22, 11],
  ),
  product(
    "kainat-1121",
    "Kainat 1121",
    "Basmati",
    "in-stock",
    true,
    3,
    [3500, 6300, 14700],
    [72, 46, 19],
  ),
  product(
    "super-kernel-basmati",
    "Super Kernel Basmati",
    "Basmati",
    "out",
    false,
    4,
    [3300, 5900, 13800],
    [0, 0, 0],
  ),
  product(
    "white-sella",
    "White Sella",
    "Sella",
    "in-stock",
    true,
    0,
    [3450, 6200, 14400],
    [58, 37, 16],
  ),
  product(
    "chenab-daily-rice",
    "Chenab Daily Rice",
    "Everyday",
    "in-stock",
    true,
    1,
    [2400, 4300, 9900],
    [96, 61, 28],
  ),
];

export const PRODUCT_STOCK_LABEL: Record<ProductStock, string> = {
  "in-stock": "In stock",
  low: "Low stock",
  out: "Out of stock",
};
