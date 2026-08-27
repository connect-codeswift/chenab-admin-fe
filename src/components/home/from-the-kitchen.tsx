"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";

const recipes = [
  {
    name: "Dum Biryani",
    uses: "Premium Super Basmati",
    href: "/recipes/dum-biryani",
    image: "/images/kitchen/dum-biryani.jpg",
    alt: "Chicken dum biryani plated with fried onions and green chilli",
    body: "Crafted with precision, our ancient rice variety is steamed to perfection. This process ensures that each grain maintains its unique shape and flavor, making every bite a delight.",
  },
  {
    name: "Chicken Pulao",
    uses: "1121 Steam Basmati",
    href: "/recipes/chicken-pulao",
    image: "/images/kitchen/chicken-pulao.jpg",
    alt: "Chicken pulao on an oval platter with raita and a gold serving spoon",
    body: "Crafted with precision, our ancient rice variety is steamed to perfection. This process ensures that each grain maintains its unique shape and flavor, making every bite a delight.",
  },
  {
    name: "Handi Biryani",
    uses: "Golden Sella",
    href: "/recipes/handi-biryani",
    image: "/images/kitchen/handi-biryani.jpg",
    alt: "Saffron handi biryani in a brass bowl with almonds and coriander",
    body: "Crafted with precision, our ancient rice variety is steamed to perfection. This process ensures that each grain maintains its unique shape and flavor, making every bite a delight.",
  },
  {
    name: "Saffron Pulao",
    uses: "Premium Super Basmati",
    href: "/recipes/saffron-pulao",
    image: "/images/kitchen/saffron-pulao.jpg",
    alt: "Golden saffron pulao served with chicken",
    body: "Crafted with precision, our ancient rice variety is steamed to perfection. This process ensures that each grain maintains its unique shape and flavor, making every bite a delight.",
  },
  {
    name: "Sindhi Biryani",
    uses: "Golden Sella",
    href: "/recipes/sindhi-biryani",
    image: "/images/kitchen/dum-biryani.jpg",
    alt: "Chicken dum biryani plated with fried onions and green chilli",
    body: "Crafted with precision, our ancient rice variety is steamed to perfection. This process ensures that each grain maintains its unique shape and flavor, making every bite a delight.",
  },
] as const;

type KitchenRecipe = (typeof recipes)[number];

const cardClass = "flex w-70 shrink-0 snap-start flex-col sm:w-80 md:w-96.25";
const navButtonClass =
  "inline-flex size-17 items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent";

export type KitchenCardProps = Readonly<{
  recipe: KitchenRecipe;
}>;

function KitchenCard(props: Readonly<KitchenCardProps>) {
  const { recipe } = props;

  return (
    <article data-kitchen-card className={`${cardClass} group`}>
      <div className="relative h-90 overflow-clip rounded md:h-105">
        <Link
          href={recipe.href}
          tabIndex={-1}
          aria-hidden
          className="absolute inset-0 z-0 block overflow-clip rounded"
        >
          <Image
            src={recipe.image}
            alt={recipe.alt}
            fill
            sizes="(min-width: 768px) 385px, (min-width: 640px) 320px, 280px"
            className="object-cover object-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-105 motion-reduce:transform-none"
          />
          <div className="absolute inset-0 bg-linear-to-t from-transparent to-ink-primary/80 transition-opacity duration-300 group-hover:opacity-90" />
        </Link>

        <div className="pointer-events-none absolute top-10 left-6 z-10 flex w-48 flex-col gap-2.5 md:top-20 md:left-8 md:w-48.75">
          <p className="text-body text-ink-on-deep">Uses: {recipe.uses}</p>
          <h3 className="text-h3 text-ink-on-deep md:text-h2">
            <Link
              href={recipe.href}
              className="pointer-events-auto rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
            >
              {recipe.name}
            </Link>
          </h3>
        </div>

        <Link
          href={recipe.href}
          aria-label={`Read the ${recipe.name} recipe`}
          className="absolute right-6 bottom-6 z-10 flex items-center rounded border border-line-default/30 bg-ink-primary/40 p-2 backdrop-blur-xs transition-all duration-300 ease-out group-hover:border-transparent group-hover:bg-ink-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent md:right-8 md:bottom-7.5"
        >
          <span className="relative inline-flex size-13 items-center justify-center overflow-clip">
            <span className="-scale-y-100 rotate-90 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none">
              <Image
                src="/icons/arrow-down-left.svg"
                alt=""
                width={25}
                height={25}
                className="size-6"
                unoptimized
              />
            </span>
          </span>
        </Link>
      </div>
      <p className="min-h-30 p-4 text-body text-ink-muted">{recipe.body}</p>
    </article>
  );
}

