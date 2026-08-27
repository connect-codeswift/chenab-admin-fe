"use client";

import { useState } from "react";
import { ProductRow } from "@/components/admin/products/product-row";
import { ProductsPagination } from "@/components/admin/products/products-pagination";
import { ProductsToolbar } from "@/components/admin/products/products-toolbar";
import { ProductWizard } from "@/components/admin/products/product-wizard/product-wizard";
import { Modal } from "@/components/ui/modal";
import { PRODUCTS_PAGE_SIZE } from "@/components/admin/products/products-data";
import type { ProductRow as ProductRowData } from "@/components/admin/products/products-types";

export type ProductsContentProps = Readonly<{
  products: readonly ProductRowData[];
}>;

function matchesSearch(product: ProductRowData, search: string): boolean {
  const term = search.trim().toLowerCase();

  if (term === "") {
    return true;
  }

  return (
    product.name.toLowerCase().includes(term) ||
    product.category.toLowerCase().includes(term)
  );
}

export function ProductsContent(props: Readonly<ProductsContentProps>) {
  const { products } = props;
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);

  const matched = products.filter((product) => matchesSearch(product, search));
  /* A narrowed result set can leave the old page out of range. */
  const pageCount = Math.max(Math.ceil(matched.length / PRODUCTS_PAGE_SIZE), 1);
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PRODUCTS_PAGE_SIZE;
  const visible = matched.slice(start, start + PRODUCTS_PAGE_SIZE);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
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
        {visible.length === 0 ? (
          <p className="px-6 py-8 text-body-sm text-ink-muted">
            No products match that search.
          </p>
        ) : (
          <ul>
            {visible.map((product, index) => (
              <ProductRow
                key={product.id}
                product={product}
                isLast={index === visible.length - 1}
              />
            ))}
          </ul>
        )}

        <ProductsPagination
          page={currentPage}
          pageSize={PRODUCTS_PAGE_SIZE}
          totalCount={matched.length}
          onPageChange={setPage}
        />
      </section>
    </div>
  );
}
