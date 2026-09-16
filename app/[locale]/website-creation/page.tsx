import { getWhatsAppUrl } from "@/lib/whatsapp";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Globe2,
  Layers3,
  MessageCircle,
  Palette,
  Server,
  Smartphone,
  Sparkles,
  Minus,
} from "lucide-react";
import Header from "@/components/layout/Header";
import LandingFooter from "@/components/landing/LandingFooter";
import SectionReveal from "@/components/landing/SectionReveal";
import WebsiteBriefingForm from "@/components/landing/WebsiteBriefingForm";
import WebsiteFaqItem from "@/components/landing/WebsiteFaqItem";
import WebsiteBenefitsAccordion from "@/components/landing/WebsiteBenefitsAccordion";
import WebsiteHeroImage from "@/components/landing/WebsiteHeroImage";
import { getWebsiteProductCopy } from "@/data/website-product";
import { routing } from "@/i18n/routing";
import { getWebsitePaymentUrl, WEBSITE_OFFER } from "@/lib/website-briefing";

type PageProps = { params: Promise<{ locale: string }> };
const benefitIcons = [
  Palette,
  Smartphone,
  MessageCircle,
  Globe2,
  Layers3,
  Server,
];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { seo } = getWebsiteProductCopy(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://njamarketing.com.br";
  const pageUrl = `${siteUrl}/${locale}/website-creation`;
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(
        routing.locales.map((language) => [
          language,
          `${siteUrl}/${language}/website-creation`,
        ]),
      ),
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: pageUrl,
      siteName: "NJA Marketing",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: seo.title,
      description: seo.description,
    },
  };
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="landing-pill">
      <span className="landing-pill-dot" />
      {children}
    </div>
  );
}

