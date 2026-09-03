"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type {
  ListNotificationsResponse,
  NotificationItem,
} from "@/lib/api/notification-types";
import { notificationsQueryKey } from "@/hooks/use-notifications";
import { getAdminSocket } from "@/lib/realtime/socket";
import { listNotifications } from "@/services/notification.service";

const RECENT_LIMIT = 50;

function isNotificationItem(value: unknown): value is NotificationItem {
  if (!value || typeof value !== "object") return false;
  const item = value as NotificationItem;
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.message === "string"
  );
}

function prependNotification(
  previous: ListNotificationsResponse | undefined,
  incoming: NotificationItem,
): ListNotificationsResponse {
  if (!previous) {
    return {
      notifications: [incoming],
      unreadCount: incoming.read ? 0 : 1,
    };
  }

  if (previous.notifications.some((item) => item.id === incoming.id)) {
    return previous;
  }

  return {
    notifications: [incoming, ...previous.notifications].slice(0, RECENT_LIMIT),
    unreadCount: previous.unreadCount + (incoming.read ? 0 : 1),
  };
}

/** Keeps the notifications query live via Socket.IO `notification` events. */
export function useNotificationsRealtime(): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getAdminSocket();
    if (!socket) return;

    void queryClient.prefetchQuery({
      queryKey: notificationsQueryKey,
      queryFn: listNotifications,
    });

    function onNotification(payload: unknown) {
      if (!isNotificationItem(payload)) return;

      queryClient.setQueryData<ListNotificationsResponse>(
        notificationsQueryKey,
        (previous) => prependNotification(previous, payload),
      );
    }

    socket.on("notification", onNotification);

    return () => {
      socket.off("notification", onNotification);
    };
  }, [queryClient]);
}
