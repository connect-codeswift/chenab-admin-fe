"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { menuNavLinks } from "@/components/site-nav";

export type SiteMenuProps = Readonly<{
  open: boolean;
  onClose: () => void;
}>;

const idleLinkClass =
  "rounded p-2 text-h3 text-ink-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent";
const activeLinkClass = `${idleLinkClass} border-b-4 border-ink-muted`;

export function SiteMenu(props: Readonly<SiteMenuProps>) {
  const { open, onClose } = props;
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    closeRef.current?.focus();
  }, [open]);

  const panelMotionClass = open
    ? "translate-x-0 opacity-100"
    : "pointer-events-none translate-x-[-100%] opacity-100 motion-reduce:translate-x-0 motion-reduce:opacity-0";
  const backdropMotionClass = open
    ? "opacity-100"
    : "pointer-events-none opacity-0";

  return (
    <>
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-brand-deep/30 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:duration-200 ${backdropMotionClass}`}
        onClick={onClose}
      />
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-y-0 left-0 z-80 flex w-full max-w-152 flex-col bg-line-default pt-17 pr-6 pb-10 pl-6 shadow-[8px_0_40px_rgb(38_22_9_/_0.16)] transition-transform duration-1500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform motion-reduce:transition-opacity motion-reduce:duration-200 md:pt-[69px] md:pr-10 md:pl-30 ${panelMotionClass}`}
      >
        <div className="flex flex-col items-start gap-14">
          <button
            ref={closeRef}
            type="button"
            className="flex items-center gap-3 rounded text-h3 text-ink-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
            onClick={onClose}
          >
            <span className="relative inline-flex size-12 items-center justify-center overflow-clip">
              <Image
                src="/icons/close.svg"
                alt=""
                width={39}
                height={39}
                className="size-[39px]"
                unoptimized
              />
            </span>
            Close
          </button>

          <nav className="flex w-full flex-col items-start gap-6">
            {menuNavLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              const linkClass = isActive ? activeLinkClass : idleLinkClass;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkClass}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
