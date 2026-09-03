"use client";

import { disconnectAdminSocket } from "@/lib/realtime/socket";
import { clearAuthSession } from "@/lib/auth/session";

/** Clears auth cookie + stored user, then sends the browser to sign-in. */
export function logout(): void {
  disconnectAdminSocket();
  clearAuthSession();
  window.location.assign("/sign-in");
}
