import type { Metadata } from "next";
import { ProductsContent } from "@/components/admin/products/products-content";

export const metadata: Metadata = {
  title: "Products | Chenab Valley Rice Admin",
  description: "The catalogue, its stock levels and what is on sale.",
  robots: { index: false, follow: false },
};

export default function AdminProductsPage() {
  return <ProductsContent />;
}
