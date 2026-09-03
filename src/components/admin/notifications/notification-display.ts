import type {
  NotificationItem,
  NotificationMetadata,
} from "@/lib/api/notification-types";

export type NotificationDisplay = {
  icon: string;
  href: string | null;
  actionLabel: string;
};

function asMetadata(value: unknown): NotificationMetadata {
  if (!value || typeof value !== "object") return {};
  return value as NotificationMetadata;
}

const DISPLAY_BY_TYPE: Record<string, Omit<NotificationDisplay, "href"> & {
  href: (metadata: NotificationMetadata) => string | null;
}> = {
  product_created: {
    icon: "mdi:package-variant-closed",
    actionLabel: "View product",
    href: (metadata) =>
      metadata.productId ? `/products/${metadata.productId}` : "/products",
  },
};

/** Maps a notification to icon, deep-link, and action copy from `type` + metadata. */
export function getNotificationDisplay(
  item: NotificationItem,
): NotificationDisplay {
  const metadata = asMetadata(item.metadata);
  const display = DISPLAY_BY_TYPE[item.type];

  if (display) {
    return {
      icon: display.icon,
      actionLabel: display.actionLabel,
      href: display.href(metadata),
    };
  }

  return {
    icon: "mdi:bell-outline",
    href: null,
    actionLabel: "Open",
  };
}

export function formatNotificationTime(
  iso: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      ...options,
    });
  } catch {
    return iso;
  }
}
