import Image from "next/image";

export type BrandMarkSize = "header" | "footer" | "admin";

export type BrandMarkProps = Readonly<{
  size?: BrandMarkSize;
  showWordmark?: boolean;
}>;

const lockupClassBySize: Record<BrandMarkSize, string> = {
  header: "flex items-center gap-4",
  footer: "flex items-center gap-2 rounded p-2",
  admin: "flex items-center",
};

/* The admin sidebar lockup is the mark at 28x33 — Figma node 163:1595. */
const markFrameClassBySize: Record<BrandMarkSize, string> = {
  header:
    "relative h-16 w-14 overflow-clip sm:h-20 sm:w-17.25 md:h-28.75 md:w-24.75",
  footer: "relative h-21 w-18 overflow-clip",
  admin: "relative h-8 w-7 overflow-clip",
};

export function BrandMark(props: Readonly<BrandMarkProps>) {
  const { size = "header", showWordmark = false } = props;
  const lockupClass = lockupClassBySize[size];
  const markFrameClass = markFrameClassBySize[size];

  return (
    <span className={lockupClass}>
      <span className={markFrameClass}>
        <Image
          src="/brand/logo.svg"
          alt=""
          width={99}
          height={115}
          className="size-full"
          unoptimized
        />
      </span>
      {showWordmark ? (
        <span className="flex flex-col gap-1">
          <span className="text-h3 text-ink-on-deep">CHENAB</span>
          <span className="text-body-sm text-ink-on-deep">
            Chenab Valley Rice
          </span>
        </span>
      ) : null}
    </span>
  );
}
