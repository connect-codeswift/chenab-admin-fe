import { QualityStepCard } from "./quality-step-card";

export function Sourcing() {
  return (
    <QualityStepCard
      stepNumber="01"
      title="Sourcing"
      description="Paddy is purchased directly from 14 contracted farming families in the Jhang and Chiniot districts. No mandi, no intermediary. Every batch is spot-tested at farm gate for moisture content (must be below 14%), grain length, and aroma intensity before we accept delivery. Batches that do not meet our threshold are not purchased."
      imageSrc="/images/quality/sourcing.png"
      imageAlt="Farmers transplanting paddy in the Jhang and Chiniot districts"
      imagePosition="right"
    />
  );
}
