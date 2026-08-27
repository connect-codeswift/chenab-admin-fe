"use client";

import { Fragment, type ReactNode } from "react";
import {
  createColumnHelper,
  rowSelectionFeature,
  tableFeatures,
  useTable,
  type CellData,
  type ColumnDef,
  type RowData,
  type RowSelectionState,
  type Updater,
  type TableFeatures,
} from "@tanstack/react-table";

/* A table that needs sorting or pagination registers those slots here — the
   APIs do not exist until the feature is declared. */
export const dataTableFeatures = tableFeatures({ rowSelectionFeature });

export type DataTableFeatures = typeof dataTableFeatures;

/* `helper.columns()` hands back one `any` per column so each cell keeps its own
   value type; a shared list has to mirror that. */
export type DataTableColumn<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
>;

export function createDataTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<DataTableFeatures, TData>();
}

/* eslint-disable @typescript-eslint/no-unused-vars -- interface merging only
   works when the type parameters match the original declaration exactly. */
declare module "@tanstack/table-core" {
  interface ColumnMeta<
    in out TFeatures extends TableFeatures,
    in out TData extends RowData,
    TValue extends CellData = CellData,
  > {
    /** Renders the cell as `<th scope="row">` — one column per table. */
    isRowHeader?: boolean;
    align?: "left" | "right";
    /** Tone for this column's body cells, e.g. `text-ink-muted`. */
    cellClass?: string;
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */

export type DataTableProps<TData extends RowData> = Readonly<{
  columns: readonly DataTableColumn<TData>[];
  data: readonly TData[];
  emptyMessage: string;
  /** Announced to screen readers; the design shows no visible caption. */
  caption: string;
  minWidthClass?: string;
  headCellClass?: string;
  bodyCellClass?: string;
  /* Per-column width utilities, in column order — a design that spaces its
     columns wider than their content needs them stated. */
  columnWidthClass?: readonly string[];
  /* False lets the table hug its column widths instead of filling the panel —
     a design that spaces columns deliberately must not be stretched. */
  stretch?: boolean;
  /* False when the caller sizes its own columns — the wider first/last gutter
     squeezes a narrow column (a 29px action cell cannot hold 48px of it). */
  edgePadding?: boolean;
  /** Row selection is caller-owned so the screen can act on the choice. */
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (updater: Updater<RowSelectionState>) => void;
  getRowId?: (row: TData, index: number) => string;
  /* Row id whose detail panel is open, and what to draw in it. The caller owns
     the state so the trigger can live in one of its own columns. */
  expandedRowId?: string;
  renderExpanded?: (row: TData) => ReactNode;
}>;

const alignClass: Record<"left" | "right", string> = {
  left: "text-left",
  right: "text-right",
};

const defaultHeadCellClass =
  "border-b border-surface-container py-3 text-caption font-bold tracking-wider text-ink-primary uppercase";
const defaultBodyCellClass = "border-b border-surface-sunken py-4 text-body-sm";

export function DataTable<TData extends RowData>(
  props: Readonly<DataTableProps<TData>>,
) {
  const {
    columns,
    data,
    emptyMessage,
    caption,
    minWidthClass,
    headCellClass = defaultHeadCellClass,
    bodyCellClass = defaultBodyCellClass,
    columnWidthClass,
    stretch = true,
    edgePadding = true,
    rowSelection,
    onRowSelectionChange,
    getRowId,
    expandedRowId,
    renderExpanded,
  } = props;
  const table = useTable({
    features: dataTableFeatures,
    columns,
    data,
    getRowId,
    enableRowSelection: rowSelection !== undefined,
    state: rowSelection === undefined ? undefined : { rowSelection },
    onRowSelectionChange,
  });
  const lastColumn = columns.length - 1;

  function resolveEdgeClass(index: number, last: number) {
    if (!edgePadding) {
      return "";
    }

    return index === 0 || index === last ? "px-6" : "px-4";
  }

  if (data.length === 0) {
    return (
      <p className="px-6 py-8 text-body-sm text-ink-muted">{emptyMessage}</p>
    );
  }

  return (
    <div className="scrollbar-none overflow-x-auto">
      <table
        className={`border-collapse [&>tbody>tr:last-child>*]:border-b-0 ${stretch ? "w-full" : ""} ${minWidthClass ?? "min-w-3xl"}`}
      >
        <caption className="sr-only">{caption}</caption>
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header, index) => {
                const meta = header.column.columnDef.meta;
                const edgeClass = resolveEdgeClass(index, lastColumn);

                return (
                  <th
                    key={header.id}
                    scope="col"
                    className={`${headCellClass} ${edgeClass} ${alignClass[meta?.align ?? "left"]} ${columnWidthClass?.[index] ?? ""}`}
                  >
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <tr>
                {row.getAllCells().map((cell, index) => {
                  const meta = cell.column.columnDef.meta;
                  const edgeClass = resolveEdgeClass(index, lastColumn);
                  const CellTag = meta?.isRowHeader ? "th" : "td";

                  return (
                    <CellTag
                      key={cell.id}
                      scope={meta?.isRowHeader ? "row" : undefined}
                      className={`${bodyCellClass} ${edgeClass} ${alignClass[meta?.align ?? "left"]} ${meta?.cellClass ?? "text-ink-primary"} ${columnWidthClass?.[index] ?? ""}`}
                    >
                      <table.FlexRender cell={cell} />
                    </CellTag>
                  );
                })}
              </tr>
              {renderExpanded && row.id === expandedRowId ? (
                <tr>
                  <td colSpan={columns.length} className="bg-surface-subtle">
                    {renderExpanded(row.original)}
                  </td>
                </tr>
              ) : null}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
