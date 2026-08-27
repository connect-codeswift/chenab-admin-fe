import type {
  DashboardStat,
  RecentOrder,
  RevenueBar,
  TopProduct,
} from "@/components/admin/dashboard/dashboard-types";

/* Placeholder figures lifted from Figma node 166:1817 — there is no admin API
   yet, so every number here is design copy, not a real reading. Swap the whole
   module for query hooks once the backend contract lands. */

/* Rendered as-is rather than from `new Date()`: the page is statically
   prerendered, so a live clock would freeze at build time anyway. */
export const DASHBOARD_DATE_LABEL = "Friday, 8 August 2026";

/* Becomes the signed-in admin's name once auth exists. */
export const DASHBOARD_GREETING_NAME = "Boss 👋🏻";

export const DASHBOARD_STATS: readonly DashboardStat[] = [
  {
    id: "weekly-revenue",
    label: "Weekly revenue",
    value: "Rs. 556k",
    note: "+18% vs last week",
    tone: "dark",
    trend: "positive",
    arrow: "up",
  },
  {
    id: "orders-today",
    label: "Orders Today",
    value: "22",
    note: "+18% vs last week",
    tone: "light",
    trend: "positive",
    arrow: "up",
  },
  {
    id: "awaiting-action",
    label: "Awaiting Action",
    value: "5",
    note: "New orders unconfirmed",
    tone: "light",
    trend: "positive",
    arrow: "up",
  },
  {
    id: "out-of-stock",
    label: "Out of Stock",
    value: "2",
    note: "SKUs need restocking",
    tone: "light",
    trend: "critical",
    arrow: "down",
  },
];

/* Amounts are back-solved from the Figma bar heights so the chart keeps its
   designed silhouette. */
export const REVENUE_THIS_WEEK: readonly RevenueBar[] = [
  { day: "Wed", amount: 64000 },
  { day: "Thu", amount: 85000 },
  { day: "Fri", amount: 54000 },
  { day: "Sat", amount: 102000 },
  { day: "Sun", amount: 78000 },
  { day: "Mon", amount: 121000 },
  { day: "Tue", amount: 123000 },
];

export const TOP_PRODUCTS: readonly TopProduct[] = [
  {
    id: "super-kernel-basmati-5kg",
    name: "Super Kernel Basmati 5kg",
    unitsSold: 142,
    revenue: 3250,
  },
  {
    id: "sella-basmati-10kg",
    name: "Sella Basmati 10kg",
    unitsSold: 98,
    revenue: 5800,
  },
  {
    id: "steam-basmati-25kg",
    name: "Steam Basmati 25kg",
    unitsSold: 64,
    revenue: 13500,
  },
  {
    id: "brown-basmati-5kg",
    name: "Brown Basmati 5kg",
    unitsSold: 41,
    revenue: 3600,
  },
  {
    id: "kainat-1121-10kg",
    name: "Kainat 1121 10kg",
    unitsSold: 37,
    revenue: 6400,
  },
];

export const RECENT_ORDERS: readonly RecentOrder[] = [
  {
    reference: "#CVR-1042",
    customer: "Ahmed Raza",
    items: "Super Kernel 5kg × 2",
    total: 6500,
    status: "delivered",
    placedOn: "12 Aug 2026",
  },
  {
    reference: "#CVR-1041",
    customer: "Fatima Noor",
    items: "Sella Basmati 10kg × 1",
    total: 5800,
    status: "processing",
    placedOn: "12 Aug 2026",
  },
  {
    reference: "#CVR-1040",
    customer: "Bilal Khan",
    items: "Steam Basmati 25kg × 2",
    total: 27000,
    status: "pending",
    placedOn: "11 Aug 2026",
  },
  {
    reference: "#CVR-1039",
    customer: "Sana Malik",
    items: "Brown Basmati 5kg × 3",
    total: 10800,
    status: "delivered",
    placedOn: "11 Aug 2026",
  },
  {
    reference: "#CVR-1038",
    customer: "Usman Tariq",
    items: "Kainat 1121 10kg × 1",
    total: 6400,
    status: "cancelled",
    placedOn: "10 Aug 2026",
  },
];
