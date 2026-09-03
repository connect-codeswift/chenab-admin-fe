import type { Metadata } from "next";
import { DashboardContent } from "@/components/admin/dashboard/dashboard-content";
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
      <DashboardContent />
    </>
  );
}
