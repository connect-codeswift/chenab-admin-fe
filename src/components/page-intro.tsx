import Image from "next/image";

export type PageIntroProps = Readonly<{
  eyebrow: string;
  heading: string;
  description: string;
  iconSrc?: string;
}>;

export function PageIntro(props: Readonly<PageIntroProps>) {
  const { eyebrow, heading, description, iconSrc = "/icons/grain.svg" } = props;

  return (
    <section
      aria-labelledby="page-intro-heading"
      className="relative mx-auto flex w-full max-w-360 flex-col items-center overflow-hidden bg-surface-base px-6 py-16 lg:px-30 lg:py-20"
    >
      {/* Brown atmosphere blur — applied to the whole section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-[159px] w-[165px] bg-brown blur-[500px]"
      />

      {/* Icon, eyebrow and heading group. */}
      <div className="relative z-10 flex w-full max-w-[588px] flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={iconSrc}
              alt=""
              width={20}
              height={40}
              className="h-8 w-4 rotate-[-45deg] object-contain"
              unoptimized
            />
            <span className="text-body-sm text-brand-accent">{eyebrow}</span>
          </div>
          <h2
            id="intro-intro-heading"
            className="text-center text-h2 text-ink-primary"
          >
            {heading}
          </h2>
        </div>
      </div>

      {/* Description. */}
      <p className="relative z-10 mt-8 max-w-[1200px] text-center text-lead text-ink-muted lg:mt-12">
        {description}
      </p>
    </section>
  );
}