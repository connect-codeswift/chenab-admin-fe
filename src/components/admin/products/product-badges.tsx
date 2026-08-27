import { PRODUCT_STOCK_LABEL } from "@/components/admin/products/products-data";
import type { ProductStock } from "@/components/admin/products/products-types";

const badgeClass = "inline-flex rounded px-2 py-0.5 text-caption font-medium";

const stockBadgeClass: Record<ProductStock, string> = {
  "in-stock": "bg-state-positive/12 text-state-positive-ink",
  low: "bg-state-warning/35 text-state-warning-ink",
  out: "bg-state-critical/10 text-state-critical",
};

export type StockBadgeProps = Readonly<{
  stock: ProductStock;
}>;

/* In-stock carries no badge in the design — only the exceptions are called
   out, and each one is a word, never colour alone. */
export function StockBadge(props: Readonly<StockBadgeProps>) {
  const { stock } = props;

  if (stock === "in-stock") {
    return null;
  }

  return (
    <span className={`${badgeClass} ${stockBadgeClass[stock]}`}>
      {PRODUCT_STOCK_LABEL[stock]}
    </span>
  );
}

export type VisibilityBadgeProps = Readonly<{
  visible: boolean;
}>;

export function VisibilityBadge(props: Readonly<VisibilityBadgeProps>) {
  const { visible } = props;
  const toneClass = visible
    ? "bg-state-positive/12 text-state-positive-ink"
    : "bg-surface-sunken text-ink-muted";

  return (
    <span className={`${badgeClass} ${toneClass}`}>
      {visible ? "Visible" : "Hidden"}
    </span>
  );
}
