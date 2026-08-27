import Image from "next/image";
import theRiverImage from "../../../public/images/our-valley/the-river.jpg";
import theFieldsImage from "../../../public/images/our-valley/the-fields.jpg";
import theFarmersImage from "../../../public/images/our-valley/the-farmers.jpg";
import theGrainImage from "../../../public/images/our-valley/the-grain.jpg";

export type EditorialSectionImageSide = "left" | "right";
export type EditorialSectionProps = Readonly<{
  id: string;
  index: string;
  label: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  imageSide?: EditorialSectionImageSide;
}>;
export function EditorialSection(props: Readonly<EditorialSectionProps>) {
  const {
    id,
    index,
    label,
    title,
    body,
    imageSrc,
    imageAlt,
    imageSide = "right",
  } = props;
  const textOrderClass = imageSide === "left" ? "lg:order-2" : "lg:order-1";
  const imageOrderClass = imageSide === "left" ? "lg:order-1" : "lg:order-2";
  return (
    <section
      aria-labelledby={id}
      className="flex justify-center bg-surface-base lg:px-[120px] lg:py-[80px]"
    >
      {/* Horizontal flow container — 1200x486, gap-24, mt-80/ml-120 handled via section padding above */}
      <div className="flex w-full max-w-[1200px] flex-col lg:h-[486px] lg:w-[1200px] lg:flex-row lg:items-center lg:gap-[24px]">
        {/* Content div — vertical flow, 690x342, gap-24 */}
        <div
          className={`order-2 flex flex-col items-center justify-center gap-4 px-6 py-10 text-center lg:h-[342px] lg:w-[690px] lg:gap-[24px] lg:px-0 lg:py-0 ${textOrderClass}`}
        >
          <p className="text-body-sm text-brand-accent">
            {index} — {label}
          </p>
          <h2 id={id} className="max-w-xl text-h3 text-ink-primary lg:text-h2">
            {title}
          </h2>
          <p className="max-w-lg text-body-sm text-ink-muted">{body}</p>
        </div>
        {/* Image div — 486x486, radius 4px */}
        <div
          className={`relative order-1 aspect-4/3 w-full overflow-clip rounded-[4px] lg:aspect-auto lg:h-[486px] lg:w-[486px] lg:shrink-0 ${imageOrderClass}`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 486px, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
