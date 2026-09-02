"use client";

import { use } from "react";
import { AdminHeader } from "@/components/admin/header";
import { ProductDetailEditor } from "@/components/admin/products/product-detail/product-detail-editor";
import { toProductDetail } from "@/components/admin/products/product-detail/product-detail-data";
import { useProduct } from "@/hooks/use-product";
import { useProducts } from "@/hooks/use-products";

export type ProductDetailPageContentProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

export function ProductDetailPageContent(
  props: Readonly<ProductDetailPageContentProps>,
) {
  const { id } = use(props.params);
  const productQuery = useProduct(id);
  const listQuery = useProducts();

  const listCount = listQuery.data?.products.length;
  const productWord = listCount === 1 ? "Product" : "Products";
  const subtitle =
    listCount === undefined
      ? "Products"
      : `${listCount} ${productWord}${listQuery.isFetching ? " · refreshing" : ""}`;

  if (productQuery.isLoading) {
    return (
      <>
        <AdminHeader title="Products" subtitle={subtitle} />
        <div className="scrollbar-none flex min-h-0 overflow-y-auto">
          <p className="px-2 py-8 text-body-sm text-ink-muted">
            Loading product…
          </p>
        </div>
      </>
    );
  }

  if (productQuery.isError || !productQuery.data) {
    return (
      <>
        <AdminHeader title="Products" subtitle={subtitle} />
        <div className="scrollbar-none flex min-h-0 overflow-y-auto">
          <div className="flex flex-col gap-3 px-2 py-8">
            <p role="alert" className="text-body-sm text-state-critical">
              {productQuery.error?.message ?? "Product not found."}
            </p>
            <button
              type="button"
              onClick={() => void productQuery.refetch()}
              className="w-fit cursor-pointer rounded border border-line-default px-3 py-1.5 text-caption text-ink-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            >
              Try again
            </button>
          </div>
        </div>
      </>
    );
  }

  const detail = toProductDetail(productQuery.data.product);

  return (
    <>
      <AdminHeader title="Products" subtitle={subtitle} />
      <div className="scrollbar-none flex min-h-0 overflow-y-auto">
        <ProductDetailEditor key={detail.row.id} detail={detail} />
      </div>
    </>
  );
}
