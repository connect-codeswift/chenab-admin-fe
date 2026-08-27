import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Where to buy | Chenab Valley Rice",
  description: "Stockists grouped by city.",
};

export default function WhereToBuyPage() {
  return (
    <PageFrame
      title="Where to buy"
      description="Stockists grouped by city. The empty state is the launch-day state and ships with this screen."
    />
  );
}
