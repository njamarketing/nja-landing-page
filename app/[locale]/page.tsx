import FeedbackShowcase from "@/components/landing/FeedbackShowcase";
import HeroVisualIntro from "@/components/landing/HeroVisualIntro";
import LandingCtaSection from "@/components/landing/LandingCtaSection";
import LandingFooter from "@/components/landing/LandingFooter";
import LogoMarquee from "@/components/landing/LogoMarquee";
import SectionPlayVideo from "@/components/landing/SectionPlayVideo";
import SectionReveal from "@/components/landing/SectionReveal";
import VisualShowcaseScroll from "@/components/landing/VisualShowcaseScroll";
import Header from "@/components/layout/Header";
import customerFeedback from "@/data/customer-feedback.json";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { CSSProperties } from "react";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

type HeroCard = {
  label: string;
  image: string;
  span: string;
  offset?: string;
};

type SolutionItem = {
  title: string;
  audience: string;
  doing: string;
  result: string;
};

type SolutionVisual = {
  label: string;
  image: string;
  accent: string;
};

type CaseItem = {
  label: string;
  title: string;
  description: string;
};

type FeedbackItem = {
  name: string;
  company: string;
  text: string;
};

type FeedbackProfile = FeedbackItem & {
  avatarSrc: string;
};

type VisualShowcaseCard = {
  image: string;
  label: string;
  profile: FeedbackProfile;
};

type LogoItem = {
  name: string;
  src: string;
};

// type LogoMarqueeProps = {
//   logos: readonly LogoItem[];
//   // eyebrow: string;
//   // title: string;
//   // description: string;
// };

const feedbackProfileSeeds = [
  { name: "Marina Costa", company: "Studio Nexo" },
  { name: "Lucas Almeida", company: "Vértice Tech" },
  { name: "Camila Rocha", company: "Casa Aurora" },
  { name: "Rafael Mendes", company: "Atlas Engenharia" },
  { name: "Juliana Freitas", company: "Clínica Prisma" },
  { name: "Thiago Lima", company: "Grupo Cais" },
  { name: "Beatriz Moura", company: "Orla Fashion" },
  { name: "Guilherme Santos", company: "Nova Safra" },
] as const;

const backgroundShurikens = [
  { left: "6%", top: "12%", size: 44, duration: "15s", delay: "-2s" },
  { left: "18%", top: "58%", size: 35, duration: "18s", delay: "-7s" },
  { left: "29%", top: "28%", size: 31, duration: "13s", delay: "-5s" },
  { left: "42%", top: "74%", size: 40, duration: "17s", delay: "-11s" },
  { left: "57%", top: "16%", size: 48, duration: "16s", delay: "-4s" },
  { left: "68%", top: "48%", size: 34, duration: "14s", delay: "-9s" },
  { left: "81%", top: "24%", size: 38, duration: "19s", delay: "-6s" },
  { left: "88%", top: "68%", size: 42, duration: "21s", delay: "-13s" },
  { left: "73%", top: "84%", size: 30, duration: "12s", delay: "-3s" },
];

const sectionIds = {
  top: "top",
  solutions: "solutions",
  about: "about",
  cases: "cases",
  feedback: "feedback",
  cta: "cta",
  contact: "contact",
} as const;

const solutionVisuals: SolutionVisual[] = [
  { label: "Google Maps", image: "/images/landing/hero-maps.webp", accent: "#68f0c1" },
  { label: "Google Ads", image: "/images/landing/hero-google-ads.jpg", accent: "#ffd166" },
  { label: "Social Media", image: "/images/landing/hero-social.jpg", accent: "#ff8fab" },
  { label: "SEO", image: "/images/landing/hero-seo.webp", accent: "#8ec5ff" },
  { label: "Consultoria", image: "/images/landing/hero-consulting.webp", accent: "#ffb86b" },
  { label: "Branding", image: "/images/landing/hero-branding.webp", accent: "#c9a7ff" },
];

