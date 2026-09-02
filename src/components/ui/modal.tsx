"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef, type ReactNode } from "react";

export type ModalProps = Readonly<{
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Width cap for the panel, e.g. "max-w-170". */
  widthClass?: string;
}>;

/* A plain conditional overlay rather than <dialog>.showModal(): when `open` is
   false nothing is rendered at all, so there is no closed-but-present element
   that can fail to open. Esc, click-outside and focus move are wired by hand
   because dropping <dialog> also drops what the platform gave us. */
export function Modal(props: Readonly<ModalProps>) {
  const { open, onClose, title, children, widthClass = "max-w-170" } = props;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-muted/80 p-4"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={`flex max-h-full w-full flex-col overflow-hidden rounded border border-line-subtle bg-surface-base shadow-lg outline-none ${widthClass}`}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line-subtle px-6 py-5">
          <h2
            id="modal-title"
            className="text-body font-medium text-ink-primary"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="cursor-pointer rounded text-ink-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            <Icon icon="mdi:close" className="size-4.5" aria-hidden />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
