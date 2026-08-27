"use client";

import { useFormContext } from "react-hook-form";
import { ProductImagesField } from "@/components/admin/products/product-wizard/product-images-field";
import type { ProductFormValues } from "@/components/admin/products/product-wizard/product-form-types";
import { PRODUCT_CATEGORIES } from "@/components/admin/products/product-wizard/product-form-types";
import { controlClass, FormField } from "@/components/ui/form-field";

const VISIBILITY_OPTIONS = ["visible", "hidden"] as const;

export type StepDetailsProps = Readonly<{
  /* Existing shots; the detail screen shows a gallery where adding shows the
     upload zone. */
  images?: readonly string[];
}>;

export function StepDetails(props: Readonly<StepDetailsProps>) {
  const { images } = props;
  const { register, formState } = useFormContext<ProductFormValues>();
  const nameError = formState.errors.name?.message;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4.5 sm:grid-cols-2">
        <FormField
          label="Product name"
          htmlFor="product-name"
          required
          error={nameError}
        >
          <input
            id="product-name"
            placeholder="e.g. Premium Super Basmati"
            aria-invalid={Boolean(nameError)}
            className={controlClass}
            {...register("name", {
              required: "Enter a product name before continuing.",
            })}
          />
        </FormField>

        <FormField label="Category" htmlFor="product-category">
          <select
            id="product-category"
            className={controlClass}
            {...register("category")}
          >
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Tagline" htmlFor="product-tagline">
        <input
          id="product-tagline"
          placeholder="Short, punchy one-liner shown on product card"
          className={controlClass}
          {...register("tagline")}
        />
      </FormField>

      <FormField label="Hero line" htmlFor="product-hero-line">
        <input
          id="product-hero-line"
          placeholder="3 short phrases shown below the product name"
          className={controlClass}
          {...register("heroLine")}
        />
      </FormField>

      <FormField label="Long description" htmlFor="product-description">
        <textarea
          id="product-description"
          rows={5}
          placeholder="Detailed editorial copy shown on product page"
          className={`${controlClass} min-h-33`}
          {...register("longDescription")}
        />
      </FormField>

      <ProductImagesField images={images} />

      <fieldset className="flex flex-col gap-2">
        <legend className="text-caption font-medium text-ink-muted">
          Visibility
        </legend>
        <div className="flex items-center gap-3 pt-2">
          {VISIBILITY_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                value={option}
                className="control-radio"
                {...register("visibility")}
              />
              <span className="text-body-sm text-ink-primary capitalize">
                {option}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
