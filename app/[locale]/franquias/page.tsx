import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import LandingCtaSection from "@/components/landing/LandingCtaSection";
import LandingFooter from "@/components/landing/LandingFooter";
import SectionReveal from "@/components/landing/SectionReveal";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nja.marketing";
  const pageUrl = `${siteUrl}/${locale}/franquias`;
  const title = "Franquias NJA | NJA Marketing";
  const description = "Conheça a expansão da NJA pelo Brasil e as oportunidades de franquia.";

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(
        routing.locales.map((availableLocale) => [
          availableLocale,
          `${siteUrl}/${availableLocale}/franquias`,
        ])
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

export default async function FranquiasPage({ params }: PageProps) {
  const { locale } = await params;
  const homeT = await getTranslations({ locale, namespace: "HomePage" });
  const ctaCards = (homeT.raw("hero.cards") as { label: string; image: string }[]).slice(0, 3);

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
        ]}
        cta={{ label: homeT("nav.cta"), href: `/${locale}#contact` }}
      />

      <main
        id="main-content"
        className="bg-background text-foreground relative min-h-screen overflow-x-clip"
      >
        <div className="landing-grid-bg pointer-events-none absolute inset-0 opacity-35" />
        <div className="landing-orb landing-orb-top pointer-events-none" />
        <div className="landing-orb landing-orb-left pointer-events-none opacity-50" />
        <div className="landing-orb landing-orb-right pointer-events-none opacity-50" />

        <section className="relative min-h-[660px] overflow-hidden px-4 pt-32 pb-20 sm:px-6 sm:pt-40 md:min-h-[760px] md:pb-32">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Vídeo de fundo da expansão da NJA pelo Brasil"
            className="absolute inset-y-0 right-0 h-full w-full object-cover object-right md:w-[72%] md:object-contain"
          >
            <source src="/videos/brazil-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#020916] via-[#020916]/88 to-[#020916]/8" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020916]/75 via-transparent to-[#020916]/12" />
          <SectionReveal className="relative mx-auto max-w-7xl pt-14 md:pt-20">
            <div className="max-w-3xl">
              <div className="landing-pill">
                <span className="landing-pill-dot" />
                Expansão NJA
              </div>
              <h1 className="mt-6 text-5xl leading-[0.98] font-bold text-white md:text-7xl">
                NJA <span className="landing-text-gradient">pelo Brasil</span>
              </h1>
              <p className="mt-7 text-xl leading-8 text-white/90 md:text-2xl">
                Uma metodologia consolidada. Novos mercados. Novas histórias.
              </p>
              <p className="mt-8 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
                A NJA está expandindo sua presença no território brasileiro por meio de unidades que
                levam nossa metodologia, experiência e visão estratégica para empresas de diferentes
                regiões do país.
              </p>
              <div className="mt-10 flex items-center gap-4 text-sm text-white/70">
                <span className="h-px w-12 bg-cyan-300" />
                Estratégia que conecta novos territórios.
              </div>
            </div>
          </SectionReveal>
        </section>

        <div className="relative">
          <div className="absolute top-0 bottom-16 left-7 w-px bg-gradient-to-b from-cyan-300/70 via-blue-500/35 to-transparent sm:left-12 md:left-1/2 md:-translate-x-1/2" />

          <section className="relative py-16 pr-4 pl-16 sm:py-20 sm:pr-6 sm:pl-24 md:py-24 md:pr-6 md:pl-6">
            <div className="absolute top-16 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200/60 bg-[#061221] font-mono text-[10px] text-cyan-100 shadow-[0_0_22px_rgba(62,229,250,0.45)] sm:left-8 md:left-1/2 md:-translate-x-1/2">
              01
            </div>
            <div className="landing-divider" />
            <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
              <SectionReveal
                className="landing-glass landing-panel rounded-[2rem] p-7 md:p-10"
                direction="left"
              >
                <p className="text-lg leading-8 text-white/78">
                  Cada nova franquia representa mais do que um novo endereço. Representa a chegada
                  de uma metodologia validada internacionalmente, aplicada por profissionais que
                  conhecem de perto os desafios e as oportunidades do mercado local.
                </p>
                <p className="mt-6 text-lg leading-8 text-white/78">
                  Nosso objetivo é construir uma rede cada vez mais forte, conectando estratégia,
                  conhecimento e execução para ajudar empresas brasileiras a crescerem de forma
                  consistente.
                </p>
              </SectionReveal>
              <SectionReveal
                className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/8 p-7 md:p-10"
                delay={0.12}
                direction="right"
              >
                <div className="landing-label">Nossa rede</div>
                <p className="font-display mt-4 text-3xl leading-tight text-white">
                  Conhecimento global, atuação local.
                </p>
                <p className="mt-5 leading-7 text-white/68">
                  Uma expansão construída para gerar impacto real em cada mercado onde a NJA chega.
                </p>
              </SectionReveal>
            </div>
          </section>

          <section className="relative py-20 pr-4 pl-16 sm:py-24 sm:pr-6 sm:pl-24 md:py-32 md:pr-6 md:pl-6">
            <div className="absolute top-20 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200/60 bg-[#061221] font-mono text-[10px] text-cyan-100 shadow-[0_0_22px_rgba(62,229,250,0.45)] sm:left-8 md:left-1/2 md:-translate-x-1/2">
              02
            </div>
            <div className="mx-auto max-w-7xl">
              <SectionReveal className="max-w-3xl md:max-w-[calc(50%-1.5rem)]">
                <div className="landing-pill">
                  <span className="landing-pill-dot landing-pill-dot-blue" />
                  Unidade em operação
                </div>
                <h2 className="mt-6 text-3xl leading-[1.08] font-bold text-white md:text-5xl">
                  Teixeira de Freitas, <span className="landing-text-gradient">Bahia</span>
                </h2>
                <p className="mt-5 text-xl text-white/82">
                  Uma operação que cresce junto com seus clientes
                </p>
              </SectionReveal>

              <div className="mt-12 grid gap-12 md:grid-cols-2">
                <SectionReveal
                  className="landing-glass rounded-[2rem] p-7 md:p-10"
                  direction="left"
                >
                  <p className="text-base leading-8 text-white/72 md:text-lg">
                    Implantada em <strong className="text-white">dezembro de 2025</strong>, a
                    unidade NJA de{" "}
                    <strong className="text-white">Teixeira de Freitas, na Bahia</strong>, nasceu
                    com o propósito de aproximar a metodologia NJA dos empresários da região.
                  </p>
                  <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
                    Sob a direção de <strong className="text-white">Igor Martins</strong>, a
                    franquia segue ampliando sua atuação e sua carteira de clientes, ajudando
                    empresas a identificarem oportunidades, estruturarem seus negócios e alcançarem
                    novos objetivos por meio de uma metodologia já validada no mercado
                    internacional.
                  </p>
                  <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
                    Em poucos meses de operação, a unidade passou a construir um portfólio formado
                    por empresas relevantes de diferentes segmentos, demonstrando a capacidade da
                    metodologia NJA de se adaptar às particularidades e necessidades de cada
                    negócio.
                  </p>
                </SectionReveal>
                <SectionReveal
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-7"
                  delay={0.12}
                  direction="right"
                >
                  <div className="relative -mx-2 -mt-2 mb-7 h-52 overflow-hidden rounded-[1.35rem] border border-white/10">
                    <Image
                      src="/images/franquias/teixeira-de-freitas.png"
                      alt="Profissionais em uma reunião estratégica de negócios"
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071321]/60 to-transparent" />
                  </div>
                  <div className="landing-label">Empresas atendidas</div>
                  <p className="font-display mt-5 text-2xl leading-tight text-white">
                    Empresas que já fazem parte dessa história
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/68">
                    Entre as empresas atendidas pela unidade de Teixeira de Freitas estão:
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {[
                      "Shopping Pátio Mix",
                      "X Agro",
                      "Cantina Tarantella",
                      "Texas BBQ e Sushi",
                      "Farmácia Vitalle",
                    ].map((company) => (
                      <span
                        key={company}
                        className="rounded-full border border-white/12 bg-white/6 px-3 py-2 text-sm text-white/80"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                  <p className="mt-7 text-sm leading-7 text-white/62">
                    Cada novo projeto fortalece a presença da NJA na região e reforça nosso
                    compromisso de gerar impacto real nos negócios que confiam em nossa metodologia.
                  </p>
                </SectionReveal>
              </div>
            </div>
          </section>

          <section className="relative py-20 pr-4 pl-16 sm:py-24 sm:pr-6 sm:pl-24 md:py-32 md:pr-6 md:pl-6">
            <div className="absolute top-20 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-blue-300/60 bg-[#061221] font-mono text-[10px] text-blue-100 shadow-[0_0_22px_rgba(35,91,215,0.45)] sm:left-8 md:left-1/2 md:-translate-x-1/2">
              03
            </div>
            <div className="landing-divider landing-divider-blue" />
            <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
              <SectionReveal className="flex min-h-72 flex-col justify-end rounded-[2rem] border border-white/10 bg-white/4 p-8 md:p-10">
                <div className="landing-label">Próxima parada</div>
                <div className="font-display mt-5 text-6xl text-cyan-200">03</div>
                <p className="mt-5 text-xl text-white/85">A expansão continua</p>
                <p className="mt-3 max-w-sm text-sm leading-7 text-white/62">
                  Uma nova unidade para ampliar a presença da NJA na região Sul.
                </p>
              </SectionReveal>
              <SectionReveal
                className="rounded-[2rem] border border-blue-400/25 bg-gradient-to-br from-blue-500/20 via-slate-950/65 to-cyan-300/10 p-8 md:p-10"
                delay={0.12}
                direction="right"
              >
                <div className="landing-label">Próxima parada</div>
                <h2 className="mt-5 text-4xl leading-[1.05] font-bold text-white md:text-6xl">
                  Cascavel, <span className="landing-text-gradient">Paraná</span>
                </h2>
                <p className="mt-5 text-xl text-white/85">A expansão continua</p>
                <p className="mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
                  O movimento de expansão da NJA pelo Brasil não para.{" "}
                  <strong className="text-white">
                    Em breve, Cascavel receberá uma nova unidade NJA
                  </strong>
                  , levando nossa metodologia para um dos principais polos econômicos do Paraná e
                  ampliando nossa presença na região Sul do país.
                </p>
                <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
                  A nova franquia fará parte de uma rede construída para unir conhecimento global e
                  atuação local, criando novas oportunidades para empresários e empresas da região.
                </p>
                <p className="font-display mt-8 text-2xl text-cyan-200">
                  Cascavel, Paraná — Em breve.
                </p>
              </SectionReveal>
            </div>
          </section>
        </div>

        <LandingCtaSection
          sectionId="cta"
          badge="Expansão de franquias"
          titleBefore="Leve a metodologia NJA"
          titleHighlight="para o seu território"
          titleAfter=""
          description="Buscamos parceiros que compartilhem da nossa visão e queiram construir uma operação relevante, levando estratégia, conhecimento e execução para empresas da sua região."
          buttonLabel="Quero ser um franqueado NJA"
          contactHref={`https://wa.me/${homeT("footer.phone").replace(/\D/g, "")}`}
          cards={ctaCards}
        />
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
