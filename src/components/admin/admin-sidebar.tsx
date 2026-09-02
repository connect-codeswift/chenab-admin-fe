"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  adminNavLinks,
  isAdminNavLinkActive,
  type AdminNavLink,
} from "@/components/admin/admin-nav";
import { logout } from "@/lib/auth/logout";

const linkBaseClass =
  "flex h-12 shrink-0 items-center gap-3 rounded px-4 py-3 text-body-sm lg:w-52.5 lg:px-5 lg:text-body focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

/* Figma node 212:4228 — the active link is a gold wash that fades out to the
   right; everything else sits in muted ink on the dark panel. */
const linkStateClass = {
  active:
    "bg-brand-accent/10 bg-linear-to-r from-brand-accent to-transparent font-medium text-ink-on-deep-muted",
  idle: "font-normal text-ink-on-deep-muted hover:bg-brand-accent/5",
} as const;

function AdminNavItem(
  props: Readonly<{ link: AdminNavLink; active: boolean }>,
) {
  const { link, active } = props;
  const state = active ? "active" : "idle";

  return (
    <Link
      href={link.href}
      aria-current={active ? "page" : undefined}
      className={`${linkBaseClass} ${linkStateClass[state]}`}
    >
      <Icon icon={link.icon} className="size-4.5 shrink-0" aria-hidden />
      {link.label}
    </Link>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex w-full shrink-0 flex-col overflow-clip bg-brand-deep shadow-xs backdrop-blur-md lg:fixed lg:top-5 lg:bottom-5 lg:left-5 lg:z-10 lg:w-60 lg:rounded">
      <div className="flex flex-col border-b border-surface-base/10 px-4 py-3 lg:px-5 lg:pt-7 lg:pb-5">
        <span className="flex items-center gap-1">
          <span className="relative size-11 shrink-0">
            <Image
              src="/images/admin/crest.png"
              alt=""
              fill
              sizes="44px"
              className="object-contain object-center"
            />
          </span>
          <span className="text-body-sm text-ink-on-deep-muted">
            Chenab Valley Rice
          </span>
        </span>
        <span className="hidden pl-9 text-tiny tracking-widest text-ink-on-deep-muted uppercase sm:block">
          Admin
        </span>
      </div>

      <nav
        aria-label="Admin"
        className="scrollbar-none px-4 py-3 lg:flex-1 lg:overflow-y-auto lg:px-0 lg:py-4"
      >
        <div className="scrollbar-none flex gap-2 overflow-x-auto lg:flex-col lg:gap-4 lg:overflow-visible">
          {adminNavLinks.map((link) => (
            <AdminNavItem
              key={link.href}
              link={link}
              active={isAdminNavLinkActive(pathname, link.href)}
            />
          ))}
        </div>
      </nav>

      <div className="flex items-center justify-between gap-3 border-t border-surface-base/10 px-4 py-3 lg:flex-col lg:items-stretch lg:gap-3 lg:px-5 lg:py-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded text-body-sm text-ink-on-deep-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
        >
          <Icon icon="mdi:open-in-new" className="size-4 shrink-0" aria-hidden />
          View site
        </Link>

        <button
          type="button"
          onClick={logout}
          className="flex cursor-pointer items-center gap-2 rounded text-body-sm text-ink-on-deep-muted transition-colors hover:text-ink-on-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
        >
          <Icon icon="mdi:logout" className="size-4 shrink-0" aria-hidden />
          Log out
        </button>
      </div>
    </div>
  );
}
