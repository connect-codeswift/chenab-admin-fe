"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useScrollReveal, type RevealedCount } from "@/hooks/use-scroll-reveal";

type CertificationIconName = "food-management" | "haccp" | "gmp" | "halal";

type Certification = Readonly<{
  step: string;
  code: string;
  name: string;
  icon: CertificationIconName;
}>;

type CertificationIndex = 0 | 1 | 2 | 3;

const CERTIFICATION_INDEXES = [0, 1, 2, 3] as const;

const CERTIFICATIONS = [
  {
    step: "1",
    code: "ISO 22000",
    name: "Food Management System",
    icon: "food-management",
  },
  {
    step: "2",
    code: "HACCP",
    name: "Hazard Analysis & Critical Control",
    icon: "haccp",
  },
  {
    step: "3",
    code: "ISO 22000",
    name: "Good Manufacturing Practice",
    icon: "gmp",
  },
  {
    step: "4",
    code: "HALAL",
    name: "Halal Certified",
    icon: "halal",
  },
] as const satisfies readonly Certification[];

const mobileRevealDelayClassByIndex: Record<CertificationIndex, string> = {
  0: "max-lg:delay-100",
  1: "max-lg:delay-400",
  2: "max-lg:delay-700",
  3: "max-lg:delay-900",
};

const desktopCardPositionClassByIndex: Record<CertificationIndex, string> = {
  0: "lg:bottom-[calc(50%+2rem)]",
  1: "lg:top-[calc(50%+2rem)]",
  2: "lg:bottom-[calc(50%+2rem)]",
  3: "lg:top-[calc(50%+2rem)]",
};

const desktopStepPositionClassByIndex: Record<CertificationIndex, string> = {
  0: "lg:top-[calc(50%+1.25rem)]",
  1: "lg:bottom-[calc(50%+1.25rem)]",
  2: "lg:top-[calc(50%+1.25rem)]",
  3: "lg:bottom-[calc(50%+1.25rem)]",
};

const desktopLineScaleClassByCount: Record<RevealedCount, string> = {
  0: "lg:scale-x-0",
  1: "lg:scale-x-25",
  2: "lg:scale-x-50",
  3: "lg:scale-x-75",
  4: "lg:scale-x-100",
};

function FoodManagementIcon() {
  return (
    <Icon
      icon="griddy-icons:certificate"
      aria-hidden="true"
      className="size-12 text-ink-primary"
    />
  );
}

function HaccpIcon() {
  return (
    <Icon
      icon="mingcute:certificate-line"
      aria-hidden="true"
      className="size-12 text-ink-primary"
    />
  );
}

function GmpIcon() {
  return (
    <Icon
      icon="pinhead:manufactured-home"
      aria-hidden="true"
      className="h-10 w-15 text-ink-primary"
    />
  );
}

function HalalIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 52 52"
      fill="none"
      className="size-12 text-ink-primary"
    >
      <path
        d="M29.4275 23.6123V19.4999M29.4275 23.6123V25.9588L29.4578 25.9999M29.4275 23.6123C29.4275 24.6024 29.4275 25.3738 29.4578 25.9999M29.4578 25.9999C29.4968 26.7799 29.5813 27.3368 29.772 27.8178C30.1425 28.7516 30.7882 29.5013 31.5942 29.9346C32.3373 30.3333 33.2972 30.3333 35.2125 30.3333H36.9177C37.104 30.3333 37.195 30.3333 37.2557 30.3289C38.6337 30.2228 39.4375 28.4764 38.7507 27.0876L38.5665 26.7561L38.5232 26.6846L38.4192 26.5048C37.4918 24.9643 35.8127 24.2948 34.2657 24.8516L34.0902 24.9166M23.8332 32.4999C25.5708 32.4999 26.4397 32.4999 27.1265 32.1706C28.0387 31.7308 28.7645 30.8858 29.1437 29.8241C29.2997 29.3908 29.369 28.8924 29.4015 28.1991C29.4275 27.6249 29.4275 26.9164 29.4275 25.9999V25.9566M29.4015 28.1991L24.7648 22.7499M19.4998 19.4999V28.1666C19.4998 29.3159 19.0433 30.4181 18.2306 31.2307C17.418 32.0434 16.3158 32.4999 15.1665 32.4999"
        stroke="currentColor"
        strokeWidth="3.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.1901 7.26267C22.4099 5.95617 23.0209 5.30183 23.6731 4.93783C24.3841 4.54008 25.1853 4.33124 26.0001 4.33124C26.8148 4.33124 27.616 4.54008 28.3271 4.93783C28.9792 5.30183 29.5902 5.95617 30.8122 7.26267C31.3626 7.852 31.6356 8.14667 31.9432 8.38283C32.6148 8.90224 33.4129 9.23286 34.2551 9.3405C34.6386 9.38817 35.0416 9.37517 35.8454 9.34917C37.6351 9.2885 38.5277 9.25817 39.2471 9.46183C40.0309 9.68512 40.7448 10.1048 41.3211 10.6811C41.8974 11.2574 42.3171 11.9713 42.5404 12.7552C42.7419 13.4702 42.7137 14.365 42.6509 16.1525C42.6249 16.9585 42.6119 17.3615 42.6596 17.745C42.7679 18.5878 43.0994 19.3852 43.6172 20.0568C43.8556 20.3623 44.1481 20.6375 44.7374 21.1878C46.0439 22.4098 46.6982 23.0208 47.0622 23.673C47.8682 25.1203 47.8682 26.8797 47.0622 28.327C46.6982 28.9792 46.0439 29.5902 44.7374 30.8122C44.1481 31.3625 43.8534 31.6355 43.6172 31.9432C43.0978 32.6147 42.7672 33.4129 42.6596 34.255C42.6119 34.6385 42.6249 35.0415 42.6509 35.8453C42.7116 37.635 42.7419 38.5277 42.5382 39.247C42.3168 40.0318 41.8978 40.7467 41.3212 41.3233C40.7446 41.8999 40.0297 42.3189 39.2449 42.5403C38.5299 42.7418 37.6351 42.7137 35.8454 42.6508C35.0416 42.6248 34.6386 42.6118 34.2551 42.6595C33.4122 42.7678 32.6149 43.0993 31.9432 43.6172C31.6377 43.8555 31.3626 44.148 30.8122 44.7373C29.5902 46.0438 28.9792 46.6982 28.3271 47.0622C27.616 47.4599 26.8148 47.6688 26.0001 47.6688C25.1853 47.6688 24.3841 47.4599 23.6731 47.0622C23.0209 46.6982 22.4099 46.0438 21.1879 44.7373C20.6376 44.148 20.3646 43.8533 20.0569 43.6172C19.3853 43.0978 18.5872 42.7671 17.7451 42.6595C17.3616 42.6118 16.9586 42.6248 16.1526 42.6508C14.3651 42.7115 13.4724 42.7418 12.7531 42.5382C11.9683 42.3168 11.2534 41.8977 10.6768 41.3211C10.1002 40.7445 9.68114 40.0296 9.45973 39.2448C9.25823 38.5298 9.2864 37.635 9.34923 35.8453C9.37523 35.0415 9.38823 34.6385 9.34056 34.255C9.23292 33.4129 8.9023 32.6147 8.3829 31.9432C8.14456 31.6377 7.85206 31.3625 7.26273 30.8122C5.95623 29.5902 5.3019 28.9792 4.9379 28.327C4.54014 27.6159 4.3313 26.8148 4.3313 26C4.3313 25.1852 4.54014 24.3841 4.9379 23.673C5.3019 23.0208 5.95623 22.4098 7.26273 21.1878C7.85206 20.6375 8.14673 20.3645 8.3829 20.0568C8.9023 19.3853 9.23292 18.5871 9.34056 17.745C9.38823 17.3615 9.37523 16.9585 9.34923 16.1525C9.28856 14.365 9.25823 13.4723 9.4619 12.753C9.68331 11.9682 10.1023 11.2533 10.6789 10.6767C11.2555 10.1001 11.9704 9.68108 12.7552 9.45967C13.4702 9.25817 14.3651 9.28633 16.1526 9.34917C16.9586 9.37517 17.3616 9.38817 17.7451 9.3405C18.5879 9.23217 19.3852 8.90067 20.0569 8.38283C20.3624 8.1445 20.6397 7.852 21.1901 7.26267Z"
        stroke="currentColor"
        strokeWidth="3.25"
      />
    </svg>
  );
}

export type CertificationIconProps = Readonly<{
  icon: CertificationIconName;
}>;

function CertificationIcon(props: Readonly<CertificationIconProps>) {
  const { icon } = props;

  if (icon === "food-management") {
    return <FoodManagementIcon />;
  }

  if (icon === "haccp") {
    return <HaccpIcon />;
  }

  if (icon === "gmp") {
    return <GmpIcon />;
  }

  return <HalalIcon />;
}

