import type { Metadata } from "next";


import { Sourcing } from "@/components/quality/sourcing";
import { Ageing } from "@/components/quality/ageing";
import { Grading } from "@/components/quality/grading";
import { Packing } from "@/components/quality/packing";
import { Dispatch } from "@/components/quality/dispatch";
import { Certified } from "@/components/home/certified";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Quality | Chenab Valley Rice",
  description: "Every batch verified. No exceptions.",
};

export default function QualityPage() {
  return (
    <>
      <PageIntro
        eyebrow="Quality"
        heading="Five steps. Four certifications. Every claim verified."
        description="Quality in rice is not a claim — it is a specification. Every parameter we publish has a test behind it: grain length measured by calibrated instrument, moisture content logged by lot, broken grain percentage counted per sample. The certifications below are not decorative. Each represents an annual third-party audit of a process that either passes or fails on documented evidence."
      />
      <Sourcing />
      <Ageing />
      <Grading />
      <Packing />
      <Dispatch />
      <Certified />
    </>
  );
}
