"use client";

import Image from "next/image";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { EditorTabs } from "@/components/admin/products/product-wizard/editor-tabs";
import { StepContent } from "@/components/admin/products/product-wizard/step-content";
import { StepDetails } from "@/components/admin/products/product-wizard/step-details";
import { StepNutrition } from "@/components/admin/products/product-wizard/step-nutrition";
import { StepSkus } from "@/components/admin/products/product-wizard/step-skus";
import type {
  ProductFormValues,
  WizardStepId,
} from "@/components/admin/products/product-wizard/product-form-types";
import {
  createEmptyProductForm,
  WIZARD_STEPS,
} from "@/components/admin/products/product-wizard/product-form-types";
import { Notice } from "@/components/ui/notice";

export type ProductWizardProps = Readonly<{
  onClose: () => void;
}>;

const secondaryButtonClass =
  "cursor-pointer rounded border border-line-default bg-surface-base px-4 py-2 text-body-sm font-medium text-ink-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

const primaryButtonClass =
  "flex cursor-pointer items-center justify-center gap-2 rounded bg-brand-accent px-4 py-2 text-body font-medium text-ink-on-deep transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent motion-reduce:transition-none";

export function ProductWizard(props: Readonly<ProductWizardProps>) {
  const { onClose } = props;
  /* One form instance for all four steps, so moving between them — forwards
     via Next or backwards via the tabs — never discards what was typed. */
  const form = useForm<ProductFormValues>({
    defaultValues: createEmptyProductForm(),
  });
  const [step, setStep] = useState<WizardStepId>("details");
  const [submitted, setSubmitted] = useState(false);

  const stepIndex = WIZARD_STEPS.findIndex((entry) => entry.id === step);
  const isLastStep = stepIndex === WIZARD_STEPS.length - 1;

  function goToStep(next: WizardStepId) {
    setSubmitted(false);
    setStep(next);
  }

  /* Validation lives on the fields themselves; trigger() surfaces it and, if
     the offending field is on an earlier step, sends the user back to it. */
  async function handlePrimary() {
    const valid = await form.trigger();

    if (!valid) {
      setStep("details");
      return;
    }

    if (!isLastStep) {
      goToStep(WIZARD_STEPS[stepIndex + 1].id);
      return;
    }

    // No admin API yet — the draft is complete but nothing persists it.
    setSubmitted(true);
  }

  const values = form.getValues();

  return (
    <FormProvider {...form}>
      <form
        className="flex min-h-0 flex-1 flex-col"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <EditorTabs
            current={step}
            onSelect={goToStep}
            label="Product editor steps"
          />

          <div className="pt-6">
            {step === "details" ? <StepDetails /> : null}
            {step === "skus" ? <StepSkus layout="modal" /> : null}
            {step === "content" ? <StepContent /> : null}
            {step === "nutrition" ? <StepNutrition /> : null}
          </div>

          {submitted ? (
            <Notice className="mt-6">
              Draft complete — {values.name} with {values.skus.length} pack
              size(s). Nothing was saved: the admin API does not exist yet, so
              this screen has nowhere to send it.
            </Notice>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center justify-end gap-3 border-t border-line-subtle px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className={secondaryButtonClass}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePrimary}
            className={primaryButtonClass}
          >
            {isLastStep ? "Add product" : "Next"}
            {isLastStep ? null : (
              <Image
                src="/icons/admin/chevron-right-light.svg"
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
