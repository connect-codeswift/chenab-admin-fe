"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

export type SlideDirection = -1 | 1;

export type SlideImageSource = string | StaticImageData;

export type SlideImageProps = Readonly<{
  src: SlideImageSource;
  alt: string;
  direction: SlideDirection;
  sizes?: string;
}>;

type SlideState = Readonly<{
  current: SlideImageSource;
  outgoing: SlideImageSource | null;
}>;

function sourceKey(src: SlideImageSource): string {
  return typeof src === "string" ? src : src.src;
}

const SLIDE_DURATION_MS = 1100;

const incomingAnimationClassByDirection: Record<SlideDirection, string> = {
  1: "animate-slide-in-right",
  [-1]: "animate-slide-in-left",
};

const outgoingAnimationClassByDirection: Record<SlideDirection, string> = {
  1: "animate-slide-out-left",
  [-1]: "animate-slide-out-right",
};

/* Directional slide-swap for a `fill` image: when `src` changes, the outgoing
   image slides out and the incoming one slides in from the opposite edge —
   `direction` 1 (next) travels right → left, -1 (previous) left → right.
   The parent must clip overflow. Reduced motion swaps instantly. */
export function SlideImage(props: Readonly<SlideImageProps>) {
  const { src, alt, direction, sizes } = props;
  const [slide, setSlide] = useState<SlideState>({
    current: src,
    outgoing: null,
  });

  if (sourceKey(slide.current) !== sourceKey(src)) {
    setSlide({ current: src, outgoing: slide.current });
  }

  useEffect(() => {
    if (!slide.outgoing) {
      return;
    }

    const timeout = setTimeout(() => {
      setSlide((previous) => ({ ...previous, outgoing: null }));
    }, SLIDE_DURATION_MS);

    return () => {
      clearTimeout(timeout);
    };
  }, [slide]);

  if (!slide.outgoing) {
    return (
      <Image
        key={`static-${sourceKey(slide.current)}`}
        src={slide.current}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover object-center"
      />
    );
  }

  const outgoingClass = outgoingAnimationClassByDirection[direction];
  const incomingClass = incomingAnimationClassByDirection[direction];

  return (
    <>
      <Image
        key={`out-${sourceKey(slide.outgoing)}`}
        src={slide.outgoing}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        className={`object-cover object-center motion-reduce:transform-none motion-reduce:transition-none ${outgoingClass}`}
      />
      <Image
        key={`in-${sourceKey(slide.current)}`}
        src={slide.current}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover object-center motion-reduce:transform-none motion-reduce:transition-none ${incomingClass}`}
      />
    </>
  );
}
