"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState, type ChangeEvent } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type { ProductFormValues } from "@/components/admin/products/product-wizard/product-form-types";
import { ApiError } from "@/lib/api/types";
import { uploadImagesToCloudinary } from "@/services/cloudinary.service";

export type ProductImagesFieldProps = Readonly<{
  /* Existing shots. Present on the detail screen (Figma node 212:9644), absent
     while adding, where the upload zone takes their place. */
  images?: readonly string[];
}>;

function resolveUploadError(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Unable to upload images. Please try again.";
}

export function ProductImagesField(props: Readonly<ProductImagesFieldProps>) {
  const { images: existingImages } = props;
  const { setValue, control } = useFormContext<ProductFormValues>();
  const uploadedImages = useWatch({ control, name: "images" }) ?? [];
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length === 0) return;

    setUploadError(null);
    setUploading(true);

    try {
      const results = await uploadImagesToCloudinary(files);
      const urls = results.map((result) => result.secureUrl);
      setValue("images", [...uploadedImages, ...urls], {
        shouldDirty: true,
        shouldValidate: true,
      });
    } catch (error) {
      setUploadError(resolveUploadError(error));
    } finally {
      setUploading(false);
    }
  }

  function removeImage(url: string) {
    setValue(
      "images",
      uploadedImages.filter((image) => image !== url),
      { shouldDirty: true },
    );
  }

  if (existingImages && existingImages.length > 0) {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-caption font-medium text-ink-muted">
          Product Images
        </span>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {existingImages.map((source) => (
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
        className={`flex h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded border border-dashed border-ink-muted bg-surface-subtle p-6 text-center focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-accent ${uploading ? "pointer-events-none opacity-60" : ""}`}
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
          <Icon icon="mdi:cloud-upload-outline" className="size-6" aria-hidden />
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-body-sm font-medium text-ink-primary">
            {uploading
              ? "Uploading to Cloudinary…"
              : "Click to upload or drag and drop"}
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
          disabled={uploading}
          onChange={handleFiles}
          className="sr-only"
        />
      </label>

      {uploadError ? (
        <p role="alert" className="text-caption text-state-critical">
          {uploadError}
        </p>
      ) : null}

      {uploadedImages.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {uploadedImages.map((source) => (
            <li
              key={source}
              className="group relative h-30 overflow-clip rounded-lg bg-brand-accent/10"
            >
              <Image
                src={source}
                alt=""
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover object-center"
              />
              <button
                type="button"
                onClick={() => removeImage(source)}
                className="absolute top-2 right-2 cursor-pointer rounded bg-surface-base/90 px-2 py-1 text-caption text-ink-primary opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
