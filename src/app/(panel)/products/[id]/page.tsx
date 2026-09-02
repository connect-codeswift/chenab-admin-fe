import type { Metadata } from "next";
import { ProductDetailPageContent } from "@/components/admin/products/product-detail/product-detail-page-content";

export const metadata: Metadata = {
  title: "Product | Chenab Valley Rice Admin",
  robots: { index: false, follow: false },
};

export default function AdminProductDetailPage({
  params,
}: PageProps<"/products/[id]">) {
  return <ProductDetailPageContent params={params} />;
}
