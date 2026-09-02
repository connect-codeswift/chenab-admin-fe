"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { DetailContentTab } from "@/components/admin/products/product-detail/detail-content-tab";
import { ProductDetailHeader } from "@/components/admin/products/product-detail/product-detail-header";
import type { ProductDetail } from "@/components/admin/products/product-detail/product-detail-data";
import { EditorTabs } from "@/components/admin/products/product-wizard/editor-tabs";
import { StepDetails } from "@/components/admin/products/product-wizard/step-details";
import { StepNutrition } from "@/components/admin/products/product-wizard/step-nutrition";
import { StepSkus } from "@/components/admin/products/product-wizard/step-skus";
import type {
  ProductFormValues,
  WizardStepId,
} from "@/components/admin/products/product-wizard/product-form-types";
import { Modal } from "@/components/ui/modal";
import { useDeleteProduct } from "@/hooks/use-delete-product";
import { useUpdateProduct } from "@/hooks/use-update-product";
import { ApiError } from "@/lib/api/types";
import { toProductDetail } from "@/components/admin/products/product-detail/product-detail-data";

export type ProductDetailEditorProps = Readonly<{
  detail: ProductDetail;
}>;

const secondaryButtonClass =
  "cursor-pointer rounded border border-line-default bg-surface-base px-4 py-2 text-body-sm font-medium text-ink-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent disabled:cursor-not-allowed disabled:opacity-60";

const dangerButtonClass =
  "cursor-pointer rounded bg-state-critical px-4 py-2 text-body-sm font-medium text-surface-base transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent disabled:cursor-not-allowed disabled:opacity-60";

function resolveMutationError(error: unknown, fallback: string): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return fallback;
}

export function ProductDetailEditor(props: Readonly<ProductDetailEditorProps>) {
  const { detail: initialDetail } = props;
  const router = useRouter();
  const [detail, setDetail] = useState(initialDetail);
  const form = useForm<ProductFormValues>({ defaultValues: initialDetail.values });
  const [tab, setTab] = useState<WizardStepId>("details");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const updateProductMutation = useUpdateProduct({
    onSuccess: (data) => {
      const next = toProductDetail(data.product);
      setDetail(next);
      form.reset(next.values);
      toast.success("Product updated", {
        description: `${data.product.name} was saved successfully.`,
      });
    },
  });

  const deleteProductMutation = useDeleteProduct({
    onSuccess: () => {
      toast.success("Product deleted", {
        description: `${detail.row.name} was removed.`,
      });
      setConfirmOpen(false);
      router.replace("/products");
    },
  });

  const isSaving = updateProductMutation.isPending;
  const isDeleting = deleteProductMutation.isPending;
  const saveError = updateProductMutation.error
    ? resolveMutationError(
        updateProductMutation.error,
        "Unable to save product. Please try again.",
      )
    : null;
  const deleteError = deleteProductMutation.error
    ? resolveMutationError(
        deleteProductMutation.error,
        "Unable to delete product. Please try again.",
      )
    : null;

  async function handleSave() {
    const valid = await form.trigger();

    if (!valid) {
      setTab("details");
      return;
    }

    updateProductMutation.reset();
    await updateProductMutation.mutateAsync({
      id: detail.row.id,
      values: form.getValues(),
    });
  }

  async function confirmDelete() {
    deleteProductMutation.reset();
    await deleteProductMutation.mutateAsync(detail.row.id);
  }

  return (
    <FormProvider {...form}>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <ProductDetailHeader
          product={detail.row}
          priceRange={detail.priceRange}
          onSave={() => void handleSave()}
          onDelete={() => {
            deleteProductMutation.reset();
            setConfirmOpen(true);
          }}
          isSaving={isSaving}
          isDeleting={isDeleting}
        />

        <div className="rounded border border-line-subtle/70 bg-surface-base p-4 shadow-xs sm:p-6 lg:p-7">
          <EditorTabs
            current={tab}
            onSelect={setTab}
            label="Product editor tabs"
          />

          <div className="bg-white pt-6 shadow-xs">
            {/* Editable images from form state (includes API + newly uploaded). */}
            {tab === "details" ? <StepDetails /> : null}
            {tab === "skus" ? <StepSkus stockLabel="Stock (units)" /> : null}
            {tab === "content" ? <DetailContentTab /> : null}
            {tab === "nutrition" ? <StepNutrition /> : null}
          </div>

          {saveError ? (
            <p role="alert" className="mt-6 text-caption text-state-critical">
              {saveError}
            </p>
          ) : null}
        </div>
      </form>

      <Modal
        open={confirmOpen}
        onClose={() => {
          if (!isDeleting) setConfirmOpen(false);
        }}
        title="Delete product"
        widthClass="max-w-md"
      >
        <div className="flex flex-col gap-6 p-6">
          <p className="text-body-sm text-ink-muted">
            Delete{" "}
            <span className="font-medium text-ink-primary">{detail.row.name}</span>
            ? This cannot be undone.
          </p>

          {deleteError ? (
            <p role="alert" className="text-caption text-state-critical">
              {deleteError}
            </p>
          ) : null}

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => setConfirmOpen(false)}
              className={secondaryButtonClass}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => void confirmDelete()}
              className={dangerButtonClass}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </FormProvider>
  );
}
