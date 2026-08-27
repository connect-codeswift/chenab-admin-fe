"use client";

import { useForm, useWatch } from "react-hook-form";
import { OrderCard } from "@/components/admin/orders/order-card";
import { controlClass } from "@/components/ui/form-field";

export type OrderNoteCardProps = Readonly<{
  reference: string;
}>;

type OrderNoteValues = {
  note: string;
};

export function OrderNoteCard(props: Readonly<OrderNoteCardProps>) {
  const { reference } = props;
  const { register, handleSubmit, control } = useForm<OrderNoteValues>({
    defaultValues: { note: "" },
  });
  const note = useWatch({ control, name: "note" });
  const noteId = `order-note-${reference}`;
  const canSave = note.trim() !== "";

  /* No admin API yet — the control stays disabled until a note is typed, and
     saving is wired when the endpoint exists. */
  function submit() {}

  return (
    <OrderCard>
      <form onSubmit={handleSubmit(submit)}>
        <label
          htmlFor={noteId}
          className="block pb-3 text-caption font-medium text-ink-muted"
        >
          Internal note
        </label>
        <textarea
          id={noteId}
          rows={2}
          placeholder="Add a note…"
          className={`${controlClass} min-h-16 w-full`}
          {...register("note")}
        />
        <button
          type="submit"
          disabled={!canSave}
          className="mt-4 cursor-pointer rounded bg-brand-accent px-4 py-2 text-body-sm font-medium text-surface-base transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
        >
          Save note
        </button>
      </form>
    </OrderCard>
  );
}
