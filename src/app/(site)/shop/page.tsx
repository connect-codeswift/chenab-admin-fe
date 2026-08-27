import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Shop | Chenab Valley Rice",
  description: "Rice grown where the river runs cold.",
};

export default function ShopPage() {
  return (
    <PageFrame
      title="Shop"
      description="Four variants, a handful of pack sizes. Filter by how you cook — biryani, pulao, or everyday."
    />
  );
}
