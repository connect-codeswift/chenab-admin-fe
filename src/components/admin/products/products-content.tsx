"use client";

import { useMemo, useState } from "react";
import { AdminHeader } from "@/components/admin/header";
import { ProductRow } from "@/components/admin/products/product-row";
import { ProductsPagination } from "@/components/admin/products/products-pagination";
import { ProductsToolbar } from "@/components/admin/products/products-toolbar";
import { ProductWizard } from "@/components/admin/products/product-wizard/product-wizard";
import { PRODUCTS_PAGE_SIZE } from "@/components/admin/products/products-data";
import { Modal } from "@/components/ui/modal";
import { useProducts } from "@/hooks/use-products";
import { toProductListRow } from "@/services/product.list-mapper";

function matchesSearch(
  name: string,
  category: string,
  search: string,
): boolean {
  const term = search.trim().toLowerCase();
  if (term === "") return true;
  return (
    name.toLowerCase().includes(term) || category.toLowerCase().includes(term)
  );
}

export function ProductsContent() {
  const { data, isLoading, isError, error, refetch, isFetching } = useProducts();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);

  const rows = useMemo(
    () => (data?.products ?? []).map(toProductListRow),
    [data?.products],
  );

  const matched = useMemo(
    () =>
      rows.filter((product) =>
        matchesSearch(product.name, product.category, search),
      ),
    [rows, search],
  );

  const pageCount = Math.max(Math.ceil(matched.length / PRODUCTS_PAGE_SIZE), 1);
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PRODUCTS_PAGE_SIZE;
  const visible = matched.slice(start, start + PRODUCTS_PAGE_SIZE);
  const totalCount = matched.length;
  const productWord = totalCount === 1 ? "Product" : "Products";

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
    <>
      <AdminHeader
        title="Products"
        subtitle={
          isLoading && !data
            ? "Loading…"
            : `${totalCount} ${productWord}${isFetching ? " · refreshing" : ""}`
        }
      />

      <div className="scrollbar-none flex min-h-0 overflow-y-auto">
        <div className="flex w-full flex-col gap-4">
          <ProductsToolbar
            search={search}
            onSearchChange={handleSearchChange}
            onAddProduct={() => setAddOpen(true)}
          />

          <Modal
            open={addOpen}
            onClose={() => setAddOpen(false)}
            title="Add product"
          >
            <ProductWizard onClose={() => setAddOpen(false)} />
          </Modal>

          <section
            aria-label="Products"
            className="overflow-clip rounded border border-line-subtle bg-surface-base/70 shadow-xs"
          >
            {isLoading && !data ? (
              <p className="px-6 py-8 text-body-sm text-ink-muted">
                Loading products…
              </p>
            ) : null}

            {isError ? (
              <div className="flex flex-col items-start gap-3 px-6 py-8">
                <p role="alert" className="text-body-sm text-state-critical">
                  {error?.message ?? "Unable to load products."}
                </p>
                <button
                  type="button"
                  onClick={() => void refetch()}
                  className="cursor-pointer rounded border border-line-default px-3 py-1.5 text-caption text-ink-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                >
                  Try again
                </button>
              </div>
            ) : null}

            {!isLoading && !isError && visible.length === 0 ? (
              <p className="px-6 py-8 text-body-sm text-ink-muted">
                {search.trim()
                  ? "No products match that search."
                  : "No products yet. Add your first product."}
              </p>
            ) : null}

            {!isError && visible.length > 0 ? (
              <ul>
                {visible.map((product, index) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    isLast={index === visible.length - 1}
                  />
                ))}
              </ul>
            ) : null}

            {!isError && data ? (
              <ProductsPagination
                page={currentPage}
                pageSize={PRODUCTS_PAGE_SIZE}
                totalCount={totalCount}
                onPageChange={setPage}
              />
            ) : null}
          </section>
        </div>
      </div>
    </>
  );
}
