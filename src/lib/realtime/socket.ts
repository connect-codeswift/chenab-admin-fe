import { io, type Socket } from "socket.io-client";
import { API_BASE_URL } from "@/lib/api/env";
import { getAuthToken } from "@/lib/auth/session";

let socket: Socket | null = null;

/** Shared admin Socket.IO connection, authenticated with the session JWT. */
export function getAdminSocket(): Socket | null {
  if (typeof window === "undefined") return null;

  const token = getAuthToken();
  if (!token) return null;

  if (socket) return socket;

  socket = io(API_BASE_URL, {
    path: "/socket.io",
    auth: { token },
    withCredentials: true,
    transports: ["websocket", "polling"],
  });

  return socket;
}

export function disconnectAdminSocket(): void {
  socket?.disconnect();
  socket = null;
}
