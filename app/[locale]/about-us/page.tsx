import type { Metadata } from "next";
import AboutHeroSection from "@/components/landing/AboutHeroSection";
import AboutTeamSection from "@/components/landing/AboutTeamSection";
import LandingCtaSection from "@/components/landing/LandingCtaSection";
import SectionPlayVideo from "@/components/landing/SectionPlayVideo";
import SectionReveal from "@/components/landing/SectionReveal";
import Header from "@/components/layout/Header";
import LandingFooter from "@/components/landing/LandingFooter";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

type HeroCard = {
  label: string;
  image: string;
  span: string;
  offset?: string;
};

type TeamMember = {
  image: string;
  alt: string;
  objectPosition?: string;
};

const sectionIds = {
  top: "top",
  cta: "cta",
  contact: "contact",
} as const;

const teamTitles = {
  pt: "Conheça nossa equipe",
  en: "Meet our team",
  es: "Conoce a nuestro equipo",
} as const;

const teamSubtitles = {
  pt: "Pessoas que sustentam a estratégia, a criação e a execução da NJA no dia a dia.",
  en: "The people behind NJA's strategy, creative direction and execution every day.",
  es: "Las personas que sostienen la estrategia, la creación y la ejecución de NJA cada día.",
} as const;

const aboutOverviewCopy = {
  pt: {
    badge: "Sobre a NJA",
    titleBefore: "Inteligência de bastidor com",
    titleHighlight: "execução afiada",
    titleAfter: "para marcas que querem crescer",
    description:
      "A proposta visual e textual do hub foi trazida para a landing com foco institucional. Aqui, a NJA se apresenta como parceira estratégica de empresas que precisam alinhar posicionamento, aquisição e crescimento com mais clareza.",
    imageAlt: "Equipe da NJA Consultoria e Marketing",
  },
  en: {
    badge: "About NJA",
    titleBefore: "Backstage intelligence with",
    titleHighlight: "sharp execution",
    titleAfter: "for brands ready to grow",
    description:
      "The visual and textual direction from the hub was brought into this institutional landing page. NJA appears here as a strategic partner for companies that need clearer positioning, acquisition and growth decisions.",
    imageAlt: "NJA Consulting and Marketing team",
  },
  es: {
    badge: "Sobre NJA",
    titleBefore: "Inteligencia de bastidor con",
    titleHighlight: "ejecución precisa",
    titleAfter: "para marcas listas para crecer",
    description:
      "La dirección visual y textual del hub fue llevada a esta landing institucional. Aquí, NJA se presenta como un socio estratégico para empresas que necesitan más claridad en posicionamiento, adquisición y crecimiento.",
    imageAlt: "Equipo de NJA Consultoría y Marketing",
  },
} as const;

