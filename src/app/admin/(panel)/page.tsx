import type { Metadata } from "next";
import { RecentOrders } from "@/components/admin/dashboard/recent-orders";
import { RevenueChart } from "@/components/admin/dashboard/revenue-chart";
import { StatCard } from "@/components/admin/dashboard/stat-card";
import { TopProducts } from "@/components/admin/dashboard/top-products";
import {
  DASHBOARD_STATS,
  RECENT_ORDERS,
  REVENUE_THIS_WEEK,
  TOP_PRODUCTS,
} from "@/components/admin/dashboard/dashboard-data";
import { AdminHeader } from "@/components/admin/header";

export const metadata: Metadata = {
  title: "Dashboard | Chenab Valley Rice Admin",
  description: "Revenue, orders and stock at a glance.",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return (
    <>
      <AdminHeader />
      <div className="scrollbar-none flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
        <div className="fe grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {DASHBOARD_STATS.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="min-w-0 lg:col-span-2">
            <RevenueChart bars={REVENUE_THIS_WEEK} rangeLabel="Last 7 days" />
          </div>
          <TopProducts products={TOP_PRODUCTS} />
        </div>

        <RecentOrders orders={RECENT_ORDERS} />
      </div>
    </>
  );
}
