import { EditorialSection } from "./editorial-section";
export function TheRiver() {
  return (
    <EditorialSection
      id="the-river-heading"
      index="01"
      label="The River"
      title="The Chenab descends from 4,900 metres. By the time it reaches our farms, it carries everything the mountains dissolve into water."
      body="Glacial meltwater carries dissolved minerals — silica, calcium, magnesium — that accumulate in the floodplain over millennia. This mineral content in the soil is measurable and directly correlates with the aromatic compounds produced in basmati grain during ripening. It is not folklore; it is soil chemistry."
      imageSrc="/images/our-valley/the-river.png"
      imageAlt="The Chenab river running over rocks between forested mountain slopes"
      imageSide="right"
    />
  );
}
export function TheFields() {
  return (
    <EditorialSection
      id="the-fields-heading"
      index="02"
      label="The Fields"
      title="Our fields are a reflection of the river's journey. We farm within 60 kilometres of the Chenab — and nowhere else."
      body="We work with 14 contracted farming families, all within 60 kilometres of the Chenab river. Contracts are fixed-price, agreed before planting, and payment is made 30 days before harvest — which means our farmers can focus on crop quality rather than worrying about price fluctuations at the mandi."
      imageSrc="/images/our-valley/the-fields.png"
      imageAlt="A field of basmati rice under a blue sky"
      imageSide="left"
    />
  );
}
export function TheFarmers() {
  return (
    <EditorialSection
      id="the-farmers-heading"
      index="03"
      label="The Farmers"
      title="Generational knowledge is not transferable to a manual. We work with families who carry it."
      body="The farmers who grow our rice have been growing basmati in the Chenab basin for longer than the company has existed. They understand the micro-variations in their land — which sections drain quickly, which retain moisture, where the nocturnal temperature drop is steepest — and they manage their crop around that knowledge."
      imageSrc="/images/our-valley/the-farmers.png"
      imageAlt="A farmer standing in a field of basmati rice"
      imageSide="right"
    />
  );
}
export function TheGrain() {
  return (
    <EditorialSection
      id="the-grain-heading"
      index="04"
      label="The Grain"
      title="Twelve months in the silo. The grain that emerges is not the same grain that entered."
      body="After harvest, paddy is dried to a safe moisture level and transferred to our climate-controlled ageing facility in Rawalpindi. There it rests for a minimum of 12 months at controlled temperature and humidity. During this period, moisture drops from 13–14% to below 11%, and the starch structure within each grain undergoes a slow rearrangement that changes how the grain behaves on cooking."
      imageSrc="/images/our-valley/the-grains.png"
      imageAlt="A grain of basmati rice"
      imageSide="left"
    />
  );
}
