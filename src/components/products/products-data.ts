import brokenBasmati from "../../../public/images/products/4.png";
import brownRiceQuinoa from "../../../public/images/products/6.png";
import daaghiBasmatiGold from "../../../public/images/products/1.png";
import daaghiBasmatiBrown from "../../../public/images/products/2.png";
import steamedBasmati from "../../../public/images/products/3.png";
import type { ProductSummary } from "@/components/products/products-types";

/* Placeholder catalogue until the shop data layer exists — prices live on the
   pack size in the real model, here a single representative price per card.
   Image order per design: 1, 2, 3, 4, 1, 6. */
export const RECENT_PRODUCTS: readonly ProductSummary[] = [
  {
    slug: "classic-daaghi-basmati",
    name: "Classic Daaghi Basmati",
    descriptor: "Aromatic aged rice, extra long grain.",
    price: 4200,
    image: daaghiBasmatiGold,
    imageAlt: "Chenab Classic Daaghi Basmati Rice gold packs",
  },
  {
    slug: "classic-daaghi-basmati",
    name: "Classic Daaghi Basmati",
    descriptor: "Aromatic aged rice, extra long grain.",
    price: 3500,
    image: daaghiBasmatiBrown,
    imageAlt: "Chenab Classic Daaghi Basmati Rice brown pack",
  },
  {
    slug: "premium-steamed-basmati",
    name: "Premium Steamed Basmati",
    descriptor: "Premium steamed basmati, aged over two years.",
    price: 2800,
    image: steamedBasmati,
    imageAlt: "Chenab Valley Rice Premium Steamed Basmati black pack",
  },
  {
    slug: "broken-basmati-rice",
    name: "Broken Basmati Rice",
    descriptor: "Same aroma, everyday price — in a 5 kg pack.",
    price: 3200,
    image: brokenBasmati,
    imageAlt: "Chenab Rice Valley Broken Basmati Rice gold 5 kg pack",
  },
  {
    slug: "classic-daaghi-basmati",
    name: "Classic Daaghi Basmati",
    descriptor: "Aromatic aged rice, extra long grain.",
    price: 3000,
    image: daaghiBasmatiGold,
    imageAlt: "Chenab Classic Daaghi Basmati Rice gold packs",
  },
  {
    slug: "brown-rice-with-quinoa",
    name: "Brown Rice with Quinoa",
    descriptor: "Ready-to-eat gourmet blend — meals in minutes.",
    price: 2600,
    image: brownRiceQuinoa,
    imageAlt: "Chenab Rice Valley Brown Rice with Quinoa ready-to-eat pouch",
  },
];

export function formatPrice(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}
