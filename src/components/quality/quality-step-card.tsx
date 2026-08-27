import Image from "next/image";

export type QualityStepCardProps = Readonly<{
  stepNumber: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
}>;

export function QualityStepCard(props: Readonly<QualityStepCardProps>) {
  const {
    stepNumber,
    title,
    description,
    imageSrc,
    imageAlt,
    imagePosition = "right",
  } = props;

  const textOrder = imagePosition === "right" ? "lg:order-1" : "lg:order-2";
  const imageOrder = imagePosition === "right" ? "lg:order-2" : "lg:order-1";

  return (
    <section
      aria-labelledby={`quality-step-${stepNumber}-title`}
      className="relative mx-auto flex w-full max-w-360 flex-col items-center gap-12 overflow-hidden bg-surface-base px-1 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-20.5 lg:py-10"
    >
      {/* Background blur effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-2px] right-0 h-[159px] w-[165px] bg-[rgba(217,155,52,1)] blur-[500px]"
      />

      <div
        className={`flex w-full flex-col items-center text-center lg:w-1/2 ${textOrder}`}
      >
        <span className="text-h3 font-bold text-brand-accent">
          {stepNumber}
        </span>
        <h2
          id={`quality-step-${stepNumber}-title`}
          className="mt-2 text-h2 text-ink-primary"
        >
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-body font-normal text-ink-muted">
          {description}
        </p>
      </div>

      <div
        className={`rounded-2.5 relative aspect-4/3 w-full max-w-xl overflow-hidden lg:aspect-auto lg:h-100 lg:w-1/2 lg:max-w-none ${imageOrder}`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
