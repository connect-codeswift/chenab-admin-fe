import Image, { type StaticImageData } from "next/image";

export type HeroProps = Readonly<{
  src: string | StaticImageData;
  alt: string;
  title: string;
  priority?: boolean;
}>;

export function Hero(props: Readonly<HeroProps>) {
  const { src, alt, title, priority = false } = props;

  return (
    <section className="sticky top-0 h-dvh overflow-clip">
      <h1 className="sr-only">{title}</h1>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-center will-change-transform"
        style={{
          transform: "scale(calc(1 - var(--hero-progress, 0) * 0.08))",
        }}
      />
      <div className="absolute inset-0 bg-ink-primary/50" />
      <div
        aria-hidden
        className="absolute inset-0 bg-ink-primary"
        style={{ opacity: "calc(var(--hero-progress, 0) * 0.35)" }}
      />
    </section>
  );
}
