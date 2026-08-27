export type ProductStock = "in-stock" | "low" | "out";

export type ProductPack = Readonly<{
  size: string;
  price: number;
  unitsInStock: number;
}>;

export type ProductRow = Readonly<{
  id: string;
  name: string;
  category: string;
  stock: ProductStock;
  visible: boolean;
  image: string;
  packs: readonly ProductPack[];
}>;
