"use client";

import Image from "next/image";
import { useEffect, useRef, type FormEvent } from "react";

export type SiteSearchProps = Readonly<{
  open: boolean;
  onClose: () => void;
}>;

export function SiteSearch(props: Readonly<SiteSearchProps>) {
  const { open, onClose } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    inputRef.current?.focus();
  }, [open]);

  const panelMotionClass = open
    ? "pointer-events-auto translate-y-0 opacity-100"
    : "pointer-events-none translate-y-[-100vh] opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-0";
  const backdropMotionClass = open
    ? "opacity-100"
    : "pointer-events-none opacity-0";

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <>
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close search"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-ink-primary/50 backdrop-blur-[5px] transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:duration-200 ${backdropMotionClass}`}
        onClick={onClose}
      />
      <div
        id="site-search"
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        aria-hidden={!open}
        inert={!open}
        className="pointer-events-none fixed inset-0 z-60 flex items-center justify-center px-4 sm:px-6 lg:px-30"
      >
        <form
          className={`flex h-12 w-full max-w-162.5 items-center gap-4.5 overflow-clip rounded bg-line-default px-2 transition-transform duration-1500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-brand-accent motion-reduce:transition-opacity motion-reduce:duration-200 ${panelMotionClass}`}
          onSubmit={onSubmit}
        >
          <span className="relative inline-flex size-9 shrink-0 items-center justify-center overflow-clip">
            <Image
              src="/icons/search-muted.svg"
              alt=""
              width={30}
              height={30}
              className="size-7.5"
              unoptimized
            />
          </span>
          <label className="sr-only" htmlFor="site-search-input">
            Search Product
          </label>
          <input
            ref={inputRef}
            id="site-search-input"
            type="search"
            name="q"
            placeholder="Search Product"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-[18px] leading-6 font-normal tracking-h4 text-ink-muted outline-none placeholder:text-ink-muted"
          />
        </form>
      </div>
    </>
  );
}
