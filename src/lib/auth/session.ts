import {
  AUTH_TOKEN_COOKIE,
  AUTH_TOKEN_MAX_AGE,
  AUTH_USER_KEY,
} from "@/lib/auth/constants";
import type { AuthUser } from "@/lib/api/types";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const prefix = `${name}=`;
  const entry = document.cookie
    .split("; ")
    .find((row) => row.startsWith(prefix));
  if (!entry) return null;
  const value = decodeURIComponent(entry.slice(prefix.length)).trim();
  return value || null;
}

function writeTokenCookie(token: string): void {
  document.cookie = [
    `${AUTH_TOKEN_COOKIE}=${encodeURIComponent(token)}`,
    "path=/",
    "SameSite=Lax",
    `Max-Age=${AUTH_TOKEN_MAX_AGE}`,
  ].join("; ");
}

function clearTokenCookie(): void {
  document.cookie = `${AUTH_TOKEN_COOKIE}=; path=/; Max-Age=0; SameSite=Lax`;
}

/** JWT from the auth cookie — source of truth for redirects. */
export function getAuthToken(): string | null {
  return readCookie(AUTH_TOKEN_COOKIE);
}

export function setAuthSession(token: string, user: AuthUser): void {
  writeTokenCookie(token);
  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function clearAuthSession(): void {
  clearTokenCookie();
  window.localStorage.removeItem(AUTH_USER_KEY);
  // Legacy keys from earlier builds
  window.localStorage.removeItem("chenab.admin.token");
  window.localStorage.removeItem("chenab.admin.user");
}
