import { QualityStepCard } from "./quality-step-card";

export function Ageing() {
  return (
    <QualityStepCard
      stepNumber="02"
      title="Ageing"
      description="Paddy is stored in climate-controlled silos at our Rawalpindi facility for a minimum of 12 months. Temperature is maintained between 18–22°C and relative humidity below 65% throughout the ageing period. Monthly moisture readings confirm the drying curve. No paddy leaves the silo before completing 12 full months from intake date."
      imageSrc="/images/quality/ageing.png"
      imageAlt="Farmers ageing paddy in the Jhang and Chiniot districts"
      imagePosition="left"
    />
  );
}
