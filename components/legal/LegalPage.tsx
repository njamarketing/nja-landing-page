import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, FileText, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import LandingFooter from "@/components/landing/LandingFooter";
import {
  getLegalCopy,
  getLegalUi,
  legalEmail,
  legalUpdated,
  type LegalKind,
} from "@/data/legal";
import { routing } from "@/i18n/routing";

export type LegalPageProps = { params: Promise<{ locale: string }> };
const paths = { privacy: "privacy-policy", terms: "terms-conditions" };

export function legalMetadata(locale: string, kind: LegalKind): Metadata {
  const copy = getLegalCopy(locale, kind);
  const origin = new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://njamarketing.com.br",
  ).origin;
  const url = `${origin}/${locale}/${paths[kind]}`;
  const title = `${copy.title} | NJA Marketing`;
  return {
    title,
    description: copy.intro,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((language) => [
          language,
          `${origin}/${language}/${paths[kind]}`,
        ]),
      ),
    },
    openGraph: {
      title,
      description: copy.intro,
      url,
      siteName: "NJA Marketing",
      type: "website",
      locale,
    },
    twitter: { card: "summary", title, description: copy.intro },
  };
}

export default async function LegalPage({
  locale,
  kind,
}: {
  locale: string;
  kind: LegalKind;
}) {
  const copy = getLegalCopy(locale, kind);
  const ui = getLegalUi(locale);
  const relatedKind = kind === "privacy" ? "terms" : "privacy";
  const related = getLegalCopy(locale, relatedKind);
  const homeT = await getTranslations({ locale, namespace: "HomePage" });
  const Icon = kind === "privacy" ? ShieldCheck : FileText;
  const date = new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${legalUpdated}T12:00:00Z`));
  const navItems = [
    { label: homeT("nav.home"), href: `/${locale}` },
    { label: homeT("nav.solutions"), href: `/${locale}#solutions` },
    { label: homeT("nav.websites"), href: `/${locale}/website-creation` },
    { label: homeT("nav.portfolio"), href: `/${locale}/portfolio` },
    { label: homeT("nav.about"), href: `/${locale}/about-us` },
    { label: homeT("nav.brand"), href: `/${locale}/marca` },
    { label: homeT("nav.franchises"), href: `/${locale}/franquias` },
    { label: homeT("nav.videoMomentum"), href: `/${locale}/video-momentum` },
  ];
  return (
    <>
      <Header
        locale={locale}
        variant="landing"
        navItems={navItems}
        cta={{ label: homeT("nav.cta"), href: "#legal-contact" }}
      />
      <main
        id="main-content"
        className="relative min-h-screen overflow-x-clip bg-background text-foreground"
      >
        <div className="landing-grid-bg pointer-events-none absolute inset-0 opacity-20" />
        <div className="landing-orb landing-orb-top pointer-events-none opacity-50" />
        <section className="relative mx-auto max-w-7xl px-4 pt-32 pb-12 sm:px-6 sm:pt-40 md:pb-16">
          <div className="landing-pill">
            <span className="landing-pill-dot" />
            {ui.badge}
          </div>
          <div className="mt-7 flex items-start justify-between gap-6">
            <div className="max-w-4xl">
              <h1 className="font-display text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/75 md:text-lg">
                {copy.intro}
              </p>
            </div>
            <div className="hidden rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-6 md:block">
              <Icon
                className="size-12 text-cyan-200"
                strokeWidth={1.25}
                aria-hidden="true"
              />
            </div>
          </div>
          <p className="mt-6 text-sm text-white/55">
            {ui.updated}: <time dateTime={legalUpdated}>{date}</time>
          </p>
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {copy.highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/4 px-5 py-4 text-sm leading-6 text-white/85"
              >
                <Check
                  className="size-4 shrink-0 text-cyan-200"
                  aria-hidden="true"
                />
                {highlight}
              </div>
            ))}
          </div>
        </section>
        <div className="relative mx-auto grid max-w-7xl items-start gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
          <aside className="rounded-3xl border border-white/10 bg-[#071321] p-6 lg:sticky lg:top-28">
            <nav aria-label={ui.contents}>
              <p className="landing-label mb-5 text-cyan-200">{ui.contents}</p>
              <ol className="space-y-1">
                {copy.sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex gap-3 rounded-lg py-2 text-sm leading-6 text-white/70 transition hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                    >
                      <span className="font-mono text-xs leading-6 text-cyan-200/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="mt-6 border-t border-white/10 pt-6 text-xs leading-6 text-white/60">
              <p className="font-medium text-white/85">
                NJA Consultoria &amp; Marketing LTDA
              </p>
              <p>CNPJ: 27.833.808/0001-06</p>
              <p>Foz do Iguaçu, Paraná, Brasil</p>
            </div>
          </aside>
          <div className="min-w-0">
            <article className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-[#071321]/90 px-6 sm:px-9 md:px-12">
              {copy.sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-title`}
                  className="scroll-mt-28 py-8 sm:py-10"
                >
                  <div className="mb-5 flex items-start gap-4">
                    <span
                      className="pt-1 font-mono text-sm text-cyan-200/65"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2
                      id={`${section.id}-title`}
                      className="text-xl leading-8 font-semibold text-white sm:text-2xl"
                    >
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-4 text-base leading-8 text-white/75">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </article>
            <section
              id="legal-contact"
              className="mt-8 scroll-mt-28 rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-blue-500/15 to-cyan-300/5 p-6 sm:p-9"
            >
              <h2 className="text-2xl font-semibold text-white">
                {ui.contact}
              </h2>
              <p className="mt-3 leading-7 text-white/70">{ui.contactText}</p>
              <a
                href={`mailto:${legalEmail}`}
                className="mt-5 inline-flex max-w-full items-center gap-2 break-all text-base font-medium text-cyan-200 underline underline-offset-4 hover:text-white"
              >
                {legalEmail}
                <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
              <div className="mt-7 border-t border-white/10 pt-6">
                <p className="text-xs text-white/55">{ui.related}</p>
                <Link
                  href={`/${locale}/${paths[relatedKind]}`}
                  className="mt-2 inline-flex items-center gap-2 text-sm text-white/85 underline underline-offset-4 hover:text-cyan-200"
                >
                  {related.title}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </section>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs leading-6 text-white/60">
              <span>{ui.sources}:</span>
              <a
                href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm"
                className="underline underline-offset-4 hover:text-cyan-200"
              >
                LGPD
              </a>
              <a
                href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm"
                className="underline underline-offset-4 hover:text-cyan-200"
              >
                {locale === "en"
                  ? "Brazilian Consumer Protection Code"
                  : locale === "es"
                    ? "Código de Defensa del Consumidor de Brasil"
                    : "Código de Defesa do Consumidor"}
              </a>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter
        locale={locale}
        navigationTitle={homeT("footer.navigationTitle")}
        contactTitle={homeT("footer.contactTitle")}
        description={homeT("footer.description")}
        email={homeT("footer.email")}
        phone={homeT("footer.phone")}
        rights={homeT("footer.rights")}
        privacyLabel={homeT("footer.privacy")}
        termsLabel={homeT("footer.terms")}
        navItems={navItems.slice(0, 5)}
      />
    </>
  );
}