const ctaCopy = {
  pt: {
    badge: "Análise estratégica sem compromisso",
    titleBefore: "Descubra as",
    titleHighlight: "maiores oportunidades",
    titleAfter: "de crescimento da sua empresa",
    description:
      "Agende uma análise inicial e receba uma visão clara do que está funcionando, do que precisa ser corrigido e de quais estratégias podem gerar mais clientes para o seu negócio.",
    button: "Agendar análise gratuita",
  },
  en: {
    badge: "No-commitment strategic review",
    titleBefore: "Discover the",
    titleHighlight: "biggest opportunities",
    titleAfter: "for your company growth",
    description:
      "Schedule an initial review and get a clear view of what is working, what needs to be fixed and which strategies can generate more customers for your business.",
    button: "Schedule a free review",
  },
  es: {
    badge: "Análisis estratégico sin compromiso",
    titleBefore: "Descubre las",
    titleHighlight: "mayores oportunidades",
    titleAfter: "de crecimiento de tu empresa",
    description:
      "Agenda un análisis inicial y recibe una visión clara de lo que está funcionando, de lo que debe corregirse y de qué estrategias pueden generar más clientes para tu negocio.",
    button: "Agendar análisis gratuito",
  },
} as const;

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage.seo" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nja.marketing";
  const pageUrl = `${siteUrl}/${locale}/about-us`;
  const languages = Object.fromEntries(
    routing.locales.map((availableLocale) => [
      availableLocale,
      `${siteUrl}/${availableLocale}/about-us`,
    ])
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

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const homeT = await getTranslations({ locale, namespace: "HomePage" });
  const heroCards = homeT.raw("hero.cards") as HeroCard[];
  const ctaOpportunityCards = heroCards.slice(0, 3).map(({ label, image }) => ({ label, image }));
  const teamTitle = teamTitles[locale as keyof typeof teamTitles] ?? teamTitles.pt;
  const teamSubtitle = teamSubtitles[locale as keyof typeof teamSubtitles] ?? teamSubtitles.pt;
  const aboutOverview =
    aboutOverviewCopy[locale as keyof typeof aboutOverviewCopy] ?? aboutOverviewCopy.pt;
  const ctaSectionCopy = ctaCopy[locale as keyof typeof ctaCopy] ?? ctaCopy.pt;
  const teamMembers: TeamMember[] = [
    {
      image: "/images/landing/about-team.jpg",
      alt: "Colaborador da NJA",
      objectPosition: "10% 38%",
    },
    {
      image: "/images/landing/about-team.jpg",
      alt: "Colaboradora da NJA",
      objectPosition: "30% 34%",
    },
    {
      image: "/images/landing/about-team.jpg",
      alt: "Profissional da equipe NJA",
      objectPosition: "52% 36%",
    },
    {
      image: "/images/landing/about-team.jpg",
      alt: "Integrante da equipe NJA",
      objectPosition: "72% 34%",
    },
  ];

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
          { label: homeT("nav.cases"), href: `/${locale}#cases` },
          { label: homeT("nav.feedback"), href: `/${locale}#feedback` },
        ]}
        cta={{ label: homeT("nav.cta"), href: `/${locale}#cta` }}
      />
      <main
        id="main-content"
        className="bg-background text-foreground relative min-h-screen max-w-full overflow-x-clip"
      >
        <AboutHeroSection
          titleBefore={t("hero.titleBefore")}
          titleHighlight={t("hero.titleHighlight")}
          titleAfter={t("hero.titleAfter")}
          description={t("hero.description")}
        />

        <div className="relative overflow-x-clip overflow-y-visible">
          <div className="landing-divider" />
          <div className="landing-grid-bg pointer-events-none absolute inset-0 opacity-30" />
          <div className="landing-orb landing-orb-left pointer-events-none top-24 opacity-45" />
          <div className="landing-orb landing-orb-right pointer-events-none bottom-24 opacity-40" />

          <section
            aria-labelledby="about-overview-title"
            className="relative px-4 py-24 sm:px-6 md:py-32"
          >
            <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
              <SectionReveal className="lg:col-span-5" direction="left">
                <div className="landing-pill">
                  <span className="landing-pill-dot" />
                  {aboutOverview.badge}
                </div>
                <h2
                  id="about-overview-title"
                  className="mt-6 text-3xl leading-[1.08] font-bold md:text-5xl"
                >
                  {aboutOverview.titleBefore}{" "}
                  <span className="landing-text-gradient">{aboutOverview.titleHighlight}</span>{" "}
                  {aboutOverview.titleAfter}
                </h2>
                <p className="mt-6 text-lg leading-8 text-white/68">{aboutOverview.description}</p>
              </SectionReveal>

              <SectionReveal className="relative lg:col-span-7" delay={0.12} direction="right">
                <div className="landing-card-glow absolute -inset-6 rounded-[2rem]" />
                <div className="landing-glass relative overflow-hidden rounded-[2rem]">
                  <SectionPlayVideo
                    src="/videos/logo.mp4"
                    label={aboutOverview.imageAlt}
                    className="h-[420px] w-full object-cover md:h-[540px]"
                  />
                </div>
              </SectionReveal>
            </div>
          </section>

          <AboutTeamSection title={teamTitle} subtitle={teamSubtitle} members={teamMembers} />

          <LandingCtaSection
            sectionId={sectionIds.cta}
            badge={ctaSectionCopy.badge}
            titleBefore={ctaSectionCopy.titleBefore}
            titleHighlight={ctaSectionCopy.titleHighlight}
            titleAfter={ctaSectionCopy.titleAfter}
            description={ctaSectionCopy.description}
            buttonLabel={ctaSectionCopy.button}
            contactHref={`https://wa.me/${homeT("footer.phone").replace(/\D/g, "")}`}
            cards={ctaOpportunityCards}
          />
        </div>
      </main>
      <LandingFooter
        locale={locale}
        sectionId={sectionIds.contact}
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
          { label: homeT("nav.about"), href: `/${locale}#about` },
          { label: homeT("nav.portfolio"), href: `/${locale}/portfolio` },
          { label: homeT("nav.franchises"), href: `/${locale}/franquias` },
          { label: homeT("nav.cases"), href: `/${locale}#cases` },
          { label: homeT("nav.feedback"), href: `/${locale}#feedback` },
          { label: homeT("nav.cta"), href: `/${locale}#cta` },
        ]}
      />
    </>
  );
}