export type CertificationItemProps = Readonly<{
  certification: Certification;
  index: CertificationIndex;
  revealedCount: RevealedCount;
  sectionInView: boolean;
}>;

function CertificationItem(props: Readonly<CertificationItemProps>) {
  const { certification, index, revealedCount, sectionInView } = props;
  const desktopVisible = index < revealedCount;
  const mobileRevealClass = sectionInView
    ? "max-lg:translate-y-0 max-lg:opacity-100"
    : "max-lg:translate-y-8 max-lg:opacity-0";
  const desktopRevealClass = desktopVisible
    ? "lg:translate-y-0 lg:opacity-100"
    : "lg:translate-y-8 lg:opacity-0";

  return (
    <li
      className={`relative pl-12 transition duration-700 ease-out will-change-transform motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none lg:h-full lg:pl-0 ${mobileRevealDelayClassByIndex[index]} ${mobileRevealClass} ${desktopRevealClass}`}
    >
      <span
        aria-hidden="true"
        className="absolute top-2 left-4 z-10 size-3 -translate-x-1/2 rounded-full bg-brand-accent lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2"
      />
      <span
        aria-hidden="true"
        className={`absolute left-1/2 hidden -translate-x-1/2 text-body-sm text-brand-accent lg:block ${desktopStepPositionClassByIndex[index]}`}
      >
        {certification.step}
      </span>

      <article
        className={`relative z-10 flex min-h-32 w-full flex-col items-center justify-center gap-2.5 rounded bg-surface-sunken px-4 py-6 text-center shadow-[0_18px_40px_-12px_rgb(30_30_30_/_0.12)] lg:absolute lg:left-1/2 lg:w-64 lg:-translate-x-1/2 ${desktopCardPositionClassByIndex[index]}`}
      >
        <CertificationIcon icon={certification.icon} />
        <div className="flex flex-col gap-0.5">
          <h3 className="text-body font-medium text-ink-primary uppercase">
            {certification.code}
          </h3>
          <p className="text-body-sm text-ink-primary uppercase">
            {certification.name}
          </p>
        </div>
      </article>
    </li>
  );
}

export function Certified() {
  const { sectionRef, revealedCount, sectionInView } = useScrollReveal(4);

  const mobileLineScaleClass = sectionInView
    ? "max-lg:scale-y-100"
    : "max-lg:scale-y-0";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="certified-heading"
      className="relative bg-surface-base motion-reduce:h-auto lg:h-[150vh]"
    >
      <div className="relative overflow-x-clip bg-surface-base px-6 motion-reduce:static motion-reduce:min-h-0 lg:sticky lg:top-0 lg:flex lg:min-h-dvh lg:flex-col lg:justify-start lg:px-30 lg:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-brand-accent/15 blur-[90px] lg:-top-36 lg:-right-36 lg:size-120 lg:blur-[130px]"
        />

        <div className="relative mx-auto flex w-full max-w-147 flex-col items-center gap-4 text-center">
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
            <p className="text-body text-brand-accent">Certified</p>
          </div>
          <h2
            id="certified-heading"
            className="w-full text-h3 text-ink-primary lg:text-h2"
          >
            <span className="block">Every batch verified.</span>
            <span className="block">No exceptions.</span>
          </h2>
        </div>

        <div className="relative mt-12 lg:mt-16">
          <div
            aria-hidden="true"
            className={`absolute top-0 bottom-0 left-4 w-px origin-top bg-line-default transition-transform duration-1000 ease-out motion-reduce:scale-y-100 motion-reduce:transition-none lg:hidden ${mobileLineScaleClass}`}
          />
          <div
            aria-hidden="true"
            className={`absolute top-1/2 right-6 left-6 hidden h-px origin-left bg-line-default transition-transform duration-700 ease-out motion-reduce:scale-x-100 motion-reduce:transition-none lg:block ${desktopLineScaleClassByCount[revealedCount]}`}
          />

          <ol className="relative flex flex-col gap-10 lg:grid lg:h-108 lg:grid-cols-4 lg:gap-0">
            {CERTIFICATION_INDEXES.map((index) => (
              <CertificationItem
                key={`${CERTIFICATIONS[index].code}-${CERTIFICATIONS[index].step}`}
                certification={CERTIFICATIONS[index]}
                index={index}
                revealedCount={revealedCount}
                sectionInView={sectionInView}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
