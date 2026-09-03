import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/header";
import { OrdersContent } from "@/components/admin/orders/orders-content";

export const metadata: Metadata = {
  title: "Orders | Chenab Valley Rice Admin",
  description: "Every order, filterable by status.",
  robots: { index: false, follow: false },
};

export default function AdminOrdersPage() {
  return (
    <>
      <AdminHeader title="Orders" />
      <div className="scrollbar-none flex min-h-0 overflow-y-auto">
        <OrdersContent />
      </div>
    </>
  );
}
