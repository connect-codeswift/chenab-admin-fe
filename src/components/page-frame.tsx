export type PageFrameProps = Readonly<{
  title: string;
  description: string;
}>;

export function PageFrame(props: Readonly<PageFrameProps>) {
  const { title, description } = props;

  return (
    <section className="mx-auto flex w-full max-w-360 flex-1 flex-col px-6 py-16 md:px-30 md:py-24">
      <h1 className="text-4xl leading-10 font-medium tracking-[-2.5px] text-ink-primary md:text-5xl md:leading-14 md:tracking-[-3px]">
        {title}
      </h1>
      <p className="mt-4 max-w-xl text-base leading-[22px] font-medium tracking-[-0.5px] text-ink-muted">
        {description}
      </p>
    </section>
  );
}
