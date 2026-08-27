"use client";

import Image from "next/image";
import Link from "next/link";
import {
  StockBadge,
  VisibilityBadge,
} from "@/components/admin/products/product-badges";
import type { ProductRow } from "@/components/admin/products/products-types";

export type ProductDetailHeaderProps = Readonly<{
  product: ProductRow;
  priceRange: string;
  onSave: () => void;
  onDelete: () => void;
}>;

/* Figma node 212:7853 — back link, 56px shot, title, meta row, then the two
   actions. */
export function ProductDetailHeader(props: Readonly<ProductDetailHeaderProps>) {
  const { product, priceRange, onSave, onDelete } = props;

  return (
    <div className="flex flex-col justify-between gap-4 rounded bg-surface-base/70 p-4 shadow-xs lg:flex-row lg:items-start">
      <div className="flex items-start gap-4 sm:gap-6">
        <Link
          href="/admin/products"
          aria-label="Back to products"
          className="shrink-0 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
        >
          <Image
            src="/icons/admin/arrow-back.svg"
            alt=""
            width={28}
            height={28}
            className="size-7"
          />
        </Link>

        <span className="relative size-14 shrink-0 overflow-clip rounded bg-brand-accent/10">
          <Image
            src={product.image}
            alt=""
            fill
            sizes="56px"
            className="object-cover object-center"
          />
        </span>

        <div className="flex min-w-0 flex-col">
          <h2 className="text-h4 text-ink-primary sm:text-h3">
            {product.name}
          </h2>
          <div className="flex flex-wrap items-center gap-2 pt-1.5">
            <span className="text-body-sm text-ink-muted">
              {product.category}
            </span>
            <span aria-hidden className="text-body-sm text-ink-muted">
              ·
            </span>
            <span className="text-body-sm text-ink-muted">{priceRange}</span>
            <StockBadge stock={product.stock} />
            <VisibilityBadge visible={product.visible} />
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <button
          type="button"
          onClick={onDelete}
          className="flex cursor-pointer items-center gap-2 rounded border border-state-critical/20 bg-surface-base px-5 py-2.5 text-body-sm font-medium text-state-critical focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
        >
          <Image
            src="/icons/admin/trash-red.svg"
            alt=""
            width={15}
            height={15}
            className="size-3.75"
          />
          Delete
        </button>
        <button
          type="button"
          onClick={onSave}
          className="cursor-pointer rounded bg-brand-accent px-5 py-2.5 text-body-sm font-medium text-surface-base transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent motion-reduce:transition-none"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
