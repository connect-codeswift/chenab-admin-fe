"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { SlideImage, type SlideDirection } from "@/components/ui/slide-image";
import {
  RANGE_COUNT,
  type RangeItem,
  getRangeItem,
  wrapRangeIndex,
} from "@/components/home/the-range-data";

const navButtonClass =
  "inline-flex items-center rounded p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

function RangeGrainMark() {
  return (
    <span className="flex h-5 w-10 items-center justify-center">
      <span className="-scale-y-100 -rotate-90">
        <span className="relative block h-10 w-5 overflow-clip">
          <Image
            src="/icons/range-grain.svg"
            alt=""
            width={20}
            height={40}
            className="size-full"
            unoptimized
          />
        </span>
      </span>
    </span>
  );
}

export type RangeImageCardProps = Readonly<{
  image: RangeItem["images"][number];
  alt: string;
  direction: SlideDirection;
  onClick?: () => void;
  ariaLabel?: string;
}>;

function RangeImageCard(props: Readonly<RangeImageCardProps>) {
  const { image, alt, direction, onClick, ariaLabel } = props;

  const cardContent = (
    <SlideImage
      src={image}
      alt={alt}
      direction={direction}
      sizes="(min-width: 640px) 300px, 240px"
    />
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className="relative h-75 w-60 shrink-0 cursor-pointer overflow-clip rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent sm:h-90 sm:w-75 md:flex-none"
      >
        {cardContent}
      </button>
    );
  }

  return (
    <div className="relative h-75 w-60 shrink-0 overflow-clip rounded sm:h-90 sm:w-75 md:flex-none">
      {cardContent}
    </div>
  );
}

export type RangeArrowDirection = "previous" | "next";

export type RangeArrowButtonProps = Readonly<{
  direction: RangeArrowDirection;
  onClick: () => void;
}>;

const arrowRotateClass: Record<RangeArrowDirection, string> = {
  previous: "rotate-90",
  next: "-rotate-90",
};

const arrowLabel: Record<RangeArrowDirection, string> = {
  previous: "Previous product",
  next: "Next product",
};

const arrowOpacityClass: Record<RangeArrowDirection, string> = {
  previous: "opacity-50",
  next: "",
};

function RangeArrowButton(props: Readonly<RangeArrowButtonProps>) {
  const { direction, onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={arrowLabel[direction]}
      className={`${navButtonClass} ${arrowOpacityClass[direction]}`}
    >
      <span className="relative size-10 overflow-clip sm:size-13">
        <Image
          src="/icons/arrow-md.svg"
          alt=""
          width={29}
          height={33}
          className={`size-full ${arrowRotateClass[direction]}`}
          unoptimized
        />
      </span>
    </button>
  );
}

const copyFadeClassByDirection: Record<SlideDirection, string> = {
  1: "animate-fade-slide-in-right",
  [-1]: "animate-fade-slide-in-left",
};

export type RangeCopyProps = Readonly<{
  item: RangeItem;
  activeIndex: number;
  direction: SlideDirection;
  onPrevious: () => void;
  onNext: () => void;
}>;

function RangeCopy(props: Readonly<RangeCopyProps>) {
  const { item, activeIndex, direction, onPrevious, onNext } = props;

  return (
    <div className="flex w-full flex-col items-end justify-between sm:h-90 md:flex md:w-180">
      <div
        key={item.name}
        className={`mt-8 flex w-full flex-col items-center gap-4 text-center sm:mt-20 ${copyFadeClassByDirection[direction]} motion-reduce:transform-none motion-reduce:transition-none`}
      >
        <div className="flex w-full flex-col gap-1">
          <h3 className="text-h4 text-ink-primary">{item.name}</h3>
          <p className="text-body-sm text-ink-muted">{item.tagline}</p>
        </div>
        <p className="text-caption text-ink-muted">{item.description}</p>
      </div>

      <div className="mt-8 flex items-end sm:mt-0">
        <p
          aria-live="polite"
          className="w-8.5 p-2 text-center text-caption font-medium text-brand-accent tabular-nums"
        >
          {activeIndex + 1}/{RANGE_COUNT}
        </p>
        <div className="flex items-center gap-1">
          <RangeArrowButton direction="previous" onClick={onPrevious} />
          <RangeArrowButton direction="next" onClick={onNext} />
        </div>
      </div>
    </div>
  );
}

export function TheRange() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<SlideDirection>(1);

  const activeItem = getRangeItem(activeIndex);
  const [peekImage, currentImage, aheadImage] = activeItem.images;

  function goToPrevious() {
    setDirection(-1);
    setActiveIndex((current) => wrapRangeIndex(current - 1));
  }

  function goToNext() {
    setDirection(1);
    setActiveIndex((current) => wrapRangeIndex(current + 1));
  }

  return (
    <section
      aria-labelledby="the-range-heading"
      className="relative overflow-x-clip bg-surface-base section-pad"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-brand-deep/12 blur-[90px] lg:-top-36 lg:-right-36 lg:size-120 lg:blur-[130px]"
      />

      <Reveal className="relative mx-auto flex w-full max-w-147 flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-1">
          <RangeGrainMark />
          <p className="text-body text-brand-accent">The Range</p>
        </div>
        <h2
          id="the-range-heading"
          className="w-full text-h3 text-ink-primary lg:text-h2"
        >
          Rice grown where the river runs cold.
        </h2>
      </Reveal>

      <Reveal delay="delay-150" className="relative mt-10 sm:mt-16">
        <div
          aria-roledescription="carousel"
          aria-label="Product range"
          className="w-full"
        >
          <div className="mx-auto hidden w-max max-w-full items-center gap-6 xl:flex">
            <RangeImageCard
              image={peekImage}
              alt=""
              direction={direction}
              onClick={goToPrevious}
              ariaLabel="Show previous product"
            />
            <RangeImageCard
              image={currentImage}
              alt={activeItem.imageAlt}
              direction={direction}
            />
            <RangeCopy
              item={activeItem}
              activeIndex={activeIndex}
              direction={direction}
              onPrevious={goToPrevious}
              onNext={goToNext}
            />
            <RangeImageCard
              image={aheadImage}
              alt=""
              direction={direction}
              onClick={goToNext}
              ariaLabel="Show next product"
            />
          </div>
          <div className="mx-auto hidden w-max max-w-full items-end gap-6 md:flex xl:hidden">
            <RangeImageCard
              image={currentImage}
              alt={activeItem.imageAlt}
              direction={direction}
            />
            <RangeCopy
              item={activeItem}
              activeIndex={activeIndex}
              direction={direction}
              onPrevious={goToPrevious}
              onNext={goToNext}
            />
          </div>
          <div className="flex flex-col items-center gap-8 md:hidden">
            <RangeImageCard
              image={currentImage}
              alt={activeItem.imageAlt}
              direction={direction}
            />
            <RangeCopy
              item={activeItem}
              activeIndex={activeIndex}
              direction={direction}
              onPrevious={goToPrevious}
              onNext={goToNext}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
