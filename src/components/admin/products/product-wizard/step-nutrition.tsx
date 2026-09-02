"use client";

import { Icon } from "@iconify/react";
import { useFormContext, useWatch } from "react-hook-form";
import type { ProductFormValues } from "@/components/admin/products/product-wizard/product-form-types";
import {
  CERTIFICATIONS,
  NUTRITION_ROWS,
} from "@/components/admin/products/product-wizard/product-form-types";
import { controlClass } from "@/components/ui/form-field";

/* Figma node 212:9499 — a selected chip carries a tick as well as the accent
   wash, so the state never rides on colour alone. */
const chipStateClass = {
  on: "border-brand-accent/30 bg-brand-accent/12 text-brand-accent",
  off: "border-line-subtle bg-surface-sunken text-ink-muted hover:border-line-default",
} as const;

export function StepNutrition() {
  const { register, setValue, control } = useFormContext<ProductFormValues>();
  const certifications = useWatch({ control, name: "certifications" }) ?? [];

  function toggleCertification(name: string) {
    const selected = certifications.includes(name);
    const next = selected
      ? certifications.filter((entry) => entry !== name)
      : [...certifications, name];

    setValue("certifications", next, { shouldDirty: true });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h3 className="text-caption font-medium text-ink-muted">
          Nutrition (per 100 g, uncooked)
        </h3>
        <ul className="flex flex-col rounded border border-line-subtle bg-surface-base">
          {NUTRITION_ROWS.map((row) => (
            <li
              key={row.key}
              className="flex flex-col gap-2 border-b border-line-subtle px-4 py-2.5 last:border-b-0 sm:flex-row sm:items-center sm:gap-4"
            >
              <label
                htmlFor={`nutrition-${row.key}`}
                className="text-body-sm text-ink-primary sm:w-45"
              >
                {row.label}
              </label>
              <input
                id={`nutrition-${row.key}`}
                placeholder="e.g. 350 kcal"
                className={`${controlClass} sm:w-45`}
                {...register(`nutrition.${row.key}`)}
              />
            </li>
          ))}
        </ul>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-caption font-medium text-ink-muted">
          Certifications
        </legend>
        <div className="flex flex-wrap gap-2.5 pt-3">
          {CERTIFICATIONS.map((name) => {
            const selected = certifications.includes(name);

            return (
              <button
                key={name}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleCertification(name)}
                className={`flex cursor-pointer items-center gap-1.5 rounded border px-3.5 py-1.5 text-caption font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent ${chipStateClass[selected ? "on" : "off"]}`}
              >
                {selected ? (
                  <Icon
                    icon="mdi:check"
                    className="size-3 text-brand-accent"
                    aria-hidden
                  />
                ) : null}
                {name}
              </button>
            );
          })}
        </div>
        <p className="text-caption text-ink-muted">
          Click to toggle. Selected certifications appear on the product page.
        </p>
      </fieldset>
    </div>
  );
}
