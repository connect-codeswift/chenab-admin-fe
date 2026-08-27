import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/header";
import { ProductsContent } from "@/components/admin/products/products-content";
import { PRODUCTS } from "@/components/admin/products/products-data";

export const metadata: Metadata = {
  title: "Products | Chenab Valley Rice Admin",
  description: "The catalogue, its stock levels and what is on sale.",
  robots: { index: false, follow: false },
};

export default function AdminProductsPage() {
  const productWord = PRODUCTS.length === 1 ? "Product" : "Products";

  return (
    <>
      <AdminHeader
        title="Products"
        subtitle={`${PRODUCTS.length} ${productWord}`}
      />
      <div className="scrollbar-none flex min-h-0 overflow-y-auto">
        {" "}
        <ProductsContent products={PRODUCTS} />
      </div>
    </>
  );
}
