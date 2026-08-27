import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Checkout | Chenab Valley Rice",
  description: "Guest checkout. No account required.",
};

export default function CheckoutPage() {
  return (
    <PageFrame
      title="Checkout"
      description="Contact, address, delivery, and payment in one column. An account may be offered after the order, never as a gate before it."
    />
  );
}
