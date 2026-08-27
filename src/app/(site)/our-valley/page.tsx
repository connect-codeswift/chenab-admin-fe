import type { Metadata } from "next";
import { FarmerQuote } from "@/components/our-valley/farmer-quote";
import { PageIntro } from "@/components/page-intro";

import {
  TheFarmers,
  TheGrain,
  TheRiver,
} from "@/components/our-valley/valley-portfolio";
import { TheFields } from "@/components/our-valley/valley-portfolio";

export default function OurValleyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our Valley"
        heading="Where the rice comes from.Why it tastes different."
        description="The Chenab is one of the five rivers that define the Punjab. It descends from the Himalayas through Kashmir and enters the Pakistani plains near Sialkot, spreading south-west before joining the Sutlej at Trimmu. That journey leaves mineral-rich alluvial deposits across a belt of farmland that has produced basmati rice for more than a century.
"
      />
      <TheRiver />
      <TheFields />
      <FarmerQuote />
      <TheFarmers />
      <TheGrain />
    </>
  );
}
