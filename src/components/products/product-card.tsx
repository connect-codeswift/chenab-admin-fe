"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/components/products/products-data";
import type { ProductSummary } from "@/components/products/products-types";

export type ProductCardProps = Readonly<{
  product: ProductSummary;
  onAddToCart?: (product: ProductSummary) => void;
}>;

export function ProductCard(props: Readonly<ProductCardProps>) {
  const { product, onAddToCart } = props;

  function handleAddToCart() {
    onAddToCart?.(product);
  }

  return (
    <article className="flex h-full flex-col overflow-clip rounded border border-line-default bg-surface-raised">
      <Link
        href={`/shop/${product.slug}`}
        aria-label={`View ${product.name}`}
        className="block rounded-t focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
      >
        <span className="relative m-6 block h-60 overflow-clip rounded sm:h-64">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain object-center"
          />
        </span>
      </Link>

      <div className="flex flex-1 flex-col px-6 pb-6">
        <h3 className="text-h4 text-ink-primary">{product.name}</h3>
        <p className="mt-1 min-h-11 text-body-sm text-ink-muted">
          {product.descriptor}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <p className="text-body text-ink-primary">
            {formatPrice(product.price)}
          </p>
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleAddToCart}
          >
            Add to Cart
            <svg
              aria-hidden
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 1V11M1 6H11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
