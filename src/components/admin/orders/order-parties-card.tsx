import { OrderCard } from "@/components/admin/orders/order-card";
import type { OrderParty } from "@/components/admin/orders/order-detail-types";

export type OrderPartiesCardProps = Readonly<{
  customer: OrderParty;
  deliverTo: readonly string[];
}>;

export function OrderPartiesCard(props: Readonly<OrderPartiesCardProps>) {
  const { customer, deliverTo } = props;

  return (
    <OrderCard>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col">
          <h3 className="text-caption text-sm font-medium text-ink-muted">
            Customer
          </h3>
          <p className="pt-2.5 text-body-sm font-medium text-ink-primary">
            {customer.name}
          </p>
          <p className="text-body-sm text-ink-muted">{customer.email}</p>
          <p className="text-body-sm text-ink-muted">{customer.phone}</p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-caption text-sm font-medium text-ink-muted">
            Deliver to
          </h3>
          <address className="pt-2.5 text-body-sm text-ink-primary not-italic">
            {deliverTo.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>
      </div>
    </OrderCard>
  );
}
