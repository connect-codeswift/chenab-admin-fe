import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/header";
import { OrdersContent } from "@/components/admin/orders/orders-content";
import { ORDERS, ORDERS_TOTAL } from "@/components/admin/orders/orders-data";

export const metadata: Metadata = {
  title: "Orders | Chenab Valley Rice Admin",
  description: "Every order, filterable by status.",
  robots: { index: false, follow: false },
};

export default function AdminOrdersPage() {
  return (
    <>
      <AdminHeader title="Orders" subtitle={`${ORDERS_TOTAL} orders total`} />
      <div className="scrollbar-none flex min-h-0 overflow-y-auto">
        {" "}
        <OrdersContent orders={ORDERS} />
      </div>
    </>
  );
}
