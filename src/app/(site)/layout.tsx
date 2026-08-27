import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-brand-deep focus:px-4 focus:py-2 focus:text-ink-on-deep"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <CtaSection />
      <Footer />
    </>
  );
}
