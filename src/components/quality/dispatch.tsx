import { QualityStepCard } from "./quality-step-card";

export function Dispatch() {
  return (
    <QualityStepCard
      stepNumber="05"
      title="Dispatch"
      description="Domestic orders are dispatched via temperature-monitored logistics to all major Pakistani cities within 1–2 business days of packing. Export orders travel in fumigated, temperature-logged containers with full documentation including phytosanitary certificate, certificate of origin, and fumigation report. GPS tracking is active from our facility gate to point of delivery."
      imageSrc="/images/quality/dispatch.png"
      imageAlt="Farmers dispatching paddy in the Jhang and Chiniot districts"
      imagePosition="right"
    />
  );
}
