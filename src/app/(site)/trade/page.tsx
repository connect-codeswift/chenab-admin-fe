import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Trade & contact | Chenab Valley Rice",
  description: "Retailer, distributor, or exporter? Let's talk volume.",
};

export default function TradePage() {
  return (
    <PageFrame
      title="Trade & contact"
      description="Wholesale pricing, certificate packs, and private-label options for verified trade partners. The inquiry form lands with this screen."
    />
  );
}
