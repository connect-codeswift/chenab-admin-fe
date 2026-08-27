"use client";

import Image from "next/image";

export type ProductsToolbarProps = Readonly<{
  search: string;
  onSearchChange: (value: string) => void;
  onAddProduct: () => void;
}>;

export function ProductsToolbar(props: Readonly<ProductsToolbarProps>) {
  const { search, onSearchChange, onAddProduct } = props;

  return (
    <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
      <div className="relative w-full sm:w-75">
        <label className="sr-only" htmlFor="products-search">
          Search products
        </label>
        <Image
          src="/icons/search-muted.svg"
          alt=""
          width={16}
          height={16}
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <input
          id="products-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products"
          className="h-11 w-full rounded border border-line-default bg-surface-base/70 py-2.5 pr-3 pl-9 text-body-sm text-ink-primary outline-none placeholder:text-ink-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
        />
      </div>

      <button
        type="button"
        onClick={onAddProduct}
        className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded bg-brand-accent px-5 py-2.5 text-body-sm font-medium text-surface-base transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent motion-reduce:transition-none"
      >
        <Image
          src="/icons/admin/plus.svg"
          alt=""
          width={15}
          height={15}
          className="size-3.75"
        />
        Add product
      </button>
    </div>
  );
}
