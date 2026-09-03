"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { ListNotificationsResponse } from "@/lib/api/notification-types";
import { ApiError } from "@/lib/api/types";
import { listNotifications } from "@/services/notification.service";

export const notificationsQueryKey = ["notifications"] as const;

export function useNotifications(): UseQueryResult<
  ListNotificationsResponse,
  ApiError
> {
  return useQuery({
    queryKey: notificationsQueryKey,
    queryFn: listNotifications,
  });
}
