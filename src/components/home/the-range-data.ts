import type { StaticImageData } from "next/image";
import arborioRice from "../../../public/images/range/arborio-rice.jpg";
import basmatiRice from "../../../public/images/range/basmati-rice.jpg";
import brownRice from "../../../public/images/range/brown-rice.jpg";
import premiumSuperBasmati from "../../../public/images/range/premium-super-basmati.jpg";

export type RangeItem = Readonly<{
  name: string;
  tagline: string;
  description: string;
  imageAlt: string;
  images: readonly [StaticImageData, StaticImageData, StaticImageData];
}>;

export const RANGE_ITEMS: readonly RangeItem[] = [
  {
    name: "Premium Super Basmati",
    tagline: "The finest long-grain from the Chenab basin.",
    description:
      "Aged a minimum of 12 months. Grain length of 7.5 mm and above. A floral, nutty aroma that opens as the pot heats. The rice biryani was invented for.",
    imageAlt: "Premium Super Basmati rice grains in a burlap sack",
    images: [premiumSuperBasmati, premiumSuperBasmati, premiumSuperBasmati],
  },
  {
    name: "Basmati Rice",
    tagline:
      "A long-grain rice known for its distinct aroma, often used in Indian cuisine.",
    description:
      "Features a delicate nutty flavor and fluffy texture. Commonly served with biryanis and pilafs.",
    imageAlt: "Basmati rice grains in a burlap sack",
    images: [basmatiRice, basmatiRice, basmatiRice],
  },
  {
    name: "Arborio Rice",
    tagline: "A short-grain rice ideal for creamy risottos and Italian dishes.",
    description:
      "Starch-rich, it absorbs flavors well while maintaining a firm bite. Perfect for hearty meals.",
    imageAlt: "Arborio rice grains in a burlap sack",
    images: [arborioRice, arborioRice, arborioRice],
  },
  {
    name: "Brown Rice",
    tagline:
      "A whole grain rice variant that retains its bran and germ layers.",
    description:
      "Nutty in flavor with a chewy texture, it is considered healthier and full of fiber compared to white rice.",
    imageAlt: "Brown rice grains in a burlap sack",
    images: [brownRice, brownRice, brownRice],
  },
];

export const RANGE_COUNT = RANGE_ITEMS.length;

export function wrapRangeIndex(index: number): number {
  return ((index % RANGE_COUNT) + RANGE_COUNT) % RANGE_COUNT;
}

export function getRangeItem(index: number): RangeItem {
  const item = RANGE_ITEMS[wrapRangeIndex(index)];

  if (!item) {
    throw new Error("Range catalogue is empty");
  }

  return item;
}
