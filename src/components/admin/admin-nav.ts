export type AdminNavLink = Readonly<{
  href: string;
  label: string;
  icon: string;
}>;

/* Sidebar navigation — Figma node 166:3063. Icons are Iconify names. */
export const adminNavLinks: readonly AdminNavLink[] = [
  {
    href: "/",
    label: "Dashboard",
    icon: "mdi:view-dashboard-outline",
  },
  {
    href: "/orders",
    label: "Orders",
    icon: "mdi:clipboard-list-outline",
  },
  {
    href: "/products",
    label: "Products",
    icon: "mdi:package-variant-closed",
  },
  {
    href: "/inquiries",
    label: "Inquiries",
    icon: "mdi:message-text-outline",
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: "mdi:bell-outline",
  },
];

export function isAdminNavLinkActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
