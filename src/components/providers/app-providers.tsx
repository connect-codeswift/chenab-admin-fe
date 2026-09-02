"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { Toaster } from "sonner";

export type AppProvidersProps = Readonly<{
  children: ReactNode;
}>;

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
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast:
              "rounded border border-line-subtle bg-surface-raised text-body-sm text-ink-primary shadow-md",
            title: "text-body-sm font-medium text-ink-primary",
            description: "text-caption text-ink-muted",
            success: "border-state-positive/30",
            error: "border-state-critical/30",
          },
        }}
      />
    </QueryClientProvider>
  );
}
