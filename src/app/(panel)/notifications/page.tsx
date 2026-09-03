import type { Metadata } from "next";
import { NotificationsContent } from "@/components/admin/notifications/notifications-content";

export const metadata: Metadata = {
  title: "Notifications | Chenab Valley Rice Admin",
  description: "Admin activity as it happens.",
  robots: { index: false, follow: false },
};

export default function AdminNotificationsPage() {
  return <NotificationsContent />;
}
