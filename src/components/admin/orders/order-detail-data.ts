import { ORDERS } from "@/components/admin/orders/orders-data";
import type {
  OrderDetail,
  OrderLineItem,
} from "@/components/admin/orders/order-detail-types";
import type {
  OrderRow,
  OrderStatus,
} from "@/components/admin/orders/orders-types";

/* Placeholder detail lifted from Figma node 184:2353. Only CVR-00480 is drawn
   in the design; the other references are composed from their list row so the
   screen stays navigable. All of it goes when the admin API lands. */

const DELIVERY_FEE = 350;

const PACK_CATALOGUE = [
  { name: "Premium Super Basmati", packSize: "5 kg bag", unitPrice: 1450 },
  { name: "1121 Steam Basmati", packSize: "10 kg bag", unitPrice: 3100 },
  { name: "Golden Sella", packSize: "25 kg bag", unitPrice: 6400 },
  { name: "Brown Basmati", packSize: "5 kg bag", unitPrice: 1200 },
] as const;

const TIMELINE_LABEL_BY_STATUS: Record<OrderStatus, string> = {
  new: "Order placed",
  confirmed: "Confirmed",
  packed: "Packed",
  dispatched: "Dispatched",
  delivered: "Delivered",
};

/* Exactly as drawn — two lines, Rs. 6,000 + Rs. 350. Note the Figma list row
   for this reference says 3 items / Rs. 7,850; the mock disagrees with itself
   and the detail frame wins here. */
const DESIGNED_DETAIL: OrderDetail = {
  reference: "CVR-00480",
  status: "confirmed",
  placedAt: "04 Aug 2026, 10:41",
  customer: {
    name: "Sara Khan",
    email: "sara@example.com",
    phone: "0300-9876543",
  },
  deliverTo: ["25-A, Block 8, Clifton", "Karachi"],
  items: [
    {
      id: "premium-super-basmati-5kg",
      name: "Premium Super Basmati",
      packSize: "5 kg bag",
      quantity: 2,
      lineTotal: 2900,
    },
    {
      id: "1121-steam-basmati-10kg",
      name: "1121 Steam Basmati",
      packSize: "10 kg bag",
      quantity: 1,
      lineTotal: 3100,
    },
  ],
  subtotal: 6000,
  delivery: DELIVERY_FEE,
  total: 6350,
  payment: {
    method: "Bank transfer",
    confirmedAt: "04 Aug 2026, 10:43",
    amount: 6350,
  },
  timeline: [
    {
      id: "placed",
      label: "Order placed",
      actor: "Customer",
      at: "04 Aug 2026, 10:41",
    },
    {
      id: "payment",
      label: "Payment confirmed",
      actor: "System",
      at: "04 Aug 2026, 10:43",
    },
    {
      id: "confirmed",
      label: "Confirmed",
      actor: "Rauf (admin)",
      at: "04 Aug 2026, 11:15",
    },
  ],
};

const PAYMENT_METHOD_LABEL: Record<OrderRow["payment"], string> = {
  COD: "Cash on delivery",
  Bank: "Bank transfer",
  Card: "Card payment",
};

function buildItems(order: OrderRow, subtotal: number): OrderLineItem[] {
  const items: OrderLineItem[] = [];
  let remaining = subtotal;

  for (let index = 0; index < order.itemCount; index += 1) {
    const pack = PACK_CATALOGUE[index % PACK_CATALOGUE.length];
    const isLast = index === order.itemCount - 1;
    const lineTotal = isLast
      ? remaining
      : Math.min(pack.unitPrice, Math.max(remaining - 500, 0));

    remaining -= lineTotal;
    items.push({
      id: `${order.reference}-${index}`,
      name: pack.name,
      packSize: pack.packSize,
      quantity: 1,
      lineTotal,
    });
  }

  return items;
}

function buildDetail(order: OrderRow): OrderDetail {
  const subtotal = Math.max(order.total - DELIVERY_FEE, 0);
  const [firstName] = order.customer.toLowerCase().split(" ");

  return {
    reference: order.reference,
    status: order.status,
    placedAt: `${order.placedOn}, 10:41`,
    customer: {
      name: order.customer,
      email: `${firstName}@example.com`,
      phone: "0300-0000000",
    },
    deliverTo: ["Address on file", order.city],
    items: buildItems(order, subtotal),
    subtotal,
    delivery: DELIVERY_FEE,
    total: order.total,
    payment: {
      method: PAYMENT_METHOD_LABEL[order.payment],
      amount: order.total,
    },
    timeline: [
      {
        id: "placed",
        label: "Order placed",
        actor: "Customer",
        at: `${order.placedOn}, 10:41`,
      },
      {
        id: order.status,
        label: TIMELINE_LABEL_BY_STATUS[order.status],
        actor: "Rauf (admin)",
        at: `${order.placedOn}, 11:15`,
      },
    ],
  };
}

export function getOrderDetail(reference: string): OrderDetail | undefined {
  if (reference === DESIGNED_DETAIL.reference) {
    return DESIGNED_DETAIL;
  }

  const order = ORDERS.find((row) => row.reference === reference);

  return order ? buildDetail(order) : undefined;
}

export function listOrderReferences(): readonly string[] {
  return ORDERS.map((order) => order.reference);
}
