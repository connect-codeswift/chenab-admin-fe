"use client";

import { useFormContext } from "react-hook-form";
import type { ProductFormValues } from "@/components/admin/products/product-wizard/product-form-types";
import { controlClass, FormField } from "@/components/ui/form-field";

const CONTENT_FIELDS = [
  {
    key: "bestUses",
    label: "Best uses",
    placeholder:
      "What dishes, occasions, and cooking contexts this rice excels at",
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
  {
    key: "aboutTheRice",
    label: "About the Rice",
    placeholder: "write about the story of the rice",
    rows: 3,
  },
] as const;

export function StepContent() {
  const { register } = useFormContext<ProductFormValues>();

  return (
    <div className="flex flex-col gap-5">
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
