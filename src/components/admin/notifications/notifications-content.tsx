"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/header";
import { useMarkAllNotificationsRead } from "@/hooks/use-mark-all-notifications-read";
import { useMarkNotificationRead } from "@/hooks/use-mark-notification-read";
import {
  formatNotificationTime,
  getNotificationDisplay,
} from "@/components/admin/notifications/notification-display";
import { useNotifications } from "@/hooks/use-notifications";

export function NotificationsContent() {
  const { data, isLoading, isError, error, refetch } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const notifications = data?.notifications ?? [];
  const unreadCount = data?.unreadCount ?? 0;

  return (
    <>
      <AdminHeader
        title="Notifications"
        subtitle={
          isLoading && !data
            ? "Loading…"
            : `${unreadCount} unread`
        }
      />

      <div className="scrollbar-none flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
        <section
          aria-label="Notifications"
          className="flex w-full flex-col overflow-clip rounded border border-line-subtle bg-surface-base/70 shadow-xs"
        >
          <div className="flex items-center justify-between gap-4 border-b border-surface-container px-6 py-4">
            <p className="text-body-sm text-ink-muted">
              New activity from products, orders and more appears here.
            </p>
            <button
              type="button"
              disabled={unreadCount === 0 || markAllRead.isPending}
              onClick={() => markAllRead.mutate()}
              className="cursor-pointer rounded text-body-sm font-medium text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              {markAllRead.isPending ? "Marking…" : "Mark all read"}
            </button>
          </div>

          {isLoading && !data ? (
            <p className="px-6 py-8 text-body-sm text-ink-muted">
              Loading notifications…
            </p>
          ) : null}

          {isError ? (
            <div className="flex flex-col items-start gap-3 px-6 py-8">
              <p role="alert" className="text-body-sm text-state-critical">
                {error?.message ?? "Unable to load notifications."}
              </p>
              <button
                type="button"
                onClick={() => void refetch()}
                className="cursor-pointer rounded border border-line-default px-3 py-1.5 text-caption text-ink-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
              >
                Try again
              </button>
            </div>
          ) : null}

          {!isLoading && !isError && notifications.length === 0 ? (
            <p className="px-6 py-8 text-body-sm text-ink-muted">
              No notifications yet.
            </p>
          ) : null}

          {!isError && notifications.length > 0 ? (
            <ul>
              {notifications.map((item, index) => {
                const display = getNotificationDisplay(item);
                const isLast = index === notifications.length - 1;
                const isMarking =
                  markRead.isPending && markRead.variables === item.id;

                return (
                  <li
                    key={item.id}
                    className={`flex items-start gap-4 px-6 py-4 ${isLast ? "" : "border-b border-line-default"} ${item.read ? "" : "bg-brand-accent/6"}`}
                  >
                    <span
                      className={`mt-1 flex size-9 shrink-0 items-center justify-center rounded ${item.read ? "bg-surface-sunken text-ink-muted" : "bg-brand-accent/12 text-brand-accent"}`}
                    >
                      <Icon icon={display.icon} className="size-5" aria-hidden />
                    </span>

                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-body-sm font-medium text-ink-primary">
                          {item.title}
                        </span>
                        <time
                          dateTime={item.createdAt}
                          className="text-caption text-ink-muted"
                        >
                          {formatNotificationTime(item.createdAt, {
                            year: "numeric",
                          })}
                        </time>
                      </span>
                      <span className="text-body-sm text-ink-muted">
                        {item.message}
                      </span>
                      <span className="flex items-center gap-3 pt-1">
                        {display.href ? (
                          <Link
                            href={display.href}
                            onClick={() => {
                              if (!item.read) markRead.mutate(item.id);
                            }}
                            className="rounded text-caption font-medium text-brand-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                          >
                            {display.actionLabel}
                          </Link>
                        ) : null}
                        {!item.read ? (
                          <button
                            type="button"
                            disabled={isMarking}
                            onClick={() => markRead.mutate(item.id)}
                            className="cursor-pointer rounded text-caption text-ink-muted hover:text-ink-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            {isMarking ? "Marking…" : "Mark read"}
                          </button>
                        ) : null}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </section>
      </div>
    </>
  );
}
