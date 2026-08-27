import Image from "next/image";

export function FarmerQuote() {
  return (
    <section
      aria-labelledby="farmer-quote-heading"
      className="relative mx-auto flex h-auto w-full max-w-360 flex-col overflow-clip bg-linear-to-br from-neutral-100 via-neutral-200 to-neutral-300 lg:h-152.5"
    >
      <div className="relative order-2 flex w-full flex-col gap-8 px-6 py-10 lg:absolute lg:top-[165px] lg:left-[8.47%] lg:order-none lg:w-[57.22%] lg:max-w-[824px] lg:gap-8 lg:px-0 lg:py-0">
        {/* Description */}
        <blockquote>
          <p
            id="farmer-quote-heading"
            className="text-lead text-ink-primary lg:font-['Poppins'] lg:text-[28px] lg:leading-[42px] lg:font-normal lg:tracking-[-1.5px]"
          >
            “The cooler the night during grain-fill, the more fragrant the
            harvest. We have farmed this land for three generations. We do not
            need a laboratory to tell us — we know it from the scent when the
            pots open.”
          </p>
        </blockquote>

        <figcaption className="flex flex-col gap-4 text-body font-bold text-ink-primary lg:font-['Poppins'] lg:text-[36px] lg:leading-[40px] lg:font-medium lg:tracking-[-2.5px]">
          <span className="block">Muhammad Aslam, contract farmer,</span>
          <span className="block">Jhang district</span>
        </figcaption>
      </div>

      <div className="relative order-1 aspect-3/2 w-full lg:absolute lg:top-0 lg:left-[40.625%] lg:order-none lg:aspect-auto lg:h-[610px] lg:w-[59.375%] lg:max-w-[855px]">
        <Image
          src="/images/our-valley/farmer-portrait.png"
          alt="Portrait of Muhammad Aslam, a contract farmer from Jhang district"
          fill
          sizes="(min-width: 1024px) 855px, 100vw"
          className="object-cover object-top"
        />
      </div>
    </section>
  );
}