export default async function WebsiteProductPage({ params }: PageProps) {
  const { locale } = await params;
  const copy = getWebsiteProductCopy(locale);
  const home = await getTranslations({ locale, namespace: "HomePage" });
  const phone = home("footer.phone");
  const contactHref = getWhatsAppUrl(phone, locale, "websiteQuestions");
  const paymentUrl = getWebsitePaymentUrl(process.env.NJA_WEBSITE_PAYMENT_URL);
  const navItems = [
    { label: home("nav.home"), href: `/${locale}` },
    { label: copy.nav.benefits, href: "#beneficios" },
    { label: copy.nav.process, href: "#como-funciona" },
    { label: copy.nav.price, href: "#investimento" },
    { label: copy.nav.faq, href: "#duvidas" },
  ];

  return (
    <>
      <Header
        locale={locale}
        variant="landing"
        navItems={navItems}
        cta={{ label: copy.cta, href: "#briefing" }}
      />
      <main
        id="main-content"
        className="website-product relative min-h-screen overflow-x-clip bg-background text-foreground"
      >
        <section
          id="top"
          aria-labelledby="website-title"
          className="relative px-4 pt-36 pb-20 sm:px-6 sm:pt-40 md:pb-24 lg:pt-44"
        >
          <div className="landing-grid-bg pointer-events-none absolute inset-0 opacity-50" />
          <div className="landing-orb landing-orb-top pointer-events-none" />
          <div className="landing-orb landing-orb-right pointer-events-none opacity-60" />
          <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            <SectionReveal direction="left" distance={24} className="order-2 lg:order-1">
              <h1
                id="website-title"
                className="mt-6 max-w-2xl text-[2.65rem] leading-[1.05] font-bold tracking-[-.04em] sm:text-6xl lg:text-[4.2rem]"
              >
                {copy.hero.before}{" "}
                <span className="landing-text-gradient">
                  {copy.hero.highlight}
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-xl leading-8 text-white/80 sm:text-2xl sm:leading-9">
                {copy.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
                <div>
                  <p className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                    {WEBSITE_OFFER.development}
                  </p>
                  <p className="mt-1 text-xs text-white/55">
                    {copy.hero.development}
                  </p>
                </div>
                <span
                  className="text-2xl font-light text-white/30"
                  aria-hidden="true"
                >
                  {copy.hero.priceJoin}
                </span>
                <div>
                  <p className="font-display text-2xl font-medium text-white/90 sm:text-3xl">
                    {WEBSITE_OFFER.monthly}
                  </p>
                  <p className="mt-1 text-xs text-white/55">
                    {copy.hero.monthly}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-brand-cyan sm:text-base">
                {copy.hero.note}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#briefing" className="landing-button gap-3">
                  {copy.cta}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href="#investimento"
                  className="landing-button landing-button-secondary"
                >
                  {copy.secondaryCta}
                </a>

              </div>
            </SectionReveal>
            <SectionReveal
              direction="right"
              distance={24}
              delay={0.12}
              className="order-1 lg:order-2"
            >
              <WebsiteHeroImage />
            </SectionReveal>
          </div>
        </section>

        <div className="relative border-y border-brand-cyan/15 bg-brand-cyan/5 px-4 py-8 sm:px-6 sm:py-10">
          <div className="mx-auto max-w-7xl">
            <dl className="grid grid-cols-3 divide-x divide-white/10">
              {[WEBSITE_OFFER.delivery, "100%", "24/7"].map((value, index) => (
                <div key={value} className="flex flex-col items-center px-2 text-center sm:px-6">
                  <dt className="order-2 mt-2 max-w-44 text-[11px] leading-5 text-white/65 sm:text-xs">
                    {copy.hero.stats[index]}
                  </dt>
                  <dd className="font-display text-2xl font-semibold text-brand-cyan sm:text-3xl md:text-4xl">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mx-auto mt-6 max-w-3xl text-center text-[11px] leading-5 text-white/50 sm:text-xs">
              {copy.hero.deadline}
            </p>
          </div>
        </div>

        <section
          id="beneficios"
          aria-labelledby="website-benefits-title"
          className="relative px-4 py-20 sm:px-6 md:py-28"
        >
          <div className="landing-divider" />
          <div className="mx-auto max-w-7xl">
            <SectionReveal className="max-w-3xl">
              <Badge>{copy.benefits.badge}</Badge>
              <h2
                id="website-benefits-title"
                className="mt-6 text-3xl leading-[1.1] font-semibold md:text-5xl"
              >
                {copy.benefits.title}{" "}
                <span className="landing-text-gradient">
                  {copy.benefits.highlight}
                </span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/65">
                {copy.benefits.description}
              </p>
            </SectionReveal>
            <WebsiteBenefitsAccordion
              items={copy.benefits.items.map((item, index) => {
                const Icon = benefitIcons[index];
                return {
                  ...item,
                  icon: <Icon className="size-4" strokeWidth={1.5} aria-hidden="true" />,
                };
              })}
            />
            <div className="mt-12 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
              {copy.benefits.items.map((item, index) => {
                const Icon = benefitIcons[index];
                return (
                  <SectionReveal key={item.title} delay={(index % 3) * 0.06}>
                    <article className="landing-glass h-full rounded-3xl p-7 transition-colors duration-300 hover:border-brand-cyan/25">
                      <div className="flex size-11 items-center justify-center rounded-xl border border-brand-cyan/15 bg-brand-cyan/5 text-brand-cyan">
                        <Icon
                          className="size-5"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="mt-6 text-xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/60">
                        {item.description}
                      </p>
                    </article>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="como-funciona"
          aria-labelledby="website-process-title"
          className="relative px-4 py-20 sm:px-6 md:py-28"
        >
          <div className="landing-grid-bg pointer-events-none absolute inset-0 opacity-20" />
          <div className="relative mx-auto max-w-7xl">
            <SectionReveal className="max-w-3xl">
              <Badge>{copy.process.badge}</Badge>
              <h2
                id="website-process-title"
                className="mt-6 text-3xl leading-[1.1] font-semibold md:text-5xl"
              >
                {copy.process.title}{" "}
                <span className="landing-text-gradient">
                  {copy.process.highlight}
                </span>
              </h2>
            </SectionReveal>
            <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {copy.process.items.map((item, index) => (
                <li key={item.title}>
                  <SectionReveal delay={index * 0.08}>
                    <div className="flex items-center gap-5">
                      <span className="font-display landing-text-gradient text-5xl font-medium">
                        0{index + 1}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-brand-cyan/25 to-white/5" />
                      {index < 2 && (
                        <ArrowRight
                          className="hidden size-4 text-white/25 md:block"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/60">
                      {item.description}
                    </p>
                  </SectionReveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="investimento"
          aria-labelledby="website-pricing-title"
          className="relative px-4 py-20 sm:px-6 md:py-28"
        >
          <div className="landing-divider" />
          <div className="landing-orb landing-orb-right pointer-events-none opacity-50" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <SectionReveal direction="left">
              <Badge>{copy.pricing.badge}</Badge>
              <h2
                id="website-pricing-title"
                className="mt-6 text-3xl leading-[1.1] font-semibold md:text-5xl"
              >
                {copy.pricing.title}{" "}
                <span className="landing-text-gradient">
                  {copy.pricing.highlight}
                </span>
              </h2>
              <p className="mt-6 text-base leading-8 text-white/65">
                {copy.pricing.description}
              </p>
              <div className="mt-8 flex items-start gap-4 rounded-2xl border border-white/8 bg-white/2 p-5">
                <Clock3
                  className="mt-1 size-5 shrink-0 text-brand-cyan"
                  aria-hidden="true"
                />
                <p className="text-sm leading-7 text-white/65">
                  {copy.hero.deadline.replace(/^\*/, "")}
                </p>
              </div>
              <p className="mt-6 text-xs leading-7 text-white/50">
                {copy.pricing.domainNote}
              </p>
              <p className="mt-3 text-xs leading-7 text-white/50">
                {copy.pricing.scopeNote}
              </p>
            </SectionReveal>
            <SectionReveal direction="right" delay={0.08}>
              <div className="relative rounded-[2rem] bg-gradient-to-br from-brand-cyan/50 via-brand-blue/40 to-white/10 p-px shadow-[0_20px_100px_-35px_rgba(35,91,215,0.65)]">
                <div className="rounded-[calc(2rem-1px)] bg-[#080f1a] p-7 sm:p-10">
                  <div className="flex items-center gap-2 text-xs text-brand-cyan">
                    <Sparkles className="size-3.5" aria-hidden="true" />
                    {copy.pricing.tag}
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold">
                    {copy.pricing.plan}
                  </h3>
                  <p className="mt-7 text-xs text-white/55">
                    {copy.pricing.development}
                  </p>
                  <p className="font-display mt-2 text-5xl font-semibold tracking-tight sm:text-6xl">
                    {WEBSITE_OFFER.development}
                  </p>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/3 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-display text-xl">
                        + {WEBSITE_OFFER.monthly}
                        <span className="ml-1 text-xs font-normal text-white/55">
                          {copy.pricing.monthly}
                        </span>
                      </p>
                      <span className="rounded-full bg-brand-cyan/10 px-2.5 py-1 text-[10px] text-brand-cyan">
                        {copy.pricing.fixed}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-white/55">
                      {copy.pricing.maintenance}
                    </p>
                  </div>
                  <ul className="mt-7 space-y-4">
                    {copy.pricing.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-6 text-white/75"
                      >
                        <Check
                          className="mt-1 size-4 shrink-0 text-brand-cyan"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#briefing"
                    className="landing-button mt-8 w-full gap-3"
                  >
                    {copy.cta}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        <section
          aria-labelledby="website-scope-title"
          className="relative px-4 py-16 sm:px-6 md:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <SectionReveal className="max-w-3xl">
              <Badge>{copy.scope.badge}</Badge>
              <h2
                id="website-scope-title"
                className="mt-6 text-3xl leading-tight font-semibold md:text-4xl"
              >
                {copy.scope.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-white/65">
                {copy.scope.description}
              </p>
            </SectionReveal>
            <div className="mt-12 grid border-y border-white/10 md:grid-cols-2">
              {[copy.scope.included, copy.scope.excluded].map(
                (items, index) => (
                  <SectionReveal
                    key={index}
                    delay={index * 0.08}
                    className={`grid grid-cols-[80px_minmax(0,1fr)] content-start items-center gap-x-5 py-8 sm:grid-cols-[112px_minmax(0,1fr)] sm:gap-x-6 sm:py-10 ${index === 0 ? "border-b border-white/10 md:border-r md:border-b-0 md:pr-8" : "md:pl-8"}`}
                  >
                    <div className="relative aspect-[6/5] w-full">
                      <Image
                        src={index === 0 ? "/images/avatar/ninja-approve.png" : "/images/avatar/ninja-x.png"}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 80px, 112px"
                        className="object-contain"
                      />
                    </div>
                    <h3
                      className={`min-w-0 text-lg font-semibold sm:text-xl ${index === 0 ? "text-brand-cyan" : "text-white/85"}`}
                    >
                      {index === 0
                        ? copy.scope.includedTitle
                        : copy.scope.excludedTitle}
                    </h3>
                    <ul className="col-span-2 mt-6 divide-y divide-white/10">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 py-4 text-sm leading-6 text-white/75"
                        >
                          <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${index === 0 ? "bg-brand-cyan/10 text-brand-cyan" : "bg-white/5 text-white/45"}`}>
                            {index === 0 ? (
                              <Check className="size-3.5" aria-hidden="true" />
                            ) : (
                              <Minus className="size-3.5" aria-hidden="true" />
                            )}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </SectionReveal>
                ),
              )}
            </div>
            <p className="mt-6 text-sm leading-7 text-white/55">
              {copy.scope.custom}{" "}
              <a
                href={getWhatsAppUrl(phone, locale, "customWebsite")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cyan underline underline-offset-4"
              >
                {copy.scope.customCta}
                <ArrowUpRight
                  className="ml-1 inline size-3.5"
                  aria-hidden="true"
                />
              </a>
            </p>
          </div>
        </section>

        <section
          id="briefing"
          aria-labelledby="website-briefing-title"
          className="relative px-4 py-20 sm:px-6 md:py-28"
        >
          <div className="landing-divider" />
          <div className="landing-orb landing-orb-left pointer-events-none opacity-40" />
          <div className="relative mx-auto max-w-7xl">
            <SectionReveal className="mb-12 max-w-3xl">
              <Badge>{copy.form.badge}</Badge>
              <h2
                id="website-briefing-title"
                className="mt-6 text-3xl leading-[1.1] font-semibold md:text-5xl"
              >
                {copy.form.title}{" "}
                <span className="landing-text-gradient">
                  {copy.form.highlight}
                </span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/65">
                {copy.form.description}
              </p>
            </SectionReveal>
            <WebsiteBriefingForm
              copy={copy}
              locale={locale}
              phone={phone}
              paymentUrl={paymentUrl}
            />
          </div>
        </section>

        <section
          id="duvidas"
          aria-labelledby="website-faq-title"
          className="relative px-4 pt-12 pb-24 sm:px-6 md:pb-32"
        >
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <SectionReveal>
              <Badge>{copy.faq.badge}</Badge>
              <h2
                id="website-faq-title"
                className="mt-6 text-3xl leading-tight font-semibold md:text-4xl"
              >
                {copy.faq.title}
              </h2>
              <a
                href={contactHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm text-brand-cyan"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                {copy.scope.customCta}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <div className="mt-8 max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
                <Image
                  src="/images/ninja-faq.webp"
                  alt=""
                  width={1200}
                  height={800}
                  sizes="(min-width: 1280px) 486px, (min-width: 1024px) 40vw, (min-width: 640px) 512px, calc(100vw - 32px)"
                  className="h-auto w-full"
                />
              </div>
            </SectionReveal>
            <div className="divide-y divide-white/10 border-t border-white/10">
              {copy.faq.items.map((item) => (
                <WebsiteFaqItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        </section>

        <LandingFooter
          locale={locale}
          navigationTitle={home("footer.navigationTitle")}
          contactTitle={home("footer.contactTitle")}
          description={home("footer.description")}
          email={home("footer.email")}
          phone={phone}
          rights={home("footer.rights")}
          privacyLabel={home("footer.privacy")}
          termsLabel={home("footer.terms")}
          navItems={[
            { label: home("nav.home"), href: `/${locale}` },
            { label: home("nav.portfolio"), href: `/${locale}/portfolio` },
            { label: home("nav.about"), href: `/${locale}/about-us` },
            { label: copy.nav.product, href: "#top" },
          ]}
        />
      </main>
    </>
  );
}
