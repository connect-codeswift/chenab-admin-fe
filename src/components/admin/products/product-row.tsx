"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  StockBadge,
  VisibilityBadge,
} from "@/components/admin/products/product-badges";
import type { ProductRow as ProductRowData } from "@/components/admin/products/products-types";
import { formatPrice } from "@/components/products/products-data";

export type ProductRowProps = Readonly<{
  product: ProductRowData;
  isLast: boolean;
}>;

export function ProductRow(props: Readonly<ProductRowProps>) {
  const { product, isLast } = props;
  const [open, setOpen] = useState(false);
  const panelId = `product-packs-${product.id}`;
  const borderClass = isLast && !open ? "" : "border-b border-line-default";

  return (
    <li className={borderClass}>
      <div className="flex items-center gap-4 px-6 py-4">
        <span className="relative size-10 shrink-0 overflow-clip rounded bg-brand-accent/10">
          <Image
            src={product.image}
            alt=""
            fill
            sizes="40px"
            className="object-cover object-center"
          />
        </span>

        <span className="flex min-w-0 flex-1 flex-col">
          <Link
            href={`/admin/products/${product.id}`}
            className="truncate rounded text-body-sm font-medium text-ink-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            {product.name}
          </Link>
          <span className="text-caption text-ink-muted">
            {product.packs.length} SKUs · {product.category}
          </span>
        </span>

        <span className="flex shrink-0 items-center gap-2.5">
          <StockBadge stock={product.stock} />
          <VisibilityBadge visible={product.visible} />
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen(!open)}
            className="flex size-6 cursor-pointer items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            <span className="sr-only">
              {open ? "Hide" : "Show"} {product.name} pack sizes
            </span>
            <Image
              src="/icons/admin/chevron-down.svg"
              alt=""
              width={15}
              height={15}
              className={`size-3.75 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
            />
          </button>
        </span>
      </div>

      {open ? (
        <ul id={panelId} className="flex flex-col gap-2 px-6 pb-4 sm:pl-20">
          {product.packs.map((pack) => (
            <li
              key={pack.size}
              className="flex items-center justify-between gap-4 rounded bg-surface-sunken px-3 py-2"
            >
              <span className="text-body-sm text-ink-primary">{pack.size}</span>
              <span className="flex items-center gap-4">
                <span className="text-caption text-ink-muted">
                  {pack.unitsInStock} in stock
                </span>
                <span className="text-body-sm font-medium text-ink-primary">
                  {formatPrice(pack.price)}
                </span>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
