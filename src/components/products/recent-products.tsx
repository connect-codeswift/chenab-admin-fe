import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/products/product-card";
import { RECENT_PRODUCTS } from "@/components/products/products-data";

function GrainMark() {
  return (
    <span className="flex h-5 w-10 items-center justify-center">
      <span className="-scale-y-100 -rotate-90">
        <Image
          src="/icons/grain.svg"
          alt=""
          width={20}
          height={40}
          className="h-10 w-5"
          unoptimized
        />
      </span>
    </span>
  );
}

export function RecentProducts() {
  return (
    <section
      aria-labelledby="recent-products-heading"
      className="relative overflow-x-clip bg-surface-base section-pad"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-brand-deep/12 blur-[90px] lg:-top-36 lg:-right-36 lg:size-120 lg:blur-[130px]"
      />

      <Reveal className="relative mx-auto flex w-full max-w-147 flex-col items-center text-center">
        <div className="flex items-center gap-1">
          <GrainMark />
          <h2
            id="recent-products-heading"
            className="text-body text-brand-accent"
          >
            Recent Products
          </h2>
        </div>
      </Reveal>

      <Reveal delay="delay-150" className="relative mx-auto mt-10 sm:mt-16">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RECENT_PRODUCTS.map((product, index) => (
            <li key={`${product.slug}-${index}`}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal
        delay="delay-300"
        className="relative mt-10 flex justify-center sm:mt-16"
      >
        <Link href="/shop" className="btn btn-gold">
          View All Products
          <svg
            aria-hidden
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L1 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </Reveal>
    </section>
  );
}
