"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import { InquiryDetailPanel } from "@/components/admin/inquiries/inquiry-detail-panel";
import type { InquiryDetailValues } from "@/components/admin/inquiries/inquiry-detail-panel";
import { InquiryStatusBadge } from "@/components/admin/inquiries/inquiry-status-badge";
import type { InquiryRow } from "@/components/admin/inquiries/inquiries-types";
import {
  createDataTableColumnHelper,
  DataTable,
} from "@/components/ui/data-table";

export type InquiriesContentProps = Readonly<{
  inquiries: readonly InquiryRow[];
}>;

/* Figma node 212:4152 — the columns are laid out well wider than their text. */
const columnWidthClass = [
  "w-51.25",
  "w-36",
  "w-33",
  "w-49.75",
  "w-40",
  "w-28",
  "w-41.25",
  "w-19.25",
] as const;

const headCellClass =
  "border-b border-line-subtle py-3 text-left text-caption font-medium tracking-wider text-ink-muted uppercase";
const bodyCellClass =
  "border-b border-surface-sunken py-3.75 text-body-sm text-ink-muted";

const helper = createDataTableColumnHelper<InquiryRow>();

export function InquiriesContent(props: Readonly<InquiriesContentProps>) {
  const { inquiries } = props;
  const [rows, setRows] = useState<readonly InquiryRow[]>(inquiries);
  const [expandedId, setExpandedId] = useState<string>();

  function toggle(id: string) {
    setExpandedId((current) => (current === id ? undefined : id));
  }

  /* Held locally so a save shows its result — there is no admin API to send
     the new status or note to yet. */
  function handleSave(id: string, values: InquiryDetailValues) {
    setRows((previous) =>
      previous.map((row) => (row.id === id ? { ...row, ...values } : row)),
    );
    setExpandedId(undefined);
  }

  const columns = helper.columns([
    helper.accessor("company", {
      header: "Company",
      meta: { isRowHeader: true, cellClass: "font-medium text-ink-primary" },
    }),
    helper.accessor("type", { header: "Type" }),
    helper.accessor("country", { header: "Country" }),
    helper.accessor("volume", { header: "Volume" }),
    helper.accessor("status", {
      header: "Status",
      cell: (info) => <InquiryStatusBadge status={info.getValue()} />,
    }),
    helper.accessor("owner", { header: "Owner" }),
    helper.accessor("receivedOn", { header: "Date" }),
    helper.display({
      id: "expand",
      header: () => <span className="sr-only">Details</span>,
      cell: ({ row }) => {
        const open = row.id === expandedId;

        return (
          <button
            type="button"
            aria-expanded={open}
            onClick={() => toggle(row.id)}
            className="flex size-6 cursor-pointer items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            <span className="sr-only">
              {open ? "Hide" : "Show"} {row.original.company} details
            </span>
            <Icon
              icon="mdi:chevron-down"
              className={`size-3.5 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
        );
      },
    }),
  ]);

  return (
    <section
      aria-label="Trade inquiries"
      className="overflow-clip rounded border border-line-subtle bg-surface-base shadow-xs"
    >
      <DataTable
        caption="Trade inquiries"
        columns={columns}
        data={rows}
        getRowId={(inquiry) => inquiry.id}
        headCellClass={headCellClass}
        bodyCellClass={bodyCellClass}
        minWidthClass="min-w-298.5"
        columnWidthClass={columnWidthClass}
        expandedRowId={expandedId}
        renderExpanded={(inquiry) => (
          <InquiryDetailPanel
            inquiry={inquiry}
            onSave={(values) => handleSave(inquiry.id, values)}
          />
        )}
        emptyMessage="No trade inquiries yet."
      />
    </section>
  );
}
