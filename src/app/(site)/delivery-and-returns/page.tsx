import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Delivery & returns | Chenab Valley Rice",
  description: "Delivery zones, charges, payment methods, and returns.",
};

export default function DeliveryAndReturnsPage() {
  return (
    <PageFrame
      title="Delivery & returns"
      description="Areas with charges and timings, then payment methods, then the returns position. The zone table lands with this screen."
    />
  );
}
