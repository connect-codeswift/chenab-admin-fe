export type SiteNavLink = Readonly<{
  href: string;
  label: string;
}>;

export type SiteNavGroup = Readonly<{
  title: string;
  links: readonly SiteNavLink[];
}>;

export const shopLinks: readonly SiteNavLink[] = [
  { href: "/shop", label: "All Rice" },
  { href: "/shop/premium-super-basmati", label: "Premium super Basmati" },
  { href: "/shop/1121-steam-basmati", label: "1121 Steam Basmati" },
  { href: "/shop/golden-sella", label: "Golden Sella" },
  { href: "/shop/brown-basmati", label: "Brown Basmati" },
];

export const storyLinks: readonly SiteNavLink[] = [
  { href: "/our-valley", label: "Our Valley" },
  { href: "/quality", label: "Quality" },
  { href: "/recipes", label: "Recipes" },
];

export const helpLinks: readonly SiteNavLink[] = [
  { href: "/delivery-and-returns", label: "Delivery & Return" },
  { href: "/where-to-buy", label: "Where to Buy" },
  { href: "/trade", label: "Trade Inquiry" },
  { href: "#", label: "WhatsApp" },
];

export const footerNavGroups: readonly SiteNavGroup[] = [
  { title: "Shop", links: shopLinks },
  { title: "Story", links: storyLinks },
  { title: "Help", links: helpLinks },
];

export const menuNavLinks: readonly SiteNavLink[] = [
  { href: "/shop", label: "Shop" },
  { href: "/our-valley", label: "Our Valley" },
  { href: "/quality", label: "Quality" },
  { href: "/recipes", label: "Recipes" },
];
