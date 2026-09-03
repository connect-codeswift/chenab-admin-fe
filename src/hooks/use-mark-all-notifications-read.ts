"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  ListNotificationsResponse,
  MarkAllNotificationsReadResponse,
} from "@/lib/api/notification-types";
import { ApiError } from "@/lib/api/types";
import { notificationsQueryKey } from "@/hooks/use-notifications";
import { markAllNotificationsRead } from "@/services/notification.service";

export function useMarkAllNotificationsRead(): UseMutationResult<
  MarkAllNotificationsReadResponse,
  ApiError,
  void
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["notifications", "read-all"],
    mutationFn: markAllNotificationsRead,
    onSuccess: (data) => {
      queryClient.setQueryData<ListNotificationsResponse>(
        notificationsQueryKey,
        (previous) => {
          if (!previous) return previous;
          return {
            notifications: previous.notifications.map((item) => ({
              ...item,
              read: true,
            })),
            unreadCount: 0,
          };
        },
      );
      toast.success(
        data.updated === 1
          ? "1 notification marked as read"
          : `${data.updated} notifications marked as read`,
      );
    },
    onError: (error) => {
      toast.error(error.message ?? "Could not mark notifications as read.");
    },
  });
}