const trustedBrandsData: LogoItem[] = [
  { name: "EOS", src: "/images/logomarks/eo.jpg" },
  { name: "Kings Barber", src: "/images/logomarks/kings.jpg" },
  { name: "Matriscan", src: "/images/logomarks/matriscan.jpg" },
  { name: "Vitalis", src: "/images/logomarks/vitalis.jpg" },
  { name: "Yvy", src: "/images/logomarks/yvy.jpg" },
];

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage.seo" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nja.marketing";
  const pageUrl = `${siteUrl}/${locale}`;
  const languages = Object.fromEntries(
    routing.locales.map((availableLocale) => [availableLocale, `${siteUrl}/${availableLocale}`])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: pageUrl,
      languages,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: pageUrl,
      siteName: "NJA Marketing",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nja.marketing";
  const pageUrl = `${siteUrl}/${locale}`;
  const heroCards = t.raw("hero.cards") as HeroCard[];
  const solutions = t.raw("solutions.items") as SolutionItem[];
  const cases = t.raw("cases.items") as CaseItem[];
  const feedbacks = t.raw("feedback.items") as FeedbackItem[];
  const feedbackProfiles: FeedbackProfile[] = feedbackProfileSeeds.map((seed, index) => {
    const content = feedbacks[index % feedbacks.length];

    return {
      ...content,
      name: seed.name,
      company: seed.company,
      avatarSrc: `https://i.pravatar.cc/160?img=${index + 12}`,
    };
  });
  const visualShowcaseCards: VisualShowcaseCard[] = heroCards.slice(0, 8).map((card, index) => ({
    image: card.image,
    label: card.label,
    profile: feedbackProfiles[index % feedbackProfiles.length],
  }));
  const visualShowcaseRowSizes = [5, 5, 6];
  const visualShowcaseRows = visualShowcaseRowSizes.map((rowSize, rowIndex) =>
    Array.from({ length: rowSize }, (_, cardIndex) => {
      const visualIndex = (rowIndex * rowSize + cardIndex) % visualShowcaseCards.length;
      return visualShowcaseCards[visualIndex];
    })
  );
  const ctaOpportunityCards = heroCards.slice(0, 3).map(({ label, image }) => ({ label, image }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NJA Marketing",
    url: pageUrl,
    description: t("seo.description"),
    inLanguage: locale,
    contactPoint: {
      "@type": "ContactPoint",
      email: t("footer.email"),
      telephone: t("footer.phone"),
      contactType: "customer support",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main
        id="main-content"
        className="bg-background text-foreground relative min-h-screen max-w-full overflow-x-clip"
      >
        <div className="landing-grid-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="landing-orb landing-orb-top" />
        <div className="landing-orb landing-orb-left" />
        <div className="landing-orb landing-orb-right" />
        <div
          className="landing-shuriken-field pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          {backgroundShurikens.map((item, index) => (
            <div
              key={`shuriken-${index}`}
              className="landing-shuriken"
              style={
                {
                  left: item.left,
                  top: item.top,
                  width: `${item.size}px`,
                  height: `${item.size}px`,
                  animationDuration: item.duration,
                  animationDelay: item.delay,
                } satisfies CSSProperties
              }
            />
          ))}
        </div>

        <Header
          locale={locale}
          variant="landing"
          navItems={[
            { label: t("nav.home"), href: `/${locale}#${sectionIds.top}` },
            { label: t("nav.solutions"), href: `/${locale}#${sectionIds.solutions}` },
            { label: t("nav.portfolio"), href: `/${locale}/portfolio` },
            { label: t("nav.about"), href: `/${locale}/about-us` },
            { label: t("nav.brand"), href: `/${locale}/marca` },
            { label: t("nav.franchises"), href: `/${locale}/franquias` },
            { label: t("nav.videoMomentum"), href: `/${locale}/video-momentum` },
            { label: t("nav.cases"), href: `/${locale}#${sectionIds.cases}` },
            { label: t("nav.feedback"), href: `/${locale}#${sectionIds.feedback}` },
          ]}
          cta={{ label: t("nav.cta"), href: `/${locale}#${sectionIds.cta}` }}
        />

        <section
          id={sectionIds.top}
          aria-labelledby="hero-title"
          className="relative overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-8">
            <SectionReveal className="lg:col-span-6" delay={0.12} distance={40} direction="left">
              <h1
                id="hero-title"
                className="mt-4 max-w-3xl text-4xl leading-[1.04] font-bold text-white sm:mt-6 md:text-5xl lg:text-6xl"
              >
                {t("hero.titleBefore")}{" "}
                <span className="landing-text-gradient">{t("hero.titleHighlight")}</span>{" "}
                {t("hero.titleAfter")}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:mt-6 sm:text-lg">
                {t("hero.lead")}
              </p>
              <p className="mt-3 max-w-2xl text-base leading-7 text-white/72 sm:mt-4 sm:text-lg">
                {t("hero.description")}
              </p>

              <div className="mt-8 flex flex-wrap gap-4 sm:mt-10">
                <a href={`/${locale}#${sectionIds.cta}`} className="landing-button">
                  {t("hero.primaryCta")}
                </a>
                <a
                  href={`/${locale}#${sectionIds.solutions}`}
                  className="landing-button landing-button-secondary"
                >
                  {t("hero.secondaryCta")}
                </a>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6 text-sm text-white/55 sm:mt-12 sm:pt-8">
                <div>
                  <div className="font-display text-2xl text-white">
                    {t("hero.stats.clientsValue")}
                  </div>
                  <div>{t("hero.stats.clientsLabel")}</div>
                </div>
                <div>
                  <div className="font-display text-2xl text-white">
                    {t("hero.stats.yearsValue")}
                  </div>
                  <div>{t("hero.stats.yearsLabel")}</div>
                </div>
                <div>
                  <div className="font-display landing-text-gradient text-2xl">
                    {t("hero.stats.focusValue")}
                  </div>
                  <div>{t("hero.stats.focusLabel")}</div>
                </div>
              </div>
            </SectionReveal>

            <HeroVisualIntro cards={heroCards} />
          </div>
        </section>

        <LogoMarquee
          eyebrow={t("trustedBrands.eyebrow")}
          title={t("trustedBrands.title")}
          description={t("trustedBrands.description")}
          logos={trustedBrandsData}
        />

        <section
          id={sectionIds.solutions}
          aria-labelledby="solutions-title"
          className="relative px-4 py-24 sm:px-6 md:py-32"
        >
          <div className="landing-divider" />
          <div className="mx-auto max-w-7xl">
            <SectionReveal className="max-w-3xl">
              <div className="landing-pill">
                <span className="landing-pill-dot landing-pill-dot-blue" />
                {t("solutions.badge")}
              </div>
              <h2
                id="solutions-title"
                className="mt-6 text-3xl leading-[1.08] font-bold md:text-5xl"
              >
                {t("solutions.titleBefore")}{" "}
                <span className="landing-text-gradient">{t("solutions.titleHighlight")}</span>{" "}
                {t("solutions.titleAfter")}
              </h2>
              <p className="mt-6 text-base leading-7 text-white/68 sm:text-lg">
                {t("solutions.description")}
              </p>
            </SectionReveal>

            <div className="mt-16 grid gap-6 md:hidden">
              {solutions.map((item, index) => {
                const visual = solutionVisuals[index % solutionVisuals.length];

                return (
                  <SectionReveal
                    key={`${item.title}-mobile-${index}`}
                    delay={index * 0.08}
                    className="landing-glass overflow-hidden rounded-[1.8rem] shadow-[var(--shadow-card)]"
                  >
                    <div className="relative min-h-[23rem] sm:min-h-[25rem]">
                      <Image
                        src={visual.image}
                        alt={item.title}
                        fill
                        sizes="100vw"
                        className="object-cover opacity-78"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/42 to-black/12" />
                      <div className="relative flex min-h-[23rem] flex-col justify-between p-6 sm:min-h-[25rem]">
                        <div className="flex items-start justify-between gap-4">
                          <div className="landing-mini-badge">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <span className="landing-arrow-chip">NJA</span>
                        </div>
                        <div>
                          <div
                            className="landing-label"
                            style={{
                              color: visual.accent,
                              textShadow: `0 0 18px ${visual.accent}55`,
                            }}
                          >
                            {visual.label}
                          </div>
                          <h3 className="mt-4 text-[1.65rem] leading-tight font-semibold text-white sm:text-2xl">
                            {item.title}
                          </h3>
                          <p className="mt-4 text-[0.9375rem] leading-7 text-white/86 sm:text-sm">
                            {item.audience}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5 p-6 text-[0.9375rem] sm:text-sm">
                      <div>
                        <div className="landing-label">{t("solutions.doingLabel")}</div>
                        <p className="mt-2 leading-7 text-white/82">{item.doing}</p>
                      </div>
                      <div className="h-px bg-white/8" />
                      <div>
                        <div className="landing-label">{t("solutions.resultLabel")}</div>
                        <p className="mt-2 leading-7 text-white/82">{item.result}</p>
                      </div>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>

            <div className="mt-16 hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
              {solutions.map((item, index) => {
                const visual = solutionVisuals[index % solutionVisuals.length];

                return (
                  <SectionReveal
                    key={`${item.title}-${index}`}
                    delay={index * 0.08}
                    className="landing-solution-card group relative min-h-[420px] [perspective:1600px]"
                    style={{
                      animation: `landingFloat ${6.4 + index * 0.5}s ease-in-out ${index * 0.2}s infinite`,
                    }}
                  >
                    <div className="landing-solution-card-inner relative h-full min-h-[420px]">
                      <div className="landing-solution-face landing-solution-face-front landing-glass overflow-hidden rounded-[1.8rem] shadow-[var(--shadow-card)]">
                        <Image
                          src={visual.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover opacity-78 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/38 to-black/10" />
                        <div className="relative flex h-full flex-col justify-between p-7">
                          <div className="flex items-start justify-between gap-4">
                            <div className="landing-mini-badge">
                              {String(index + 1).padStart(2, "0")}
                            </div>
                            <span className="landing-arrow-chip">+</span>
                          </div>
                          <div>
                            <div
                              className="landing-label"
                              style={{
                                color: visual.accent,
                                textShadow: `0 0 18px ${visual.accent}55`,
                              }}
                            >
                              {visual.label}
                            </div>
                            <h3 className="mt-4 max-w-xs text-2xl leading-tight font-semibold text-white">
                              {item.title}
                            </h3>
                            <p className="mt-4 max-w-sm text-sm leading-7 text-white/72">
                              {item.audience}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="landing-solution-face landing-solution-face-back landing-glass landing-panel rounded-[1.8rem] p-7">
                        <div className="landing-mini-badge">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                        <div className="mt-6 space-y-5 text-sm">
                          <div>
                            <div className="landing-label">{t("solutions.doingLabel")}</div>
                            <p className="mt-2 leading-7 text-white/82">{item.doing}</p>
                          </div>
                          <div className="h-px bg-white/8" />
                          <div>
                            <div className="landing-label">{t("solutions.resultLabel")}</div>
                            <p className="mt-2 leading-7 text-white/82">{item.result}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id={sectionIds.about}
          aria-labelledby="about-title"
          className="relative px-4 py-24 sm:px-6 md:py-32"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
            <SectionReveal className="lg:col-span-5" direction="left">
              <div className="landing-pill">
                <span className="landing-pill-dot" />
                {t("about.badge")}
              </div>
              <h2 id="about-title" className="mt-6 text-3xl leading-[1.08] font-bold md:text-5xl">
                {t("about.titleBefore")}{" "}
                <span className="landing-text-gradient">{t("about.titleHighlight")}</span>{" "}
                {t("about.titleAfter")}
              </h2>
              <p className="mt-6 text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
                {t("about.description")}
              </p>
            </SectionReveal>

            <SectionReveal className="relative lg:col-span-7" delay={0.12} direction="right">
              <div className="landing-card-glow absolute -inset-6 rounded-[2rem]" />
              <div className="landing-glass relative overflow-hidden rounded-[2rem]">
                <SectionPlayVideo
                  src="/videos/logo.mp4"
                  label={t("about.imageAlt")}
                  className="h-[420px] w-full object-cover md:h-[540px]"
                />
              </div>
            </SectionReveal>
          </div>
        </section>

        <SectionReveal distance={24}>
          <VisualShowcaseScroll rows={visualShowcaseRows} />
        </SectionReveal>

        <section
          id={sectionIds.cases}
          aria-labelledby="cases-title"
          className="relative px-4 py-24 sm:px-6 md:py-32"
        >
          <div className="landing-divider landing-divider-blue" />
          <div className="mx-auto max-w-7xl">
            <SectionReveal className="max-w-2xl">
              <div className="landing-pill">
                <span className="landing-pill-dot landing-pill-dot-blue" />
                {t("cases.badge")}
              </div>
              <h2 id="cases-title" className="mt-6 text-3xl leading-[1.08] font-bold md:text-5xl">
                <span className="landing-text-gradient">{t("cases.titleHighlight")}</span>{" "}
                {t("cases.titleAfter")}
              </h2>
              <p className="mt-6 text-base leading-7 text-white/68 sm:text-lg">
                {t("cases.description")}
              </p>
            </SectionReveal>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {cases.map((item, index) => (
                <SectionReveal
                  key={`${item.label}-${index}`}
                  delay={index * 0.08}
                  className="landing-glass landing-panel flex min-h-72 flex-col justify-between rounded-[1.8rem] p-7"
                >
                  <div>
                    <div className="landing-label">{item.label}</div>
                    <h3 className="font-display mt-3 text-2xl text-white/92">{item.title}</h3>
                    <p className="mt-5 text-sm leading-7 text-white/65">{item.description}</p>
                  </div>
                  <div className="mt-8 text-sm text-white/58">{t("cases.footer")}</div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id={sectionIds.feedback}
          aria-labelledby="feedback-title"
          className="relative px-4 py-24 sm:px-6 md:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <SectionReveal className="mx-auto max-w-3xl text-center">
              <div className="landing-pill mx-auto">
                <span className="landing-pill-dot" />
                {t("feedback.badge")}
              </div>
              <h2
                id="feedback-title"
                className="mt-6 text-3xl leading-[1.08] font-bold md:text-5xl"
              >
                <span className="landing-text-gradient">{t("feedback.titleHighlight")}</span>{" "}
                {t("feedback.titleAfter")}
              </h2>
              <p className="mt-6 text-base leading-7 text-white/68 sm:text-lg">
                {t("feedback.description")}
              </p>
            </SectionReveal>

            <SectionReveal delay={0.12} distance={24}>
              <FeedbackShowcase
                items={customerFeedback.items.map((item) => ({
                  ...item,
                  company: t("feedback.source"),
                }))}
              />
            </SectionReveal>
          </div>
        </section>

        <LandingCtaSection
          sectionId={sectionIds.cta}
          badge={t("cta.badge")}
          titleBefore={t("cta.titleBefore")}
          titleHighlight={t("cta.titleHighlight")}
          titleAfter={t("cta.titleAfter")}
          description={t("cta.description")}
          buttonLabel={t("cta.button")}
          contactHref={`/${locale}#${sectionIds.contact}`}
          cards={ctaOpportunityCards}
        />

        <LandingFooter
          locale={locale}
          sectionId={sectionIds.contact}
          navigationTitle={t("footer.navigationTitle")}
          contactTitle={t("footer.contactTitle")}
          description={t("footer.description")}
          email={t("footer.email")}
          phone={t("footer.phone")}
          rights={t("footer.rights")}
          privacyLabel={t("footer.privacy")}
          termsLabel={t("footer.terms")}
          navItems={[
            { label: t("nav.solutions"), href: `/${locale}#${sectionIds.solutions}` },
            { label: t("nav.about"), href: `/${locale}#${sectionIds.about}` },
            { label: t("nav.portfolio"), href: `/${locale}/portfolio` },
            { label: t("nav.franchises"), href: `/${locale}/franquias` },
            { label: t("nav.cases"), href: `/${locale}#${sectionIds.cases}` },
            { label: t("nav.feedback"), href: `/${locale}#${sectionIds.feedback}` },
            { label: t("nav.cta"), href: `/${locale}#${sectionIds.cta}` },
          ]}
        />
      </main>
    </>
  );
}
