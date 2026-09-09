import Header from "@/components/layout/Header";
import LandingCtaSection from "@/components/landing/LandingCtaSection";
import LandingFooter from "@/components/landing/LandingFooter";
import PortfolioHeroSection from "@/components/landing/PortfolioHeroSection";
import SectionReveal from "@/components/landing/SectionReveal";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

type ServicePageCopy = {
  hero: {
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    description: string;
    stats: readonly { value: string; label: string }[];
    actionLabel: string;
  };
  overview: {
    badge: string;
    title: string;
    description: string;
    points: readonly string[];
  };
};

type ServiceLandingPageProps = {
  locale: string;
  copy: ServicePageCopy;
  showcase?: ReactNode;
};

type HeroCard = {
  label: string;
  image: string;
};

export default async function ServiceLandingPage({
  locale,
  copy,
  showcase,
}: ServiceLandingPageProps) {
  const homeT = await getTranslations({ locale, namespace: "HomePage" });
  const heroCards = homeT.raw("hero.cards") as HeroCard[];
  const sectionId = "sobre-o-servico";

  return (
    <>
      <Header
        locale={locale}
        variant="landing"
        navItems={[
          { label: homeT("nav.home"), href: `/${locale}` },
          { label: homeT("nav.solutions"), href: `/${locale}#solutions` },
          { label: homeT("nav.portfolio"), href: `/${locale}/portfolio` },
          { label: homeT("nav.about"), href: `/${locale}/about-us` },
          { label: homeT("nav.brand"), href: `/${locale}/marca` },
          { label: homeT("nav.franchises"), href: `/${locale}/franquias` },
          { label: homeT("nav.videoMomentum"), href: `/${locale}/video-momentum` },
          { label: homeT("nav.feedback"), href: `/${locale}#feedback` },
        ]}
        cta={{ label: homeT("nav.cta"), href: `/${locale}#cta` }}
      />

      <main
        id="main-content"
        className="bg-background text-foreground relative min-h-screen overflow-x-clip"
      >
        <PortfolioHeroSection
          titleBefore={copy.hero.titleBefore}
          titleHighlight={copy.hero.titleHighlight}
          titleAfter={copy.hero.titleAfter}
          description={copy.hero.description}
          stats={copy.hero.stats}
          cards={heroCards}
          showcaseId={sectionId}
          showcaseLabel={copy.hero.actionLabel}
        />

        {showcase ?? (
          <section id={sectionId} className="relative px-4 py-24 sm:px-6 md:py-32">
            <div className="landing-grid-bg pointer-events-none absolute inset-0 opacity-25" />
            <div className="landing-orb landing-orb-left pointer-events-none opacity-50" />
            <div className="landing-orb landing-orb-right pointer-events-none opacity-45" />
            <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
              <SectionReveal className="lg:col-span-6" direction="left">
                <div className="landing-pill">
                  <span className="landing-pill-dot" />
                  {copy.overview.badge}
                </div>
                <h2 className="mt-6 text-3xl leading-[1.08] font-bold text-white md:text-5xl">
                  {copy.overview.title}
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
                  {copy.overview.description}
                </p>
              </SectionReveal>

              <SectionReveal className="lg:col-span-6" delay={0.12} direction="right">
                <div className="grid gap-4 sm:grid-cols-2">
                  {copy.overview.points.map((point, index) => (
                    <article
                      key={point}
                      className="landing-glass rounded-[1.5rem] border border-white/10 p-6"
                    >
                      <div className="font-display landing-text-gradient text-2xl">
                        0{index + 1}
                      </div>
                      <p className="mt-4 text-sm leading-6 text-white/72">{point}</p>
                    </article>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </section>
        )}

        <LandingCtaSection
          sectionId="cta"
          badge={homeT("cta.badge")}
          titleBefore={homeT("cta.titleBefore")}
          titleHighlight={homeT("cta.titleHighlight")}
          titleAfter={homeT("cta.titleAfter")}
          description={homeT("cta.description")}
          buttonLabel={homeT("cta.button")}
          contactHref={`/${locale}#contact`}
          cards={heroCards.slice(0, 3)}
        />

        <LandingFooter
          locale={locale}
          sectionId="contact"
          navigationTitle={homeT("footer.navigationTitle")}
          contactTitle={homeT("footer.contactTitle")}
          description={homeT("footer.description")}
          email={homeT("footer.email")}
          phone={homeT("footer.phone")}
          rights={homeT("footer.rights")}
          privacyLabel={homeT("footer.privacy")}
          termsLabel={homeT("footer.terms")}
          navItems={[
            { label: homeT("nav.solutions"), href: `/${locale}#solutions` },
            { label: homeT("nav.about"), href: `/${locale}/about-us` },
            { label: homeT("nav.portfolio"), href: `/${locale}/portfolio` },
            { label: homeT("nav.franchises"), href: `/${locale}/franquias` },
            { label: homeT("nav.feedback"), href: `/${locale}#feedback` },
          ]}
        />
      </main>
    </>
  );
}
