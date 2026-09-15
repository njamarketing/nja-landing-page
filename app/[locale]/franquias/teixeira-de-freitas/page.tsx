import type { Metadata } from "next";
import TeixeiraDeFreitasFranchise from "@/components/franchises/TeixeiraDeFreitasFranchise";
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nja.marketing";
  const pageUrl = `${siteUrl}/${locale}/franquias/teixeira-de-freitas`;
  const title = "Teixeira de Freitas | Franquia NJA";
  const description =
    "Conheça Igor Martins, sócio da NJA Consultoria & Marketing e responsável pela unidade de Teixeira de Freitas, na Bahia.";

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(
        routing.locales.map((availableLocale) => [
          availableLocale,
          `${siteUrl}/${availableLocale}/franquias/teixeira-de-freitas`,
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

export default async function TeixeiraDeFreitasPage({ params }: PageProps) {
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
          id="igor-martins"
          className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 sm:pt-40 md:pb-24"
        >
          <Link
            href={`/${locale}/franquias#teixeira-de-freitas`}
            className="text-sm text-cyan-200 underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Voltar às franquias
          </Link>
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <SectionReveal>
              <div className="landing-pill">
                <span className="landing-pill-dot" />
                Franquia NJA na Bahia
              </div>
              <h1 className="mt-6 text-5xl font-bold leading-tight text-white md:text-7xl">
                Teixeira{" "}
                <span className="landing-text-gradient">de Freitas</span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/72">
                Conheça a unidade e quem lidera a atuação da NJA na região.
              </p>
              <h2 className="mt-8 text-3xl font-bold text-white">
                Igor Martins
              </h2>
              <p className="mt-2 text-base font-medium text-cyan-200">
                Sócio e responsável pela franquia de Teixeira de Freitas
              </p>
              <p className="mt-6 text-xl leading-8 text-white/90">
                Sócio da NJA Consultoria &amp; Marketing e especialista em
                gestão de processos, posicionamento e crescimento orgânico de
                marcas.
              </p>
              <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
                Atua na organização de processos e no desenvolvimento
                estratégico de negócios, com foco em fortalecer a presença das
                empresas no mercado e direcionar seu crescimento.
              </p>
              <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
                À frente da operação da NJA em Teixeira de Freitas, lidera
                estratégias e ações voltadas ao desenvolvimento das marcas na
                região, unindo organização, visão estratégica e foco em
                resultados consistentes.
              </p>
            </SectionReveal>
            <SectionReveal direction="right">
              <FounderPhotos />
            </SectionReveal>
          </div>
        </section>
        <TeixeiraDeFreitasFranchise locale={locale} profile />
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
