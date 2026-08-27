"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type RevealDelay = "delay-0" | "delay-150" | "delay-300";

export type RevealProps = Readonly<{
  children: ReactNode;
  delay?: RevealDelay;
  className?: string;
}>;

/* Scroll-into-view reveal: the block rises and fades in the first time it
   enters the viewport, then stays. Sibling blocks stagger via `delay`.
   Reduced motion renders everything visible with no transition. */
export function Reveal(props: Readonly<RevealProps>) {
  const { children, delay = "delay-0", className } = props;
  const contentRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = contentRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const revealClass = visible
    ? "translate-y-0 opacity-100"
    : "translate-y-8 opacity-0";
  const wrapperClass = className ?? "";

  return (
    <div
      ref={contentRef}
      className={`${wrapperClass} ${revealClass} ${delay} transition duration-700 ease-out will-change-transform motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none`}
    >
      {children}
    </div>
  );
}
