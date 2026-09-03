import type { ApiOrder, ApiOrderRow } from "@/lib/api/order-types";
import type {
  OrderDetail,
  OrderLineItem,
  OrderPaymentDetail,
  OrderTimelineEntry,
} from "@/components/admin/orders/order-detail-types";
import type { OrderPayment, OrderRow } from "@/components/admin/orders/orders-types";

/** Derive a frontend-friendly payment method label from the raw API string. */
function mapPaymentMethod(method: string): OrderPayment {
  const normalized = method.toLowerCase();
  if (normalized.includes("bank") || normalized.includes("transfer")) return "Bank";
  if (normalized.includes("card")) return "Card";
  return "COD";
}

/** Map an order list row from the API to the frontend OrderRow shape. */
export function toOrderRow(api: ApiOrderRow): OrderRow {
  return {
    id: api.id,
    reference: api.reference,
    placedOn: formatDate(api.placedAt),
    customer: api.customerName,
    city: api.city,
    itemCount: api.itemCount,
    total: api.total,
    payment: mapPaymentMethod(api.paymentMethod),
    status: api.status,
  };
}

/** Format an ISO date string to "DD MMM YYYY" (e.g. "04 Aug 2026"). */
function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

/** Format an ISO date string to "DD MMM YYYY, HH:MM" */
function formatDateTime(iso: string): string {
  try {
    const date = new Date(iso);
    const datePart = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const timePart = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${datePart}, ${timePart}`;
  } catch {
    return iso;
  }
}

/** Map a full API order to the frontend OrderDetail shape. */
export function toOrderDetail(api: ApiOrder): OrderDetail {
  const items: OrderLineItem[] = api.items.map((item) => ({
    id: item.id,
    name: item.productName,
    packSize: item.skuSize,
    quantity: item.quantity,
    lineTotal: item.lineTotal,
  }));

  const payment: OrderPaymentDetail = {
    method: api.payment.method,
    confirmedAt: api.payment.confirmedAt
      ? formatDateTime(api.payment.confirmedAt)
      : undefined,
    amount: api.payment.amount,
  };

  const timeline: OrderTimelineEntry[] = api.timeline.map((entry) => ({
    id: entry.id,
    label: entry.label,
    actor: entry.actor,
    at: formatDateTime(entry.at),
  }));

  const { shippingAddress } = api;
  const addressLines: string[] = [shippingAddress.line1];
  if (shippingAddress.line2) addressLines.push(shippingAddress.line2);
  addressLines.push(shippingAddress.city);
  if (shippingAddress.province) addressLines.push(shippingAddress.province);

  return {
    reference: api.reference,
    status: api.status,
    placedAt: formatDateTime(api.placedAt),
    customer: {
      name: api.customer.name,
      email: api.customer.email,
      phone: api.customer.phone,
    },
    deliverTo: addressLines,
    items,
    subtotal: api.subtotal,
    delivery: api.deliveryFee,
    total: api.total,
    payment,
    timeline,
  };
}
