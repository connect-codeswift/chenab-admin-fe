import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Recipes | Chenab Valley Rice",
  description: "The rice makes the dish. The dish reveals the rice.",
};

export default function RecipesPage() {
  return (
    <PageFrame
      title="Recipes"
      description="The rice makes the dish. The dish reveals the rice. Filter by variant and dish type."
    />
  );
}
