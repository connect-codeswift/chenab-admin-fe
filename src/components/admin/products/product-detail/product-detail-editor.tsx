"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
import { Notice } from "@/components/ui/notice";

export type ProductDetailEditorProps = Readonly<{
  detail: ProductDetail;
}>;

export function ProductDetailEditor(props: Readonly<ProductDetailEditorProps>) {
  const { detail } = props;
  /* One form across all four tabs, so switching tabs never drops an edit. */
  const form = useForm<ProductFormValues>({ defaultValues: detail.values });
  const [tab, setTab] = useState<WizardStepId>("details");
  const [notice, setNotice] = useState<string>();

  async function handleSave() {
    const valid = await form.trigger();

    if (!valid) {
      setTab("details");
      return;
    }

    // No admin API yet — nothing persists these edits.
    setNotice(
      `Changes to ${form.getValues().name} are valid but were not saved: the admin API does not exist yet.`,
    );
  }

  function handleDelete() {
    setNotice(
      "Delete is not wired: it needs the admin API and a confirmation step.",
    );
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
          onSave={handleSave}
          onDelete={handleDelete}
        />

        <div className="rounded border border-line-subtle/70 bg-surface-base p-4 shadow-xs sm:p-6 lg:p-7">
          <EditorTabs
            current={tab}
            onSelect={setTab}
            label="Product editor tabs"
          />

          <div className="bg-white pt-6 shadow-xs">
            {tab === "details" ? <StepDetails images={detail.images} /> : null}
            {tab === "skus" ? <StepSkus stockLabel="Stock (units)" /> : null}
            {tab === "content" ? <DetailContentTab /> : null}
            {tab === "nutrition" ? <StepNutrition /> : null}
          </div>

          {notice ? <Notice className="mt-6">{notice}</Notice> : null}
        </div>
      </form>
    </FormProvider>
  );
}
