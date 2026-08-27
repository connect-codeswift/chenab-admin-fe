import { QualityStepCard } from "./quality-step-card";

export function Packing() {
  return (
    <QualityStepCard
      stepNumber="04"
      title="Packing"
      description="Graded rice is filled and sealed in moisture-barrier, food-grade packaging within 4 hours of milling. Each bag is printed with the variety name, pack date, batch code, and net weight. Bags are visually inspected and weighed before sealing. A sealed sample from every batch is retained for 24 months for traceability."
      imageSrc="/images/quality/packing.png"
      imageAlt="Farmers packing paddy in the Jhang and Chiniot districts"
      imagePosition="left"
    />
  );
}
