import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Cart | Chenab Valley Rice",
  description: "Review your bag before checkout.",
};

export default function CartPage() {
  return (
    <PageFrame
      title="Cart"
      description="Line items, pack size, quantity, and a subtotal. Checkout is guest by default — no account required."
    />
  );
}
