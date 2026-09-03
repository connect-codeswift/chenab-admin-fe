"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useMarkAllNotificationsRead } from "@/hooks/use-mark-all-notifications-read";
import { useMarkNotificationRead } from "@/hooks/use-mark-notification-read";
import {
  formatNotificationTime,
  getNotificationDisplay,
} from "@/components/admin/notifications/notification-display";
import { useNotifications } from "@/hooks/use-notifications";

const PREVIEW_LIMIT = 5;

export function NotificationBell() {
  const { data, isLoading } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const notifications = (data?.notifications ?? []).slice(0, PREVIEW_LIMIT);
  const unreadCount = data?.unreadCount ?? 0;
  const badgeLabel = unreadCount > 99 ? "99+" : String(unreadCount);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={
          unreadCount > 0
            ? `Notifications, ${unreadCount} unread`
            : "Notifications"
        }
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className="relative flex size-10 cursor-pointer items-center justify-center rounded text-ink-primary hover:bg-surface-sunken focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
      >
        <Icon icon="mdi:bell-outline" className="size-6" aria-hidden />
        {unreadCount > 0 ? (
          <span className="absolute top-1 right-1 inline-flex min-w-4 items-center justify-center rounded-full bg-brand-accent px-1 text-[10px] leading-4 font-medium text-surface-base">
            {badgeLabel}
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="Recent notifications"
          className="absolute top-full right-0 z-30 mt-2 w-80 overflow-clip rounded border border-line-subtle bg-surface-raised shadow-md sm:w-96"
        >
          <div className="flex items-center justify-between gap-3 border-b border-surface-container px-4 py-3">
            <p className="text-body-sm font-medium text-ink-primary">
              Notifications
            </p>
            <button
              type="button"
              disabled={unreadCount === 0 || markAllRead.isPending}
              onClick={() => markAllRead.mutate()}
              className="cursor-pointer rounded text-caption font-medium text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              {markAllRead.isPending ? "Marking…" : "Mark all read"}
            </button>
          </div>

          {isLoading && !data ? (
            <p className="px-4 py-6 text-body-sm text-ink-muted">Loading…</p>
          ) : null}

          {!isLoading && notifications.length === 0 ? (
            <p className="px-4 py-6 text-body-sm text-ink-muted">
              No notifications yet.
            </p>
          ) : null}

          {notifications.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto">
              {notifications.map((item) => {
                const display = getNotificationDisplay(item);

                return (
                  <li key={item.id}>
                    <Link
                      href={display.href ?? "/notifications"}
                      onClick={() => {
                        if (!item.read) markRead.mutate(item.id);
                        setOpen(false);
                      }}
                      className={`flex flex-col gap-1 px-4 py-3 hover:bg-surface-sunken focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-accent ${item.read ? "" : "bg-brand-accent/6"}`}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="text-body-sm font-medium text-ink-primary">
                          {item.title}
                        </span>
                        <time
                          dateTime={item.createdAt}
                          className="shrink-0 text-caption text-ink-muted"
                        >
                          {formatNotificationTime(item.createdAt)}
                        </time>
                      </span>
                      <span className="line-clamp-2 text-caption text-ink-muted">
                        {item.message}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : null}

          <div className="border-t border-surface-container px-4 py-3">
            <Link
              href="/notifications"
              onClick={() => setOpen(false)}
              className="rounded text-body-sm font-medium text-brand-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            >
              View all notifications
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
