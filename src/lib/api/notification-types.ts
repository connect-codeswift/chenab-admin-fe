/** Known types today. New kinds (orders, inquiries, …) can be added without
 *  changing the list/read APIs — `type` stays a string on the wire. */
export type NotificationType = "product_created" | (string & {});

export type NotificationMetadata = {
  productId?: string;
  productName?: string;
  orderId?: string;
  reference?: string;
  inquiryId?: string;
  [key: string]: unknown;
};

export type NotificationItem = {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  metadata: unknown;
  createdAt: string;
};

export type ListNotificationsResponse = {
  notifications: NotificationItem[];
  unreadCount: number;
};

export type MarkNotificationReadResponse = {
  notification: NotificationItem;
};

export type MarkAllNotificationsReadResponse = {
  updated: number;
};
