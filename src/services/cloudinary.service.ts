import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/lib/api/env";
import { ApiError } from "@/lib/api/types";

export type CloudinaryUploadResult = {
  secureUrl: string;
  publicId: string;
};

type CloudinaryUploadResponse = {
  secure_url?: string;
  public_id?: string;
  error?: { message?: string };
};

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png"]);

function assertCloudinaryConfig(): void {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new ApiError(
      500,
      "Cloudinary is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.",
    );
  }
}

function assertImageFile(file: File): void {
  if (!ACCEPTED_TYPES.has(file.type)) {
    throw new ApiError(400, "Only PNG and JPG images are allowed.");
  }
  if (file.size > MAX_BYTES) {
    throw new ApiError(400, "Each image must be 5MB or smaller.");
  }
}

/** Unsigned upload to Cloudinary; returns the HTTPS URL for the backend. */
export async function uploadImageToCloudinary(
  file: File,
): Promise<CloudinaryUploadResult> {
  assertCloudinaryConfig();
  assertImageFile(file);

  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  body.append("folder", "chenab/products");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body },
  );

  const payload = (await response.json()) as CloudinaryUploadResponse;

  if (!response.ok || !payload.secure_url || !payload.public_id) {
    throw new ApiError(
      response.status || 500,
      payload.error?.message ?? "Cloudinary upload failed.",
    );
  }

  return {
    secureUrl: payload.secure_url,
    publicId: payload.public_id,
  };
}

export async function uploadImagesToCloudinary(
  files: readonly File[],
): Promise<CloudinaryUploadResult[]> {
  return Promise.all(files.map((file) => uploadImageToCloudinary(file)));
}
