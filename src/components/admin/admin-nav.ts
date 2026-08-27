export type AdminNavLink = Readonly<{
  href: string;
  label: string;
  icon: string;
}>;

/* Sidebar navigation — Figma node 166:3063. Only Dashboard is built; the rest
   land with their own screens. */
export const adminNavLinks: readonly AdminNavLink[] = [
  {
    href: "/",
    label: "Dashboard",
    icon: "/icons/admin/nav-dashboard.svg",
  },
  {
    href: "/orders",
    label: "Orders",
    icon: "/icons/admin/nav-orders.svg",
  },
  {
    href: "/products",
    label: "Products",
    icon: "/icons/admin/nav-products.svg",
  },
  {
    href: "/inquiries",
    label: "Inquiries",
    icon: "/icons/admin/nav-inquiries.svg",
  },
];

export function isAdminNavLinkActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
