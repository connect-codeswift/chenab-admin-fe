import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/header";
import { ProductDetailEditor } from "@/components/admin/products/product-detail/product-detail-editor";
import {
  getProductDetail,
  listProductIds,
} from "@/components/admin/products/product-detail/product-detail-data";
import { PRODUCTS } from "@/components/admin/products/products-data";

export const metadata: Metadata = {
  title: "Product | Chenab Valley Rice Admin",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return listProductIds().map((id) => ({ id }));
}

export default async function AdminProductDetailPage({
  params,
}: PageProps<"/admin/products/[id]">) {
  const { id } = await params;
  const detail = getProductDetail(id);

  if (!detail) {
    notFound();
  }

  const productWord = PRODUCTS.length === 1 ? "Product" : "Products";

  return (
    <>
      <AdminHeader
        title="Products"
        subtitle={`${PRODUCTS.length} ${productWord}`}
      />
      <div className="scrollbar-none flex min-h-0 overflow-y-auto">
        <ProductDetailEditor detail={detail} />
      </div>
    </>
  );
}
