"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type HeroStackProps = Readonly<{
  hero: ReactNode;
  children: ReactNode;
}>;

/* Sticky-hero stack: the hero pins as the background while the next section
   slides over it. Drives `--hero-progress` (0 → 1 as the sheet covers the
   hero) so the hero can recede — set straight on the node, no re-renders. */
export function HeroStack(props: Readonly<HeroStackProps>) {
  const { hero, children } = props;
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = stackRef.current;

    if (!node) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame: number | null = null;

    function syncProgress() {
      frame = null;

      if (!node) {
        return;
      }

      const progress = Math.min(
        Math.max(-node.getBoundingClientRect().top / window.innerHeight, 0),
        1,
      );
      node.style.setProperty("--hero-progress", progress.toFixed(3));
    }

    function scheduleSync() {
      if (frame !== null) {
        return;
      }

      frame = window.requestAnimationFrame(syncProgress);
    }

    scheduleSync();
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
    };
  }, []);

  return (
    <div ref={stackRef} className="relative">
      {hero}
      {children}
    </div>
  );
}
