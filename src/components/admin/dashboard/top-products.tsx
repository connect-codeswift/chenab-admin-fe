import type { TopProduct } from "@/components/admin/dashboard/dashboard-types";
import { formatPrice } from "@/components/products/products-data";

export type TopProductsProps = Readonly<{
  products: readonly TopProduct[];
}>;

export function TopProducts(props: Readonly<TopProductsProps>) {
  const { products } = props;

  return (
    <section
      aria-labelledby="top-products"
      className="flex flex-col gap-4 rounded border border-line-subtle bg-surface-base/70 p-6 panel-glow"
    >
      <h2 id="top-products" className="text-body text-ink-primary">
        Top products
      </h2>

      {products.length === 0 ? (
        <p className="text-body-sm text-ink-muted">
          No sales recorded this week.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex items-center justify-between gap-4"
            >
              <span className="flex flex-col">
                <span className="text-body-sm font-normal text-ink-primary">
                  {product.name}
                </span>
                <span className="text-caption text-ink-muted">
                  {product.unitsSold} sold
                </span>
              </span>
              <span className="text-body-sm font-medium text-ink-primary">
                {formatPrice(product.revenue)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
