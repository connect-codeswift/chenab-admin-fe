import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/header";
import { OrderDetailContent } from "@/components/admin/orders/order-detail-content";
import {
  getOrderDetail,
  listOrderReferences,
} from "@/components/admin/orders/order-detail-data";
import { ORDERS_TOTAL } from "@/components/admin/orders/orders-data";

export const metadata: Metadata = {
  title: "Order | Chenab Valley Rice Admin",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return listOrderReferences().map((reference) => ({ reference }));
}

export default async function AdminOrderDetailPage({
  params,
}: PageProps<"/orders/[reference]">) {
  const { reference } = await params;
  const order = getOrderDetail(reference);

  if (!order) {
    notFound();
  }

  return (
    <>
      <AdminHeader title="Orders" subtitle={`${ORDERS_TOTAL} orders total`} />
      <div className="scrollbar-none min-h-0 overflow-y-auto">
        <OrderDetailContent order={order} />
      </div>
    </>
  );
}
