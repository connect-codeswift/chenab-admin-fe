import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { footerNavGroups, type SiteNavGroup } from "@/components/site-nav";

const socialLinks = [
  {
    href: "#",
    label: "WhatsApp",
    src: "/icons/whatsapp.svg",
  },
  {
    href: "#",
    label: "Email",
    src: "/icons/gmail.svg",
  },
  {
    href: "#",
    label: "Facebook",
    src: "/icons/facebook.svg",
  },
  {
    href: "#",
    label: "Instagram",
    src: "/icons/instagram.svg",
  },
] as const;

const footerLinkClass =
  "text-body font-normal text-ink-on-deep-muted hover:text-ink-on-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent";

const legalTextClass = "rounded p-2 text-caption text-ink-on-deep-muted";

const legalLinkClass = `${legalTextClass} hover:text-ink-on-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent`;

const socialHitClass =
  "relative inline-flex size-10 items-center justify-center overflow-clip rounded border border-ink-on-deep-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

export type FooterLinkGroupProps = Readonly<{
  group: SiteNavGroup;
}>;

function FooterLinkList(props: Readonly<FooterLinkGroupProps>) {
  const { group } = props;

  return (
    <ul className="grid grid-cols-2 gap-4.5 lg:flex lg:flex-col">
      {group.links.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className={footerLinkClass}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function FooterLinkGroup(props: Readonly<FooterLinkGroupProps>) {
  const { group } = props;

  return (
    <div className="min-w-0">
      <div className="hidden flex-col gap-12 lg:flex">
        <h2 className="text-h3 text-ink-on-deep">{group.title}</h2>
        <FooterLinkList group={group} />
      </div>
      <details className="border-b border-line-default/20 py-3 lg:hidden">
        <summary className="cursor-pointer text-h4 text-ink-on-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent">
          {group.title}
        </summary>
        <div className="pt-6 pb-3">
          <FooterLinkList group={group} />
        </div>
      </details>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-clip bg-brand-deep text-ink-on-deep">
      <div className="relative mx-auto max-w-360">
        <Image
          src="/images/image.png"
          alt=""
          width={579}
          height={617}
          className="pointer-events-none absolute top-8.75 right-0 z-0 hidden h-154.25 w-144.75 max-w-none select-none lg:block"
        />

        <div className="relative z-10 px-6 pt-16 pb-6 lg:px-30 lg:pt-26.5 lg:pb-6.5">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
            <div className="flex flex-col gap-8">
              <Link
                href="/"
                aria-label="Chenab Valley Rice home"
                className="w-fit rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
              >
                <BrandMark size="footer" showWordmark />
              </Link>
              <ul className="flex w-50.75 items-center justify-between">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className={socialHitClass}
                    >
                      <Image
                        src={social.src}
                        alt=""
                        width={24}
                        height={24}
                        className="size-6"
                        unoptimized
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <nav aria-label="Footer" className="contents">
              {footerNavGroups.map((group) => (
                <FooterLinkGroup key={group.title} group={group} />
              ))}
            </nav>
          </div>

          <div className="mt-12 flex flex-col gap-3 lg:mt-56 lg:flex-row lg:items-center lg:justify-between">
            <p className={legalTextClass}>
              © 2026 Chenab Valley Rice. All rights reserved.
            </p>
            <ul className="flex items-center gap-4.5">
              <li>
                <Link href="#" className={legalLinkClass}>
                  Policy
                </Link>
              </li>
              <li>
                <Link href="#" className={legalLinkClass}>
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
