"use client";

import Image from "next/image";
import type { ChangeEvent } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type { ProductFormValues } from "@/components/admin/products/product-wizard/product-form-types";

export type ProductImagesFieldProps = Readonly<{
  /* Existing shots. Present on the detail screen (Figma node 212:9644), absent
     while adding, where the upload zone takes their place. */
  images?: readonly string[];
}>;

export function ProductImagesField(props: Readonly<ProductImagesFieldProps>) {
  const { images } = props;
  const { setValue, control } = useFormContext<ProductFormValues>();
  const imageNames = useWatch({ control, name: "imageNames" }) ?? [];

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const names = Array.from(event.target.files ?? []).map((file) => file.name);
    setValue("imageNames", names, { shouldDirty: true });
  }

  if (images && images.length > 0) {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-caption font-medium text-ink-muted">
          Product Images
        </span>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((source) => (
            <li
              key={source}
              className="relative h-30 overflow-clip rounded-lg bg-brand-accent/10"
            >
              <Image
                src={source}
                alt=""
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover object-center"
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-caption font-medium text-ink-muted">
        Product Images
      </span>
      <label
        htmlFor="product-images"
        className="flex h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded border border-dashed border-ink-muted bg-surface-subtle p-6 text-center focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-accent"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-brand-accent/10">
          <Image
            src="/icons/admin/upload.svg"
            alt=""
            width={24}
            height={24}
            className="size-6"
          />
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-body-sm font-medium text-ink-primary">
            Click to upload or drag and drop
          </span>
          <span className="text-caption text-ink-subtle">
            PNG, JPG up to 5MB
          </span>
        </span>
        <input
          id="product-images"
          type="file"
          accept="image/png,image/jpeg"
          multiple
          onChange={handleFiles}
          className="sr-only"
        />
      </label>
      {imageNames.length > 0 ? (
        <ul className="flex flex-col gap-1">
          {imageNames.map((name) => (
            <li key={name} className="text-caption text-ink-muted">
              {name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
