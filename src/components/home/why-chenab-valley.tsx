"use client";

import Image from "next/image";
import { useScrollReveal, type RevealedCount } from "@/hooks/use-scroll-reveal";

type Reason = Readonly<{
  number: string;
  title: string;
  body: string;
}>;

const REASONS = [
  {
    number: "01",
    title: "Aroma",
    body: "The Chenab basin sits where cool Himalayan nights meet alluvial Punjab soil. That temperature drop during grain-fill is what produces the acetyl pyrazine compounds responsible for basmati's signature fragrance — a scent that survives the journey from field to kitchen.",
  },
  {
    number: "02",
    title: "Flavor",
    body: "Basmati rice boasts a unique nutty flavor profile, enhanced by its long grains. This flavor is often attributed to the specific climatic conditions and soil composition in the regions where it is grown, providing a delightful pairing for various dishes.",
  },
  {
    number: "03",
    title: "Texture",
    body: "When cooked, basmati rice achieves a fluffy and separate texture, making it an ideal accompaniment for rich, saucy dishes. This characteristic is essential for ensuring that each grain maintains its integrity, creating a satisfying mouthfeel.",
  },
] as const satisfies readonly Reason[];

type ReasonIndex = 0 | 1 | 2;

const offsetClassByIndex: Record<ReasonIndex, string> = {
  0: "",
  1: "lg:mt-32.5",
  2: "lg:mt-65",
};

const mobileRevealDelayClassByIndex: Record<ReasonIndex, string> = {
  0: "max-lg:delay-100",
  1: "max-lg:delay-400",
  2: "max-lg:delay-700",
};

export type ReasonBlockProps = Readonly<{
  reason: Reason;
  index: ReasonIndex;
  revealedCount: RevealedCount;
  sectionInView: boolean;
}>;

function ReasonBlock(props: Readonly<ReasonBlockProps>) {
  const { reason, index, revealedCount, sectionInView } = props;
  const desktopVisible = index < revealedCount;
  const mobileRevealClass = sectionInView
    ? "max-lg:translate-y-0 max-lg:opacity-100"
    : "max-lg:translate-y-8 max-lg:opacity-0";
  const desktopRevealClass = desktopVisible
    ? "lg:translate-y-0 lg:opacity-100"
    : "lg:translate-y-8 lg:opacity-0";

  return (
    <article
      className={`flex w-full flex-col gap-2 ${offsetClassByIndex[index]} ${mobileRevealDelayClassByIndex[index]} ${mobileRevealClass} ${desktopRevealClass} transition duration-700 ease-out will-change-transform motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-h1 text-ink-primary">{reason.number}</p>
        <h3 className="text-h4 text-brand-accent">{reason.title}</h3>
      </div>
      <p className="text-body-sm text-ink-muted">{reason.body}</p>
    </article>
  );
}

export function WhyChenabValley() {
  const { sectionRef, revealedCount, sectionInView } = useScrollReveal(3);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-chenab-valley-heading"
      className="relative bg-surface-base motion-reduce:h-auto lg:h-[240vh]"
    >
      <div className="relative overflow-x-clip bg-surface-base px-6 py-10 motion-reduce:static motion-reduce:min-h-0 lg:sticky lg:top-0 lg:flex lg:min-h-dvh lg:flex-col lg:justify-start lg:px-30 lg:pt-20 lg:pb-0">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-brand-accent/15 blur-[90px] lg:-top-36 lg:-right-36 lg:size-120 lg:blur-[130px]"
        />

        <div className="relative mx-auto flex w-full max-w-137 flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-1">
            <span className="flex h-5 w-10 items-center justify-center">
              <span className="-scale-y-100 -rotate-90">
                <span className="relative block h-10 w-5 overflow-clip">
                  <Image
                    src="/icons/grain.svg"
                    alt=""
                    width={20}
                    height={40}
                    className="size-full"
                    unoptimized
                  />
                </span>
              </span>
            </span>
            <p className="text-body text-brand-accent">Why Chenab Valley</p>
          </div>
          <h2
            id="why-chenab-valley-heading"
            className="w-full text-h3 text-ink-primary lg:text-h2"
          >
            Three things that separate this rice from every other on the shelf.
          </h2>
        </div>

        <div className="relative mt-10 grid grid-cols-1 gap-10 lg:mt-8 lg:grid-cols-3 lg:gap-7">
          <ReasonBlock
            reason={REASONS[0]}
            index={0}
            revealedCount={revealedCount}
            sectionInView={sectionInView}
          />
          <ReasonBlock
            reason={REASONS[1]}
            index={1}
            revealedCount={revealedCount}
            sectionInView={sectionInView}
          />
          <ReasonBlock
            reason={REASONS[2]}
            index={2}
            revealedCount={revealedCount}
            sectionInView={sectionInView}
          />
        </div>
      </div>
    </section>
  );
}
