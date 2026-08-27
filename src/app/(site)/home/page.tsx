import { Certified } from "@/components/home/certified";
import { FromTheKitchen } from "@/components/home/from-the-kitchen";
import { Hero } from "@/components/home/hero";
import { HeroStack } from "@/components/home/hero-stack";
import { HowWeDeliver } from "@/components/home/how-we-deliver";
import { OurValley } from "@/components/home/our-valley";
import { TheRange } from "@/components/home/the-range";
import { WhyChenabValley } from "@/components/home/why-chenab-valley";
import { RecentProducts } from "@/components/products/recent-products";

export default function HomePage() {
  return (
    <>
      <HeroStack
        hero={
          <Hero
            src="/images/hero-image.png"
            alt="Rice fields in the Chenab valley"
            title="Chenab Valley Rice"
            priority
          />
        }
      >
        <OurValley />
      </HeroStack>
      <TheRange />
      <FromTheKitchen />
      <WhyChenabValley />
      <RecentProducts />
      <Certified />
      <HowWeDeliver />
    </>
  );
}
