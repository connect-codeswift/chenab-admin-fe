import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/header";
import { OrderDetailPageContent } from "@/components/admin/orders/order-detail-page-content";

export const metadata: Metadata = {
  title: "Order | Chenab Valley Rice Admin",
  robots: { index: false, follow: false },
};

export default async function AdminOrderDetailPage({
  params,
}: PageProps<"/orders/[reference]">) {
  const { reference } = await params;

  return (
    <>
      <AdminHeader title="Orders" />
      <div className="scrollbar-none min-h-0 overflow-y-auto">
        <OrderDetailPageContent reference={reference} />
      </div>
    </>
  );
}
