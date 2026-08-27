import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export function CtaSection() {
  return (
    <section
      aria-labelledby="cta-section-heading"
      className="relative overflow-x-clip bg-surface-base"
    >
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-7/20 bg-brand-deep lg:block"
      />

      <div className="relative grid grid-cols-1 items-center gap-10 section-pad lg:grid-cols-2 lg:gap-6">
        <Reveal className="flex flex-col">
          <p className="text-body text-brand-accent">For the Trade</p>
          <h2
            id="cta-section-heading"
            className="mt-6 text-h3 text-ink-primary lg:text-h2"
          >
            Retailer, distributor, or exporter? Let&apos;s talk volume.
          </h2>
          <p className="mt-8 max-w-xl text-body text-ink-muted">
            We supply independent grocers, supermarket chains, wholesalers, and
            export buyers across Pakistan and internationally. Wholesale
            pricing, certificate packs, and private-label options are available
            to verified trade partners.
          </p>
        </Reveal>

        <Reveal delay="delay-150" className="flex flex-col gap-10">
          <div className="relative h-44 overflow-clip rounded lg:h-45">
            <Image
              src="/images/cta-image.jpg"
              alt="Rice panicles heavy with grain in a Chenab valley paddy field"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <Link href="/trade" className="btn self-start btn-gold">
            Submit Trade Inquiry
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
      </div>
    </section>
  );
}
