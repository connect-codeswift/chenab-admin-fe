import { useEffect, useRef, useState } from "react";

export type RevealedCount = 0 | 1 | 2 | 3 | 4;
export type ScrollRevealSteps = 3 | 4;

function resolveRevealedCount(
  section: HTMLElement,
  stepCount: ScrollRevealSteps,
): RevealedCount {
  const rect = section.getBoundingClientRect();
  const scrollableDistance = section.offsetHeight - window.innerHeight;

  if (scrollableDistance <= 0) {
    return stepCount;
  }

  if (rect.top <= 0) {
    const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);
    const count = Math.min(stepCount, Math.floor(progress * stepCount) + 1);

    return count as RevealedCount;
  }

  return 0;
}

/* Shared staging for the pinned scroll-reveal sections (Certified, How We
   Deliver, Why Chenab Valley). The outer section is a tall scroll track with
   a sticky full-viewport panel inside; on desktop the given number of steps
   reveal one by one, spread evenly across scroll progress, and on mobile
   everything reveals once in view. */
export function useScrollReveal(stepCount: ScrollRevealSteps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealedCount, setRevealedCount] = useState<RevealedCount>(0);
  const [sectionInView, setSectionInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) {
      return;
    }

    const section = node;
    const desktopMedia = window.matchMedia("(min-width: 1024px)");
    let frame: number | null = null;

    function syncRevealedCount() {
      frame = null;

      if (desktopMedia.matches) {
        setRevealedCount(resolveRevealedCount(section, stepCount));
      }
    }

    function scheduleSync() {
      if (frame !== null) {
        return;
      }

      frame = window.requestAnimationFrame(syncRevealedCount);
    }

    scheduleSync();
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    desktopMedia.addEventListener("change", scheduleSync);

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      desktopMedia.removeEventListener("change", scheduleSync);
    };
  }, [stepCount]);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting) {
          setSectionInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { sectionRef, revealedCount, sectionInView };
}
