import type { StaticImageData } from "next/image";

export type ProductSummary = Readonly<{
  slug: string;
  name: string;
  descriptor: string;
  price: number;
  image: StaticImageData;
  imageAlt: string;
}>;