export type KitchenNavArrowProps = Readonly<{
  direction: "previous" | "next";
}>;

function KitchenNavArrow(props: Readonly<KitchenNavArrowProps>) {
  const { direction } = props;
  const rotateClass = direction === "previous" ? "rotate-90" : "-rotate-90";

  return (
    <span
      className={`relative inline-flex size-13 items-center justify-center overflow-clip ${rotateClass}`}
    >
      <Image
        src="/icons/arrow-down.svg"
        alt=""
        width={29}
        height={33}
        className="h-8.25 w-7.25"
        unoptimized
      />
    </span>
  );
}

export function FromTheKitchen() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;

    function syncNav() {
      if (!scroller) {
        return;
      }

      setAtStart(scroller.scrollLeft <= 8);
      setAtEnd(
        scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 8,
      );
    }

    scroller?.addEventListener("scroll", syncNav, { passive: true });
    window.addEventListener("resize", syncNav);
    const frame = requestAnimationFrame(syncNav);

    return () => {
      cancelAnimationFrame(frame);
      scroller?.removeEventListener("scroll", syncNav);
      window.removeEventListener("resize", syncNav);
    };
  }, []);

  function scrollByCard(direction: -1 | 1) {
    const scroller = scrollerRef.current;
    const card = scroller?.querySelector("[data-kitchen-card]");
    if (!scroller || !(card instanceof HTMLElement)) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const behavior = reduceMotion ? "auto" : "smooth";
    scroller.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 24),
      behavior,
    });
  }

  const previousClass = atStart
    ? `${navButtonClass} opacity-50`
    : navButtonClass;
  const nextClass = atEnd ? `${navButtonClass} opacity-50` : navButtonClass;

  return (
    <section
      aria-labelledby="from-the-kitchen-heading"
      aria-roledescription="carousel"
      className="relative overflow-x-clip bg-surface-base section-pad"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-brand-deep/12 blur-[90px] lg:-top-36 lg:-right-36 lg:size-120 lg:blur-[130px]"
      />

      <Reveal className="relative mx-auto flex w-full max-w-147 flex-col items-center gap-4 text-center">
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
          <p className="text-body text-brand-accent">From the Kitchen</p>
        </div>
        <h2
          id="from-the-kitchen-heading"
          className="w-full text-h3 text-ink-primary md:text-h2"
        >
          The rice makes the dish.
          <br />
          The dish reveals the rice.
        </h2>
      </Reveal>

      <Reveal
        delay="delay-150"
        className="relative mx-auto mt-8 w-max max-w-full"
      >
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto overscroll-x-contain [&::-webkit-scrollbar]:hidden"
        >
          {recipes.map((recipe) => (
            <KitchenCard key={recipe.name} recipe={recipe} />
          ))}
        </div>

        <div className="mt-8 flex justify-end gap-1">
          <button
            type="button"
            className={previousClass}
            aria-label="Previous recipes"
            aria-disabled={atStart}
            disabled={atStart}
            onClick={() => scrollByCard(-1)}
          >
            <KitchenNavArrow direction="previous" />
          </button>
          <button
            type="button"
            className={nextClass}
            aria-label="Next recipes"
            aria-disabled={atEnd}
            disabled={atEnd}
            onClick={() => scrollByCard(1)}
          >
            <KitchenNavArrow direction="next" />
          </button>
        </div>
      </Reveal>
    </section>
  );
}
