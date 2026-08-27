"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { SiteMenu } from "@/components/site-menu";
import { SiteSearch } from "@/components/site-search";

export type HeaderProps = Readonly<{
  cartCount?: number;
}>;

const iconButtonClass =
  "relative inline-flex size-8 items-center justify-center overflow-clip rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent sm:size-9 md:size-10";

export function Header(props: Readonly<HeaderProps>) {
  const { cartCount = 0 } = props;
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);
  const isHome = pathname === "/" || pathname === "/home";

  useEffect(() => {
    if (!menuOpen && !searchOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function onScroll() {
      const y = window.scrollY;

      if (menuOpen || searchOpen) {
        setHeaderHidden(false);
        lastScrollY.current = y;
        return;
      }

      const delta = y - lastScrollY.current;
      const goingDown = delta > 6;
      const goingUp = delta < -6;

      if (y < 48) {
        setHeaderHidden(false);
      } else if (goingDown) {
        setHeaderHidden(true);
      } else if (goingUp) {
        setHeaderHidden(false);
      }

      lastScrollY.current = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    const frame = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen, searchOpen]);

  const headerSlideClass = headerHidden
    ? "pointer-events-none -translate-y-full opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-0"
    : "translate-y-0 opacity-100";

  function toggleMenu() {
    setSearchOpen(false);
    setMenuOpen((open) => !open);
  }

  function toggleSearch() {
    setMenuOpen(false);
    if (searchOpen) {
      setSearchOpen(false);
      return;
    }

    window.scrollTo(0, 0);
    setSearchOpen(true);
  }

  function closeOverlays() {
    setMenuOpen(false);
    setSearchOpen(false);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`relative z-70 px-4 pt-4 transition-transform duration-1500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform motion-reduce:transition-opacity motion-reduce:duration-200 sm:px-6 sm:pt-6 md:pt-8 lg:px-30 ${headerSlideClass}`}
        >
          <div className="flex h-16 items-center justify-between sm:h-20 md:h-28.75">
            <button
              type="button"
              className="flex shrink-0 items-center gap-2 rounded text-ink-on-deep-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent md:gap-4"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={toggleMenu}
            >
              <span className="relative inline-flex size-10 items-center justify-center overflow-clip sm:size-12 md:size-14.5">
                <Image
                  src="/icons/menu.svg"
                  alt=""
                  width={39}
                  height={39}
                  className="size-7 sm:size-8 md:size-9.75"
                  unoptimized
                />
              </span>
              <span className="hidden text-h3 md:block">Menu</span>
              <span className="sr-only md:hidden">Menu</span>
            </button>

            <Link
              href="/"
              aria-label="Chenab Valley Rice home"
              className="shrink-0 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
              onClick={closeOverlays}
            >
              <BrandMark />
            </Link>

            <div className="flex shrink-0 items-center justify-end gap-3 sm:gap-6 md:w-50 md:gap-10">
              <button
                type="button"
                aria-label="Search"
                aria-expanded={searchOpen}
                aria-controls="site-search"
                className={iconButtonClass}
                onClick={toggleSearch}
              >
                <Image
                  src="/icons/search.svg"
                  alt=""
                  width={33}
                  height={33}
                  className="size-6 sm:size-7 md:size-8.25"
                  unoptimized
                />
              </button>
              <Link
                href="/cart"
                aria-label="Cart"
                className={iconButtonClass}
                onClick={closeOverlays}
              >
                <Image
                  src="/icons/cart.svg"
                  alt=""
                  width={33}
                  height={33}
                  className="size-6 sm:size-7 md:size-8.25"
                  unoptimized
                />
                {cartCount > 0 ? (
                  <span className="absolute -top-1 -right-1 flex min-w-4.5 items-center justify-center rounded-full bg-brand-accent px-1 text-tiny text-ink-primary">
                    {cartCount}
                  </span>
                ) : null}
              </Link>
              <button
                type="button"
                aria-label="Account"
                className={iconButtonClass}
              >
                <Image
                  src="/icons/user.svg"
                  alt=""
                  width={30}
                  height={33}
                  className="h-6 w-5.5 sm:h-7 sm:w-6.5 md:h-8.25 md:w-7.5"
                  unoptimized
                />
              </button>
            </div>
          </div>
        </div>

        <SiteMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      </header>
      {isHome ? null : <div className="h-20 sm:h-26 md:h-36.75" aria-hidden />}
    </>
  );
}
