"use client";

import Image from "next/image";
import SectionReveal from "@/components/landing/SectionReveal";

type NavItem = {
  label: string;
  href: string;
};

type LandingFooterProps = {
  locale: string;
  navigationTitle: string;
  contactTitle: string;
  description: string;
  email: string;
  phone: string;
  rights: string;
  privacyLabel: string;
  termsLabel: string;
  navItems: NavItem[];
  sectionId?: string;
};

function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/svg/nja-logo-extended.svg"
        alt="NJA Consultoria e Marketing"
        width={288}
        height={162}
        priority
        className="h-auto w-52 sm:w-60"
      />
    </div>
  );
}

export default function LandingFooter({
  locale,
  navigationTitle,
  contactTitle,
  description,
  email,
  phone,
  rights,
  privacyLabel,
  termsLabel,
  navItems,
  sectionId = "contact",
}: LandingFooterProps) {
  return (
    <footer
      id={sectionId}
      aria-labelledby="footer-brand-title"
      className="relative border-t border-white/6 px-4 pt-20 pb-10 sm:px-6"
    >
      <div className="landing-divider" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <SectionReveal className="md:col-span-2">
            <div id="footer-brand-title">
              <Logo />
            </div>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/58">{description}</p>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <div className="landing-label text-white/42">{navigationTitle}</div>
            <div className="mt-4 space-y-3 text-sm">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-white/72 transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.16}>
            <div className="landing-label text-white/42">{contactTitle}</div>
            <div className="mt-4 space-y-3 text-sm text-white/72">
              <a href={`mailto:${email}`} className="block transition hover:text-white">
                {email}
              </a>
              <a
                href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-white"
              >
                {phone} (WhatsApp)
              </a>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal
          className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/6 pt-8 text-xs text-white/42"
          delay={0.18}
          distance={18}
        >
          <div>{rights}</div>
          <div className="flex gap-6">
            <a href={`/${locale}/privacy-policy`} className="transition hover:text-white/72">
              {privacyLabel}
            </a>
            <a href={`/${locale}/terms-conditions`} className="transition hover:text-white/72">
              {termsLabel}
            </a>
          </div>
        </SectionReveal>
      </div>
    </footer>
  );
}
