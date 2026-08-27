import { QualityStepCard } from "./quality-step-card";

export function Grading() {
  return (
    <QualityStepCard
      stepNumber="03"
      title="Grading"
      description="After milling, rice passes through optical sorters calibrated to remove discoloured, broken, and chalky grains. Grain length is verified by automated measurement against the specification for each variety. Only grains meeting the minimum length threshold proceed to packing. Rejected grain is sold at commodity rates — it does not re-enter our packing line."
      imageSrc="/images/quality/grading.png"
      imageAlt="Farmers grading paddy in the Jhang and Chiniot districts"
      imagePosition="right"
    />
  );
}
