export type ApiOrderStatus =
  | "new"
  | "confirmed"
  | "packed"
  | "dispatched"
  | "delivered";

export type ApiOrderItem = {
  id: string;
  productId: string;
  productName: string;
  skuSize: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type ApiOrderAddress = {
  line1: string;
  line2?: string;
  city: string;
  province?: string;
  postalCode?: string;
};

export type ApiOrderCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type ApiOrderPayment = {
  method: string;
  confirmedAt?: string;
  amount: number;
};

export type ApiOrderTimelineEntry = {
  id: string;
  label: string;
  actor: string;
  at: string;
};

export type ApiOrder = {
  id: string;
  reference: string;
  status: ApiOrderStatus;
  placedAt: string;
  customer: ApiOrderCustomer;
  shippingAddress: ApiOrderAddress;
  items: ApiOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  payment: ApiOrderPayment;
  timeline: ApiOrderTimelineEntry[];
};

export type ApiOrderRow = {
  id: string;
  reference: string;
  status: ApiOrderStatus;
  placedAt: string;
  customerName: string;
  city: string;
  itemCount: number;
  total: number;
  paymentMethod: string;
};

export type ApiPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ListOrdersResponse = {
  orders: ApiOrderRow[];
  pagination: ApiPagination;
};

export type GetOrderResponse = {
  order: ApiOrder;
};
