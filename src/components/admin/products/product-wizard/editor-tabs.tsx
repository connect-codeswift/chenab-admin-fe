"use client";

import { WIZARD_STEPS } from "@/components/admin/products/product-wizard/product-form-types";
import type { WizardStepId } from "@/components/admin/products/product-wizard/product-form-types";

export type EditorTabsProps = Readonly<{
  current: WizardStepId;
  onSelect: (step: WizardStepId) => void;
  label: string;
}>;

const tabStateClass = {
  active: "border-brand-accent font-medium text-brand-accent",
  idle: "border-transparent font-normal text-ink-muted hover:text-ink-primary",
} as const;

/* Shared by the add-product wizard and the product detail editor — both draw
   the same four-tab bar (Figma 212:9597). */
export function EditorTabs(props: Readonly<EditorTabsProps>) {
  const { current, onSelect, label } = props;

  return (
    <div
      role="tablist"
      aria-label={label}
      className="scrollbar-none flex gap-0.5 overflow-x-auto border-b border-line-subtle"
    >
      {WIZARD_STEPS.map((entry) => {
        const state = entry.id === current ? "active" : "idle";

        return (
          <button
            key={entry.id}
            type="button"
            role="tab"
            aria-selected={entry.id === current}
            onClick={() => onSelect(entry.id)}
            className={`shrink-0 cursor-pointer border-b-2 px-3 py-2 text-body-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent sm:px-4 ${tabStateClass[state]}`}
          >
            {entry.label}
          </button>
        );
      })}
    </div>
  );
}
