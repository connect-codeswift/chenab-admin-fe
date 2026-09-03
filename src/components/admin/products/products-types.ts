import type { SkuStatus } from "@/lib/api/product-types";

export type ProductStock = "in-stock" | "low" | "out";

export type ProductPack = Readonly<{
  size: string;
  price: number;
  unitsInStock: number;
  status: SkuStatus;
}>;

export type ProductRow = Readonly<{
  id: string;
  name: string;
  category: string;
  stock: ProductStock;
  status: SkuStatus;
  visible: boolean;
  image: string;
  packs: readonly ProductPack[];
}>;
