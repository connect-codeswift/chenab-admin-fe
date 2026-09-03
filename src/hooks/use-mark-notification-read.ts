"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  ListNotificationsResponse,
  MarkNotificationReadResponse,
} from "@/lib/api/notification-types";
import { ApiError } from "@/lib/api/types";
import { notificationsQueryKey } from "@/hooks/use-notifications";
import { markNotificationRead } from "@/services/notification.service";

export function useMarkNotificationRead(): UseMutationResult<
  MarkNotificationReadResponse,
  ApiError,
  string
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["notifications", "read"],
    mutationFn: markNotificationRead,
    onSuccess: (data) => {
      queryClient.setQueryData<ListNotificationsResponse>(
        notificationsQueryKey,
        (previous) => {
          if (!previous) return previous;
          const wasUnread = previous.notifications.some(
            (item) => item.id === data.notification.id && !item.read,
          );
          return {
            notifications: previous.notifications.map((item) =>
              item.id === data.notification.id ? data.notification : item,
            ),
            unreadCount: wasUnread
              ? Math.max(0, previous.unreadCount - 1)
              : previous.unreadCount,
          };
        },
      );
    },
    onError: (error) => {
      toast.error(error.message ?? "Could not mark notification as read.");
    },
  });
}
