"use client";

import { Icon } from "@iconify/react";
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
import { useCreateProduct } from "@/hooks/use-create-product";
import { ApiError } from "@/lib/api/types";
import { toast } from "sonner";

export type ProductWizardProps = Readonly<{
  onClose: () => void;
  onCreated?: () => void;
}>;

const secondaryButtonClass =
  "cursor-pointer rounded border border-line-default bg-surface-base px-4 py-2 text-body-sm font-medium text-ink-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent disabled:cursor-not-allowed disabled:opacity-60";

const primaryButtonClass =
  "flex cursor-pointer items-center justify-center gap-2 rounded bg-brand-accent px-4 py-2 text-body font-medium text-ink-on-deep transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60";

function resolveCreateError(error: unknown): string {
  if (error instanceof ApiError) {
    if (Array.isArray(error.details)) {
      return error.message;
    }
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return "Unable to create product. Please try again.";
}

export function ProductWizard(props: Readonly<ProductWizardProps>) {
  const { onClose, onCreated } = props;
  const form = useForm<ProductFormValues>({
    defaultValues: createEmptyProductForm(),
  });
  const [step, setStep] = useState<WizardStepId>("details");
  const createProductMutation = useCreateProduct({
    onSuccess: (data) => {
      toast.success("Product added", {
        description: `${data.product.name} was created successfully.`,
      });
      onCreated?.();
      onClose();
    },
  });

  const stepIndex = WIZARD_STEPS.findIndex((entry) => entry.id === step);
  const isLastStep = stepIndex === WIZARD_STEPS.length - 1;
  const isPending = createProductMutation.isPending;
  const createError = createProductMutation.error
    ? resolveCreateError(createProductMutation.error)
    : null;

  function goToStep(next: WizardStepId) {
    createProductMutation.reset();
    setStep(next);
  }

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

    createProductMutation.reset();
    await createProductMutation.mutateAsync(form.getValues());
  }

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

          {createError ? (
            <p role="alert" className="mt-6 text-caption text-state-critical">
              {createError}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center justify-end gap-3 border-t border-line-subtle px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className={secondaryButtonClass}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePrimary}
            disabled={isPending}
            className={primaryButtonClass}
          >
            {isLastStep
              ? isPending
                ? "Saving…"
                : "Add product"
              : "Next"}
            {isLastStep ? null : (
              <Icon icon="mdi:chevron-right" className="size-6" aria-hidden />
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
