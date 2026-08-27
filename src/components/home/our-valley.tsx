import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function OurValley() {
  return (
    <section
      aria-labelledby="our-valley-heading"
      className="relative z-10 overflow-clip rounded-t-2xl bg-surface-base section-pad shadow-[0_-24px_60px_rgb(30_30_30_/_0.18)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-brand-deep/12 blur-[90px] lg:-top-36 lg:-right-36 lg:size-120 lg:blur-[130px]"
      />

      <div className="relative mx-auto flex w-full max-w-147 flex-col items-center gap-8 text-center">
        <Reveal className="flex w-full flex-col items-center gap-4">
          <div className="flex items-center gap-1">
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
            <p className="text-body text-brand-accent">Our Valley</p>
          </div>
          <h2
            id="our-valley-heading"
            className="w-full text-h3 text-ink-primary lg:text-h2"
          >
            Every grain traces back to one river basin in southern Punjab.
          </h2>
        </Reveal>

        <Reveal delay="delay-150" className="w-full">
          <p className="w-full text-lead text-ink-muted">
            The Chenab rises in the Himalayas and crosses the Punjab plain,
            leaving behind mineral-rich alluvial soil and the cool nights that
            give our rice its aroma. We farm within 60 kilometres of the river —
            and nowhere else.
          </p>
        </Reveal>

        <Reveal delay="delay-300">
          <form action="/our-valley">
            <button
              type="submit"
              className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded bg-surface-base px-6 py-2 text-body text-brand-primary transition-opacity duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent motion-reduce:transition-none"
            >
              Read Our Story
              <span className="relative inline-flex size-6 items-center justify-center overflow-clip">
                <Image
                  src="/icons/chevron-right-accent.svg"
                  alt=""
                  width={6}
                  height={10}
                  className="h-2.5 w-1.5"
                  unoptimized
                />
              </span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
