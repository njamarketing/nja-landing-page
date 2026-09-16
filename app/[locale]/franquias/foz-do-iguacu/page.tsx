import type { Metadata } from "next";
import FozDoIguacuHeadquarters from "@/components/franchises/FozDoIguacuHeadquarters";
import Header from "@/components/layout/Header";
import FounderPhotos from "@/components/franchises/FounderPhotos";
import Link from "next/link";
import LandingFooter from "@/components/landing/LandingFooter";
import SectionReveal from "@/components/landing/SectionReveal";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://njamarketing.com.br";
  const pageUrl = `${siteUrl}/${locale}/franquias/foz-do-iguacu`;
  const title = "Foz do Iguaçu | Sede matriz NJA";
  const description =
    "Conheça a sede matriz da NJA em Foz do Iguaçu, no Paraná, e Nelson Zeni Junior, fundador e CEO da empresa.";

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(
        routing.locales.map((availableLocale) => [
          availableLocale,
          `${siteUrl}/${availableLocale}/franquias/foz-do-iguacu`,
        ]),
      ),
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "NJA Marketing",
      locale,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function FozDoIguacuPage({ params }: PageProps) {
  const { locale } = await params;
  const homeT = await getTranslations({ locale, namespace: "HomePage" });

  return (
    <>
      <Header
        locale={locale}
        variant="landing"
        navItems={[
          { label: homeT("nav.home"), href: `/${locale}` },
          { label: homeT("nav.solutions"), href: `/${locale}#solutions` },
          { label: homeT("nav.websites"), href: `/${locale}/website-creation` },
          { label: homeT("nav.portfolio"), href: `/${locale}/portfolio` },
          { label: homeT("nav.about"), href: `/${locale}/about-us` },
          { label: homeT("nav.brand"), href: `/${locale}/marca` },
          { label: homeT("nav.franchises"), href: `/${locale}/franquias` },
          {
            label: homeT("nav.videoMomentum"),
            href: `/${locale}/video-momentum`,
          },
        ]}
        cta={{ label: homeT("nav.cta"), href: `/${locale}#contact` }}
      />

      <main
        id="main-content"
        className="relative min-h-screen overflow-x-clip bg-background text-foreground"
      >
        <div className="landing-grid-bg pointer-events-none absolute inset-0 opacity-35" />
        <div className="landing-orb landing-orb-top pointer-events-none" />
        <section
          id="nelson-zeni-junior"
          className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 sm:pt-40 md:pb-24"
        >
          <Link
            href={`/${locale}/franquias#foz-do-iguacu`}
            className="text-sm text-cyan-200 underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Voltar às franquias
          </Link>
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <SectionReveal>
              <div className="landing-pill">
                <span className="landing-pill-dot" />
                Sede matriz NJA no Paraná
              </div>
              <h1 className="mt-6 text-5xl font-bold leading-tight text-white md:text-7xl">
                Foz do <span className="landing-text-gradient">Iguaçu</span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/72">
                Conheça a sede onde a NJA nasceu e quem lidera essa história.
              </p>
              <h2 className="mt-8 text-3xl font-bold text-white">
                Nelson Zeni Junior
              </h2>
              <p className="mt-2 text-base font-medium text-cyan-200">
                Fundador e CEO da NJA
              </p>
              <p className="mt-6 text-xl leading-8 text-white/90">
                Estrategista de marketing e vendas, especialista em
                posicionamento, performance e geração de resultados.
              </p>
              <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
                Há mais de uma década, desenvolve estratégias de comunicação e
                crescimento para empresas de diversos segmentos, conectando
                posicionamento de marca aos objetivos de cada negócio.
              </p>
              <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
                Com ampla experiência em negociação e gestão de negócios no
                Brasil, na Argentina e no Paraguai, lidera projetos que unem
                visão estratégica, criatividade e foco em resultados.
              </p>
            </SectionReveal>
            <SectionReveal direction="right">
              <FounderPhotos
                name="Nelson Zeni Junior"
                photos={[
                  {
                    src: "/images/franquias/Nelson.webp",
                    alt: "Nelson Zeni Junior, fundador e CEO da NJA",
                    width: 788,
                    height: 1280,
                  },
                  {
                    src: "/images/franquias/Nelson-seat.webp",
                    alt: "Nelson Zeni Junior em retrato sentado",
                    width: 845,
                    height: 1280,
                  },
                ]}
              />
            </SectionReveal>
          </div>
        </section>
        <FozDoIguacuHeadquarters locale={locale} profile />
      </main>
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
        ]}
      />
    </>
  );
}
