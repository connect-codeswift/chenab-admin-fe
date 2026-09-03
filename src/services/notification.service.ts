import { apiRequest } from "@/lib/api/client";
import type {
  ListNotificationsResponse,
  MarkAllNotificationsReadResponse,
  MarkNotificationReadResponse,
} from "@/lib/api/notification-types";

export function listNotifications(): Promise<ListNotificationsResponse> {
  return apiRequest<ListNotificationsResponse>("/api/v1/notifications", {
    method: "GET",
  });
}

export function markNotificationRead(
  id: string,
): Promise<MarkNotificationReadResponse> {
  return apiRequest<MarkNotificationReadResponse>(
    `/api/v1/notifications/${id}/read`,
    { method: "PATCH" },
  );
}

export function markAllNotificationsRead(): Promise<MarkAllNotificationsReadResponse> {
  return apiRequest<MarkAllNotificationsReadResponse>(
    "/api/v1/notifications/read-all",
    { method: "PATCH" },
  );
}
