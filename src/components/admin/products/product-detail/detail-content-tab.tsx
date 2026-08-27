"use client";

import { useFormContext } from "react-hook-form";
import type { ProductFormValues } from "@/components/admin/products/product-wizard/product-form-types";
import { BENEFIT_COUNT } from "@/components/admin/products/product-wizard/product-form-types";
import { controlClass, FormField } from "@/components/ui/form-field";

const CONTENT_FIELDS = [
  {
    key: "bestUses",
    label: "Best uses",
    placeholder: "What dishes and cooking contexts this rice excels at",
    rows: 3,
  },
  {
    key: "cookingGuide",
    label: "Cooking guide",
    placeholder: "Step-by-step cooking instructions",
    rows: 4,
  },
  {
    key: "storage",
    label: "Storage instructions",
    placeholder: "How to store after purchase and after opening",
    rows: 3,
  },
] as const;

const BENEFIT_INDEXES = Array.from({ length: BENEFIT_COUNT }, (_, i) => i);

/* Figma node 212:9258 — the detail screen's Content tab leads with three key
   benefits, which the add-product flow does not collect. */
export function DetailContentTab() {
  const { register } = useFormContext<ProductFormValues>();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h3 className="text-caption font-medium text-ink-muted">
          Key benefits (shown on product page)
        </h3>
        <div className="flex flex-col gap-2.5">
          {BENEFIT_INDEXES.map((index) => (
            <div
              key={index}
              className="flex flex-col gap-2.5 rounded border border-line-subtle bg-surface-subtle p-4"
            >
              <h4 className="text-caption text-ink-muted">
                Benefit {index + 1}
              </h4>
              <input
                aria-label={`Benefit ${index + 1} title`}
                placeholder="Short title"
                className={controlClass}
                {...register(`benefits.${index}.title`)}
              />
              <textarea
                aria-label={`Benefit ${index + 1} supporting detail`}
                rows={2}
                placeholder="Supporting detail shown below the title"
                className={`${controlClass} min-h-16`}
                {...register(`benefits.${index}.detail`)}
              />
            </div>
          ))}
        </div>
      </div>

      {CONTENT_FIELDS.map((field) => (
        <FormField
          key={field.key}
          label={field.label}
          htmlFor={`product-${field.key}`}
        >
          <textarea
            id={`product-${field.key}`}
            rows={field.rows}
            placeholder={field.placeholder}
            className={controlClass}
            {...register(field.key)}
          />
        </FormField>
      ))}
    </div>
  );
}
