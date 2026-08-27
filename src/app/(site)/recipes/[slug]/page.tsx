import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Recipe | Chenab Valley Rice",
  description: "Ingredients, method, and the rice this dish was cooked with.",
};

function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function RecipePage({
  params,
}: PageProps<"/recipes/[slug]">) {
  const { slug } = await params;

  return (
    <PageFrame
      title={humanizeSlug(slug)}
      description="Ingredients and a numbered method, with a buy block for the rice used in this dish."
    />
  );
}
