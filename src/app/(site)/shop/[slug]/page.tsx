import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Product | Chenab Valley Rice",
  description:
    "Pack size selection drives price and stock for each Chenab Valley Rice variant.",
};

function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function ProductPage({
  params,
}: PageProps<"/shop/[slug]">) {
  const { slug } = await params;

  return (
    <PageFrame
      title={humanizeSlug(slug)}
      description="Pack size selection drives price and stock. Gallery, buy panel, and cooking guidance land with this screen."
    />
  );
}
