"use client";

import Image from "next/image";
import { useFieldArray, useFormContext } from "react-hook-form";
import type {
  ProductFormValues,
  SkuStatus,
} from "@/components/admin/products/product-wizard/product-form-types";
import {
  createSkuDraft,
  SKU_STATUS_LABEL,
} from "@/components/admin/products/product-wizard/product-form-types";
import {
  createDataTableColumnHelper,
  DataTable,
} from "@/components/ui/data-table";
import { controlClass } from "@/components/ui/form-field";

export type StepSkusProps = Readonly<{
  stockLabel?: string;
  /* The two screens lay this table out differently: the add-product modal is
     630px across (Figma 212:5239), the detail page 999px (Figma 212:9017). */
  layout?: "modal" | "page";
}>;

const LAYOUT = {
  /* 126.29 / 153.75 / 126.29 / 126.29 / 78.53 / 19.26 = 630 */
  modal: {
    columns: ["w-31.5", "w-38.5", "w-31.5", "w-31.5", "w-19.5", "w-6"],
    minWidth: "min-w-157.5",
  },
  /* 189.47 / 230.66 / 222.09 / 210.06 / 117.78 / 28.85 = 999 */
  page: {
    columns: ["w-47.25", "w-57.75", "w-55.5", "w-52.5", "w-29.5", "w-7.5"],
    minWidth: "w-full",
  },
} as const;

const headCellClass =
  "border-b border-line-subtle pb-2.5 text-left text-caption font-medium tracking-wider text-ink-muted uppercase";
const bodyCellClass = "border-b border-surface-sunken py-2.5 align-middle";

const STATUS_OPTIONS: readonly SkuStatus[] = ["in-stock", "low", "out"];

/* Rows are react-hook-form field entries, so the table and the form always
   agree on which row is which. */
type SkuField = Readonly<{ id: string }>;

const helper = createDataTableColumnHelper<SkuField>();

export function StepSkus(props: Readonly<StepSkusProps>) {
  const { stockLabel = "Stock (kg)", layout = "page" } = props;
  const { columns: columnWidthClass, minWidth } = LAYOUT[layout];
  const { control, register } = useFormContext<ProductFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: "skus" });

  const columns = helper.columns([
    helper.display({
      id: "size",
      header: "Size",
      cell: ({ row }) => (
        <input
          aria-label="Pack size"
          placeholder="1 kg"
          className={`${controlClass} w-20`}
          {...register(`skus.${row.index}.size`)}
        />
      ),
    }),
    helper.display({
      id: "price",
      header: "Price (Rs.)",
      cell: ({ row }) => (
        <input
          aria-label="Price in rupees"
          inputMode="numeric"
          placeholder="0"
          className={`${controlClass} w-25`}
          {...register(`skus.${row.index}.price`)}
        />
      ),
    }),
    helper.display({
      id: "stock",
      header: stockLabel,
      cell: ({ row }) => (
        <input
          aria-label="Stock level"
          inputMode="numeric"
          placeholder="0"
          className={`${controlClass} w-20`}
          {...register(`skus.${row.index}.stock`)}
        />
      ),
    }),
    helper.display({
      id: "status",
      header: "Status",
      cell: ({ row }) => (
        <select
          aria-label="Stock status"
          className={`${controlClass} w-22.5`}
          {...register(`skus.${row.index}.status`)}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {SKU_STATUS_LABEL[status]}
            </option>
          ))}
        </select>
      ),
    }),
    helper.display({
      id: "active",
      header: "Active",
      cell: ({ row }) => (
        <input
          type="checkbox"
          aria-label="Pack active"
          className="control-checkbox"
          {...register(`skus.${row.index}.active`)}
        />
      ),
    }),
    helper.display({
      id: "remove",
      header: () => <span className="sr-only">Remove</span>,
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() => remove(row.index)}
          className="cursor-pointer rounded p-1 hover:bg-surface-sunken focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
        >
          <span className="sr-only">Remove pack size</span>
          <Image
            src="/icons/admin/trash.svg"
            alt=""
            width={14}
            height={14}
            className="size-3.5"
          />
        </button>
      ),
    }),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        caption="Pack sizes and pricing"
        columns={columns}
        data={fields}
        getRowId={(field) => field.id}
        headCellClass={headCellClass}
        bodyCellClass={bodyCellClass}
        columnWidthClass={columnWidthClass}
        minWidthClass={minWidth}
        stretch={false}
        edgePadding={false}
        emptyMessage="No pack sizes yet."
      />

      <button
        type="button"
        onClick={() => append(createSkuDraft())}
        className="flex w-fit cursor-pointer items-center gap-1 rounded text-caption text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
      >
        <Image
          src="/icons/admin/plus-accent.svg"
          alt=""
          width={12}
          height={12}
          className="size-3"
        />
        Add size
      </button>
    </div>
  );
}
