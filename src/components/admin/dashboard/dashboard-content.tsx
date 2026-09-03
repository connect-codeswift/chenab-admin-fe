"use client";

import { useMemo } from "react";
import { RecentOrders } from "@/components/admin/dashboard/recent-orders";
import { RevenueChart } from "@/components/admin/dashboard/revenue-chart";
import { StatCard } from "@/components/admin/dashboard/stat-card";
import { TopProducts } from "@/components/admin/dashboard/top-products";
import { useDashboardRecentOrders } from "@/hooks/use-dashboard-recent-orders";
import { useDashboardRevenue } from "@/hooks/use-dashboard-revenue";
import { useDashboardSummary } from "@/hooks/use-dashboard-summary";
import { useDashboardTopProducts } from "@/hooks/use-dashboard-top-products";
import {
  toDashboardStats,
  toRecentOrders,
  toRevenueBars,
  toTopProducts,
} from "@/services/dashboard.mapper";

function StatCardsSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-36 animate-pulse rounded bg-surface-base/50"
        />
      ))}
    </>
  );
}

function ChartSkeleton() {
  return <div className="h-72 animate-pulse rounded bg-surface-base/50" />;
}

function PanelError({ message }: Readonly<{ message: string }>) {
  return <p className="text-body-sm text-state-critical">{message}</p>;
}

export function DashboardContent() {
  const summaryQuery = useDashboardSummary();
  const revenueQuery = useDashboardRevenue();
  const topProductsQuery = useDashboardTopProducts();
  const recentOrdersQuery = useDashboardRecentOrders();

  const stats = useMemo(
    () => (summaryQuery.data ? toDashboardStats(summaryQuery.data) : []),
    [summaryQuery.data],
  );

  const revenueBars = useMemo(
    () => (revenueQuery.data ? toRevenueBars(revenueQuery.data) : []),
    [revenueQuery.data],
  );

  const topProducts = useMemo(
    () =>
      topProductsQuery.data ? toTopProducts(topProductsQuery.data) : [],
    [topProductsQuery.data],
  );

  const recentOrders = useMemo(
    () =>
      recentOrdersQuery.data ? toRecentOrders(recentOrdersQuery.data) : [],
    [recentOrdersQuery.data],
  );

  const rangeLabel = revenueQuery.data
    ? `Last ${revenueQuery.data.days} days`
    : "Last 7 days";

  return (
    <div className="scrollbar-none flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryQuery.isLoading ? (
          <StatCardsSkeleton />
        ) : summaryQuery.isError ? (
          <p className="col-span-full text-body-sm text-state-critical">
            {summaryQuery.error.message ?? "Failed to load dashboard summary."}
          </p>
        ) : (
          stats.map((stat) => <StatCard key={stat.id} stat={stat} />)
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          {revenueQuery.isLoading ? (
            <ChartSkeleton />
          ) : revenueQuery.isError ? (
            <PanelError
              message={
                revenueQuery.error.message ?? "Failed to load revenue."
              }
            />
          ) : (
            <RevenueChart bars={revenueBars} rangeLabel={rangeLabel} />
          )}
        </div>
        {topProductsQuery.isLoading ? (
          <ChartSkeleton />
        ) : topProductsQuery.isError ? (
          <PanelError
            message={
              topProductsQuery.error.message ??
              "Failed to load top products."
            }
          />
        ) : (
          <TopProducts products={topProducts} />
        )}
      </div>

      {recentOrdersQuery.isLoading ? (
        <ChartSkeleton />
      ) : recentOrdersQuery.isError ? (
        <PanelError
          message={
            recentOrdersQuery.error.message ??
            "Failed to load recent orders."
          }
        />
      ) : (
        <RecentOrders orders={recentOrders} />
      )}
    </div>
  );
}
