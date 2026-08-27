"use client";

import Image from "next/image";
import { useScrollReveal, type RevealedCount } from "@/hooks/use-scroll-reveal";

type DeliveryPoint = Readonly<{
  number: string;
  title: string;
  body: string;
}>;

type DeliveryIndex = 0 | 1 | 2 | 3;

const DELIVERY_INDEXES = [0, 1, 2, 3] as const;

const DELIVERY_POINTS = [
  {
    number: "1",
    title: "Nationwide Delivery",
    body: "We deliver to Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta and surrounding areas. Charges calculated at checkout based on your city.",
  },
  {
    number: "2",
    title: "Multiple Payment Methods",
    body: "Pay by card through our secure gateway, by bank transfer (HBL), or cash on delivery in eligible cities on orders up to Rs. 10,000.",
  },
  {
    number: "3",
    title: "WhatsApp & Email Confirmation",
    body: "Every order is confirmed immediately by WhatsApp and email. You receive updates at dispatch and delivery — no need to chase support.",
  },
  {
    number: "4",
    title: "Packed for Transit",
    body: "All orders are sealed in moisture-barrier packaging within 4 hours of milling. Batch code and pack date on every bag. Free delivery on orders over Rs. 5,000.",
  },
] as const satisfies readonly DeliveryPoint[];

const mobileRevealDelayClassByIndex: Record<DeliveryIndex, string> = {
  0: "max-lg:delay-100",
  1: "max-lg:delay-400",
  2: "max-lg:delay-700",
  3: "max-lg:delay-900",
};

/* Hairline gutters and staircase offsets, one entry per column — the design
   staggers each column lower than the last on desktop, flat on mobile. */
const columnClassByIndex = [
  "lg:pr-6",
  "lg:px-6",
  "lg:px-6",
  "lg:pl-6",
] as const;

const staggerClassByIndex = [
  "lg:mt-0",
  "lg:mt-30",
  "lg:mt-50",
  "lg:mt-70",
] as const;

/* Each divider starts at the top of the column to its left, so it reaches up
   past its own column by the stagger difference. */
const dividerTopClassByIndex = ["", "-top-14", "-top-15", "-top-23"] as const;

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

export type DeliveryColumnProps = Readonly<{
  point: DeliveryPoint;
  index: DeliveryIndex;
  revealedCount: RevealedCount;
  sectionInView: boolean;
}>;

function DeliveryColumn(props: Readonly<DeliveryColumnProps>) {
  const { point, index, revealedCount, sectionInView } = props;
  const desktopVisible = index < revealedCount;
  const mobileRevealClass = sectionInView
    ? "max-lg:translate-y-0 max-lg:opacity-100"
    : "max-lg:translate-y-8 max-lg:opacity-0";
  const desktopRevealClass = desktopVisible
    ? "lg:translate-y-0 lg:opacity-100"
    : "lg:translate-y-8 lg:opacity-0";
  const dividerRevealClass = desktopVisible ? "lg:scale-y-100" : "lg:scale-y-0";

  return (
    <li className={columnClassByIndex[index]}>
      <div
        className={`relative ${staggerClassByIndex[index]} ${mobileRevealDelayClassByIndex[index]} ${mobileRevealClass} ${desktopRevealClass} transition duration-700 ease-out will-change-transform motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none`}
      >
        {index > 0 ? (
          <span
            aria-hidden="true"
            className={`absolute bottom-0 -left-6 hidden w-px origin-top bg-ink-primary transition-transform duration-700 ease-out motion-reduce:scale-y-100 motion-reduce:transition-none lg:block ${dividerTopClassByIndex[index]} ${dividerRevealClass}`}
          />
        ) : null}
        <p className="text-body-sm text-brand-accent">({point.number})</p>
        <h3 className="mt-4 text-h4 text-ink-primary">{point.title}</h3>
        <p className="mt-3 text-body-sm text-ink-muted">{point.body}</p>
      </div>
    </li>
  );
}

export function HowWeDeliver() {
  const { sectionRef, revealedCount, sectionInView } = useScrollReveal(4);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="how-we-deliver-heading"
      className="relative bg-surface-base motion-reduce:h-auto lg:h-[240vh]"
    >
      <div className="relative overflow-x-clip bg-surface-base px-6 py-10 motion-reduce:static motion-reduce:min-h-0 lg:sticky lg:top-0 lg:flex lg:min-h-dvh lg:flex-col lg:justify-start lg:px-30 lg:pt-20 lg:pb-0">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-brand-deep/12 blur-[90px] lg:-top-36 lg:-right-36 lg:size-120 lg:blur-[130px]"
        />

        <div className="relative mx-auto flex w-full max-w-147 flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-1">
            <GrainMark />
            <p className="text-body text-brand-accent">How We Deliver</p>
          </div>
          <h2
            id="how-we-deliver-heading"
            className="w-full text-h3 text-ink-primary lg:text-h2"
          >
            Order today. Tracked to your door. Confirmed on WhatsApp.
          </h2>
        </div>

        <ol className="relative mt-12 grid grid-cols-1 gap-12 sm:mt-16 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-0">
          {DELIVERY_INDEXES.map((index) => (
            <DeliveryColumn
              key={DELIVERY_POINTS[index].number}
              point={DELIVERY_POINTS[index]}
              index={index}
              revealedCount={revealedCount}
              sectionInView={sectionInView}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
