"use client";

import { useForm } from "react-hook-form";
import {
  INQUIRY_STATUS_LABEL,
  INQUIRY_STATUSES,
} from "@/components/admin/inquiries/inquiries-data";
import type {
  InquiryRow,
  InquiryStatus,
} from "@/components/admin/inquiries/inquiries-types";
import { controlClass, FormField } from "@/components/ui/form-field";

export type InquiryDetailPanelProps = Readonly<{
  inquiry: InquiryRow;
  onSave: (values: InquiryDetailValues) => void;
}>;

export type InquiryDetailValues = {
  status: InquiryStatus;
  note: string;
};

/* Figma node 212:4710 — the row opens onto a status picker, a note and Save,
   in a 480px column inset from the table edge. */
export function InquiryDetailPanel(props: Readonly<InquiryDetailPanelProps>) {
  const { inquiry, onSave } = props;
  const { register, handleSubmit } = useForm<InquiryDetailValues>({
    defaultValues: { status: inquiry.status, note: inquiry.note },
  });

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      className="flex w-full max-w-120 flex-col gap-3 px-6 py-4"
    >
      <FormField label="Status" htmlFor={`inquiry-status-${inquiry.id}`}>
        <select
          id={`inquiry-status-${inquiry.id}`}
          className={`${controlClass} w-50`}
          {...register("status")}
        >
          {INQUIRY_STATUSES.map((status) => (
            <option key={status} value={status}>
              {INQUIRY_STATUS_LABEL[status]}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Note" htmlFor={`inquiry-note-${inquiry.id}`}>
        <textarea
          id={`inquiry-note-${inquiry.id}`}
          rows={2}
          placeholder="Add a note…"
          className={`${controlClass} min-h-16 w-full`}
          {...register("note")}
        />
      </FormField>

      <button
        type="submit"
        className="w-fit cursor-pointer rounded bg-brand-accent px-4 py-2 text-body-sm font-medium text-surface-base transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent motion-reduce:transition-none"
      >
        Save
      </button>
    </form>
  );
}
