"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { Toaster } from "sonner";
import { useNotificationsRealtime } from "@/hooks/use-notifications-realtime";

export type AppProvidersProps = Readonly<{
  children: ReactNode;
}>;

function RealtimeBridge() {
  useNotificationsRealtime();
  return null;
}

export function AppProviders(props: Readonly<AppProvidersProps>) {
  const { children } = props;
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RealtimeBridge />
      {children}
      <Toaster
        className="font-sans"
        position="top-right"
        closeButton
        offset={20}
        gap={10}
        toastOptions={{
          duration: 4000,
        }}
      />
    </QueryClientProvider>
  );
}
