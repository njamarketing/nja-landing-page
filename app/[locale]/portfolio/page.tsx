import AudioVisualShowcase from "@/components/landing/AudioVisualShowcase";
import LandingCtaSection from "@/components/landing/LandingCtaSection";
import LandingFooter from "@/components/landing/LandingFooter";
import PortfolioFeaturedCarousel from "@/components/landing/PortfolioFeaturedCarousel";
import PortfolioHeroSection from "@/components/landing/PortfolioHeroSection";
import SectionReveal from "@/components/landing/SectionReveal";
import VisualShowcaseScroll from "@/components/landing/VisualShowcaseScroll";
import Header from "@/components/layout/Header";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type PortfolioPageProps = {
  params: Promise<{ locale: string }>;
};

type HeroCard = {
  label: string;
  image: string;
};

type PortfolioProject = {
  category: string;
  title: string;
  description: string;
  services: string[];
  highlight: string;
  highlightLabel: string;
  image: string;
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

const sectionIds = {
  top: "top",
  showcase: "showcase",
  featured: "featured",
  grid: "grid",
  cta: "cta",
  contact: "contact",
} as const;

const audioVisualCopy = {
  pt: {
    badge: "Audio Visual",
    title: "Video Momentum",
    description:
      "Uma produtora de vídeos que reúne o que há de mais moderno no mercado para entregar conteúdo de alta qualidade à sua publicidade. Conte com a NJA para levar esse movimento ao mercado global.",
    supportText: "Atendemos no Brasil e no exterior, com suporte disponível para você.",
    videos: [
      { id: "TyFbNA84sp4", title: "Video Momentum 01", label: "Produção audiovisual" },
      { id: "-XUmDegHh-I", title: "Video Momentum 02", label: "Conteúdo em movimento" },
      { id: "7Q2LZddHA0k", title: "Video Momentum 03", label: "Campanhas que marcam" },
    ],
  },
  en: {
    badge: "Audio Visual",
    title: "Video Momentum",
    description:
      "A video production service that brings modern market standards to create high-quality content for your advertising.",
    supportText: "We serve clients in Brazil and abroad, with support available to you.",
    videos: [
      { id: "TyFbNA84sp4", title: "Video Momentum 01", label: "Audiovisual production" },
      { id: "-XUmDegHh-I", title: "Video Momentum 02", label: "Motion content" },
      { id: "7Q2LZddHA0k", title: "Video Momentum 03", label: "Memorable campaigns" },
    ],
  },
  es: {
    badge: "Audiovisual",
    title: "Video Momentum",
    description:
      "Una productora de videos que reúne lo más moderno del mercado para crear contenido de alta calidad para tu publicidad.",
    supportText: "Atendemos en Brasil y en el exterior, con soporte disponible para ti.",
    videos: [
      { id: "TyFbNA84sp4", title: "Video Momentum 01", label: "Producción audiovisual" },
      { id: "-XUmDegHh-I", title: "Video Momentum 02", label: "Contenido en movimiento" },
      { id: "7Q2LZddHA0k", title: "Video Momentum 03", label: "Campañas memorables" },
    ],
  },
} as const;

const feedbackProfileSeeds = [
  { name: "Marina Costa", company: "Studio Nexo" },
  { name: "Lucas Almeida", company: "Vertice Tech" },
  { name: "Camila Rocha", company: "Casa Aurora" },
  { name: "Rafael Mendes", company: "Atlas Engenharia" },
  { name: "Juliana Freitas", company: "Clinica Prisma" },
  { name: "Thiago Lima", company: "Grupo Cais" },
  { name: "Beatriz Moura", company: "Orla Fashion" },
  { name: "Guilherme Santos", company: "Nova Safra" },
] as const;

const brandNarratives = {
  pt: {
    title: "Por que devo criar uma marca?",
    benefitsTitle: "Impacto de uma marca forte",
    benefitsDescription:
      "Quando cada ponto de contato é coerente, sua marca conquista espaço na mente e na escolha do cliente.",
    description:
      "Marca é estratégia: diferencia seu negócio, gera confiança e faz sua empresa ser lembrada.",
    benefits: [
      "Diferencia sua empresa",
      "Gera confiança e fidelidade",
      "Fortalece o reconhecimento",
      "Valoriza o marketing e o negócio",
    ],
    pillars: [
      {
        title: "Exclusividade",
        heading: "Tenha uma marca só sua!",
        description: "Uma proposta única, difícil de copiar e fácil de reconhecer.",
      },
      {
        title: "Autenticidade",
        heading: "Genuína e verdadeira",
        description: "Coerência entre o que a sua marca diz, faz e entrega.",
      },
      {
        title: "Segurança",
        heading: "Dê tranquilidade ao seu cliente",
        description: "Confiança em cada ponto de contato com a sua empresa.",
      },
    ],
    materialsTitle: "Material incluso",
    materialsDescription:
      "Além do logotipo, entregamos os materiais essenciais para aplicar sua marca.",
    materialsLabel: "Materiais para gráfica, como:",
    materials: [
      "Manual de utilização da marca",
      "Papel timbrado",
      "Envelopes",
      "Cartão de visitas",
      "Assinatura de e-mail",
      "Apresentação corporativa",
    ],
  },
  en: {
    title: "Why should I build a brand?",
    benefitsTitle: "The impact of a strong brand",
    benefitsDescription:
      "When every touchpoint is consistent, your brand earns a place in customers' minds and choices.",
    description:
      "A brand is more than a small logo. It creates a presence that supports your decisions, reputation and business growth.",
    benefits: [
      "Market differentiation",
      "Customer loyalty and trust",
      "Attracting and retaining talent",
      "Brand recognition and recall",
      "Greater business value",
      "More effective marketing and advertising",
    ],
    pillars: [
      {
        title: "Exclusivity",
        heading: "A brand that is uniquely yours",
        description:
          "Offer something distinctive through differentiated services, personalized experiences or a premium market position.",
      },
      {
        title: "Authenticity",
        heading: "Genuine and true",
        description:
          "Be faithful to your values, mission and identity with transparent, consistent communication.",
      },
      {
        title: "Security",
        heading: "Give your customers confidence",
        description:
          "Build trust in reliable products and services while protecting customer data and privacy.",
      },
    ],
    materialsTitle: "Included materials",
    materialsDescription:
      "We deliver more than a logo: the materials your company needs throughout its journey.",
    materialsLabel: "Print and business materials, including:",
    materials: [
      "Brand usage guide",
      "Letterhead",
      "Envelopes",
      "Business cards",
      "Email signature",
      "Corporate presentation",
    ],
  },
  es: {
    title: "¿Por qué crear una marca?",
    benefitsTitle: "El impacto de una marca sólida",
    benefitsDescription:
      "Cuando cada punto de contacto es coherente, tu marca gana espacio en la mente y la elección de los clientes.",
    description:
      "Una marca es mucho más que un logo pequeño. Construye una presencia que respalda las decisiones, la reputación y el crecimiento del negocio.",
    benefits: [
      "Diferenciación en el mercado",
      "Fidelidad y confianza del cliente",
      "Atracción y retención de talento",
      "Reconocimiento y memoria de marca",
      "Mayor valor para el negocio",
      "Marketing y publicidad más eficaces",
    ],
    pillars: [
      {
        title: "Exclusividad",
        heading: "Una marca solo tuya",
        description:
          "Ofrece algo único mediante servicios diferenciados, experiencias personalizadas o un posicionamiento premium.",
      },
      {
        title: "Autenticidad",
        heading: "Genuina y verdadera",
        description:
          "Sé fiel a tus valores, misión e identidad con una comunicación transparente y coherente.",
      },
      {
        title: "Seguridad",
        heading: "Da tranquilidad a tus clientes",
        description:
          "Genera confianza con productos y servicios fiables y protege los datos y la privacidad de tus clientes.",
      },
    ],
    materialsTitle: "Material incluido",
    materialsDescription:
      "Entregamos más que un logotipo: los materiales que la empresa necesita durante su trayectoria.",
    materialsLabel: "Materiales para impresión y negocio, como:",
    materials: [
      "Manual de uso de marca",
      "Papel membretado",
      "Sobres",
      "Tarjetas de presentación",
      "Firma de correo",
      "Presentación corporativa",
    ],
  },
} as const;

const portfolioCopy = {
  pt: {
    seoTitle: "Portfólio | NJA Consultoria e Marketing",
    seoDescription:
      "Conheça a estrutura do portfólio da NJA, com projetos em destaque, frentes de atuação e espaço preparado para receber cases completos.",
    heroBadge: "Portfólio NJA",
    heroTitleBefore: "Projetos pensados para",
    heroTitleHighlight: "posicionamento, presença",
    heroTitleAfter: "e crescimento",
    heroDescription:
      "Uma tela institucional para reunir direção criativa, estratégia e execução em um só lugar. Aqui, a NJA pode apresentar trabalhos, recortes visuais e resultados com mais contexto.",
    heroStats: [
      { value: "360", label: "visão estratégica" },
      { value: "+500", label: "clientes atendidos" },
      { value: "9 anos", label: "de mercado" },
    ],
    featuredBadge: "Projeto em destaque",
    featuredTitle:
      "Estrutura pronta para contar o que foi feito, por que foi feito e o impacto gerado.",
    featuredDescription:
      "O bloco principal abre espaço para narrar um case com clareza: contexto, frente de atuação, entregas e um resultado central que sustenta a percepção de valor do projeto.",
    featuredResultLabel: "Resultado em foco",
    gridBadge: "Seleção de trabalhos",
    gridTitle: "Uma base flexível para organizar cases por objetivo, canal ou momento da marca.",
    gridDescription:
      "A grade pode receber projetos completos, recortes editoriais, campanhas, branding, tráfego, SEO e outras frentes que ajudem a mostrar profundidade de atuação.",
    servicesLabel: "Frentes do projeto",
    viewLabel: "Em breve",
  },
  en: {
    seoTitle: "Portfolio | NJA Consulting and Marketing",
    seoDescription:
      "Explore NJA's portfolio structure with featured work, service tracks and a flexible layout ready for full case studies.",
    heroBadge: "NJA Portfolio",
    heroTitleBefore: "Projects built for",
    heroTitleHighlight: "positioning, presence",
    heroTitleAfter: "and growth",
    heroDescription:
      "An institutional page designed to gather creative direction, strategy and execution in one place. NJA can use it to present selected work, visual cuts and outcomes with stronger context.",
    heroStats: [
      { value: "360", label: "strategic view" },
      { value: "+500", label: "clients served" },
      { value: "9 years", label: "in the market" },
    ],
    featuredBadge: "Featured project",
    featuredTitle:
      "A structure ready to explain what was done, why it mattered and the impact it created.",
    featuredDescription:
      "The main block gives room to tell a case study with clarity: context, scope, deliveries and one core result that reinforces the project's value.",
    featuredResultLabel: "Core outcome",
    gridBadge: "Selected work",
    gridTitle: "A flexible base for organizing projects by objective, channel or brand moment.",
    gridDescription:
      "The grid can hold full case studies, editorial crops, campaigns, branding, paid media, SEO and other fronts that help show the depth of NJA's work.",
    servicesLabel: "Project tracks",
    viewLabel: "Coming soon",
  },
  es: {
    seoTitle: "Portafolio | NJA Consultoría y Marketing",
    seoDescription:
      "Conoce la estructura del portafolio de NJA con proyectos destacados, frentes de trabajo y un layout listo para casos completos.",
    heroBadge: "Portafolio NJA",
    heroTitleBefore: "Proyectos pensados para",
    heroTitleHighlight: "posicionamiento, presencia",
    heroTitleAfter: "y crecimiento",
    heroDescription:
      "Una página institucional para reunir dirección creativa, estrategia y ejecución en un solo lugar. Aquí, NJA puede presentar trabajos, recortes visuales y resultados con más contexto.",
    heroStats: [
      { value: "360", label: "visión estratégica" },
      { value: "+500", label: "clientes atendidos" },
      { value: "9 años", label: "de mercado" },
    ],
    featuredBadge: "Proyecto destacado",
    featuredTitle:
      "Una estructura lista para contar qué se hizo, por qué se hizo y el impacto generado.",
    featuredDescription:
      "El bloque principal abre espacio para narrar un caso con claridad: contexto, alcance, entregables y un resultado central que sostiene la percepción de valor del proyecto.",
    featuredResultLabel: "Resultado clave",
    gridBadge: "Selección de trabajos",
    gridTitle: "Una base flexible para organizar casos por objetivo, canal o momento de marca.",
    gridDescription:
      "La grilla puede recibir casos completos, recortes editoriales, campañas, branding, tráfico, SEO y otros frentes que ayuden a mostrar profundidad de actuación.",
    servicesLabel: "Frentes del proyecto",
    viewLabel: "Próximamente",
  },
} as const;

const portfolioProjects = {
  pt: [
    {
      category: "Presença local",
      title: "Google Maps e autoridade regional",
      description:
        "Estrutura pensada para apresentar otimização local, reputação, visibilidade e geração de contatos com foco em negócios que dependem de tração regional.",
      services: ["Google Maps", "Reputação", "Mídia local"],
      highlight: "+visibilidade e intenção de contato",
      highlightLabel: "Leitura principal",
      image: "/images/landing/hero-maps.webp",
    },
    {
      category: "Aquisição",
      title: "Campanhas para leads e vendas",
      description:
        "Bloco preparado para reunir campanhas de Google Ads e Meta Ads com narrativa mais comercial, enfatizando captação, velocidade e previsibilidade.",
      services: ["Google Ads", "Meta Ads", "Landing pages"],
      highlight: "performance orientada a conversão",
      highlightLabel: "Abordagem",
      image: "/images/landing/hero-google-ads.jpg",
    },
    {
      category: "Marca",
      title: "Branding com clareza de posicionamento",
      description:
        "Espaço para contar projetos de identidade, direção visual e construção de mensagem com foco em percepção de valor e diferenciação.",
      services: ["Branding", "Mensagem", "Direção visual"],
      highlight: "coerência estética e verbal",
      highlightLabel: "Entregável central",
      image: "/images/landing/hero-branding.webp",
    },
    {
      category: "Conteúdo",
      title: "Presença digital e consistência editorial",
      description:
        "Card preparado para mostrar frentes de conteúdo, social media e desdobramentos visuais em uma leitura mais institucional.",
      services: ["Social Media", "Conteúdo", "Planejamento"],
      highlight: "ritmo de presença e autoridade",
      highlightLabel: "Objetivo",
      image: "/images/landing/hero-social.jpg",
    },
    {
      category: "Orgânico",
      title: "Crescimento via SEO e arquitetura de busca",
      description:
        "Estrutura ideal para detalhar melhorias técnicas, conteúdo e ganho de relevância para quem quer gerar demanda contínua.",
      services: ["SEO", "Conteúdo", "Site"],
      highlight: "tráfego qualificado no longo prazo",
      highlightLabel: "Gancho estratégico",
      image: "/images/landing/hero-seo.webp",
    },
    {
      category: "Consultoria",
      title: "Diagnóstico e direção para decisões melhores",
      description:
        "Espaço para apresentar análises, reestruturações e projetos em que a NJA entra para organizar prioridades e alinhar operação com crescimento.",
      services: ["Consultoria", "Planejamento", "Integração"],
      highlight: "clareza para evoluir a operação",
      highlightLabel: "Valor percebido",
      image: "/images/landing/hero-consulting.webp",
    },
  ],
  en: [
    {
      category: "Local presence",
      title: "Google Maps and regional authority",
      description:
        "A structure built to present local optimization, reputation, visibility and contact generation for businesses that rely on regional traction.",
      services: ["Google Maps", "Reputation", "Local media"],
      highlight: "visibility and contact intent",
      highlightLabel: "Main angle",
      image: "/images/landing/hero-maps.webp",
    },
    {
      category: "Acquisition",
      title: "Campaigns for leads and sales",
      description:
        "Prepared to gather Google Ads and Meta Ads projects with a stronger commercial narrative around speed, conversion and predictability.",
      services: ["Google Ads", "Meta Ads", "Landing pages"],
      highlight: "conversion-oriented performance",
      highlightLabel: "Approach",
      image: "/images/landing/hero-google-ads.jpg",
    },
    {
      category: "Brand",
      title: "Branding with sharper positioning",
      description:
        "Space to present identity, visual direction and messaging work focused on perceived value and differentiation.",
      services: ["Branding", "Messaging", "Visual direction"],
      highlight: "visual and verbal consistency",
      highlightLabel: "Core delivery",
      image: "/images/landing/hero-branding.webp",
    },
    {
      category: "Content",
      title: "Digital presence and editorial consistency",
      description:
        "A card ready to show content, social media and visual unfoldings through a stronger institutional lens.",
      services: ["Social Media", "Content", "Planning"],
      highlight: "presence and authority rhythm",
      highlightLabel: "Goal",
      image: "/images/landing/hero-social.jpg",
    },
    {
      category: "Organic growth",
      title: "SEO and search architecture",
      description:
        "Ideal for detailing technical improvements, content work and relevance gains for brands that want ongoing demand.",
      services: ["SEO", "Content", "Website"],
      highlight: "qualified long-term traffic",
      highlightLabel: "Strategic hook",
      image: "/images/landing/hero-seo.webp",
    },
    {
      category: "Consulting",
      title: "Diagnosis and direction for better decisions",
      description:
        "A section to present analyses, restructures and projects where NJA organizes priorities and aligns operations with growth.",
      services: ["Consulting", "Planning", "Integration"],
      highlight: "clarity for operational growth",
      highlightLabel: "Perceived value",
      image: "/images/landing/hero-consulting.webp",
    },
  ],
  es: [
    {
      category: "Presencia local",
      title: "Google Maps y autoridad regional",
      description:
        "Estructura pensada para presentar optimización local, reputación, visibilidad y generación de contactos para negocios que dependen del alcance regional.",
      services: ["Google Maps", "Reputación", "Medios locales"],
      highlight: "visibilidad e intención de contacto",
      highlightLabel: "Lectura principal",
      image: "/images/landing/hero-maps.webp",
    },
    {
      category: "Adquisición",
      title: "Campañas para leads y ventas",
      description:
        "Bloque preparado para reunir campañas de Google Ads y Meta Ads con una narrativa más comercial sobre velocidad, conversión y previsibilidad.",
      services: ["Google Ads", "Meta Ads", "Landing pages"],
      highlight: "performance orientado a conversión",
      highlightLabel: "Enfoque",
      image: "/images/landing/hero-google-ads.jpg",
    },
    {
      category: "Marca",
      title: "Branding con claridad de posicionamiento",
      description:
        "Espacio para contar proyectos de identidad, dirección visual y construcción de mensaje con foco en percepción de valor y diferenciación.",
      services: ["Branding", "Mensaje", "Dirección visual"],
      highlight: "coherencia estética y verbal",
      highlightLabel: "Entrega central",
      image: "/images/landing/hero-branding.webp",
    },
    {
      category: "Contenido",
      title: "Presencia digital y consistencia editorial",
      description:
        "Card preparado para mostrar contenido, social media y despliegues visuales en una lectura más institucional.",
      services: ["Social Media", "Contenido", "Planificación"],
      highlight: "ritmo de presencia y autoridad",
      highlightLabel: "Objetivo",
      image: "/images/landing/hero-social.jpg",
    },
    {
      category: "Orgánico",
      title: "Crecimiento vía SEO y arquitectura de búsqueda",
      description:
        "Estructura ideal para detallar mejoras técnicas, contenido y ganancia de relevancia para marcas que buscan demanda continua.",
      services: ["SEO", "Contenido", "Sitio web"],
      highlight: "tráfico calificado a largo plazo",
      highlightLabel: "Gancho estratégico",
      image: "/images/landing/hero-seo.webp",
    },
    {
      category: "Consultoría",
      title: "Diagnóstico y dirección para mejores decisiones",
      description:
        "Espacio para presentar análisis, reestructuraciones y proyectos donde NJA organiza prioridades y alinea la operación con el crecimiento.",
      services: ["Consultoría", "Planificación", "Integración"],
      highlight: "claridad para evolucionar la operación",
      highlightLabel: "Valor percibido",
      image: "/images/landing/hero-consulting.webp",
    },
  ],
} as const;

export async function generateMetadata({ params }: PortfolioPageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = portfolioCopy[locale as keyof typeof portfolioCopy] ?? portfolioCopy.pt;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nja.marketing";
  const pageUrl = `${siteUrl}/${locale}/portfolio`;
  const languages = Object.fromEntries(
    routing.locales.map((availableLocale) => [
      availableLocale,
      `${siteUrl}/${availableLocale}/portfolio`,
    ])
  );

  return {
    title: copy.seoTitle,
    description: copy.seoDescription,
    alternates: {
      canonical: pageUrl,
      languages,
    },
    openGraph: {
      title: copy.seoTitle,
      description: copy.seoDescription,
      url: pageUrl,
      siteName: "NJA Marketing",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.seoTitle,
      description: copy.seoDescription,
    },
  };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { locale } = await params;
  const copy = portfolioCopy[locale as keyof typeof portfolioCopy] ?? portfolioCopy.pt;
  const projects: PortfolioProject[] =
    portfolioProjects[locale as keyof typeof portfolioProjects] ?? portfolioProjects.pt;
  const homeT = await getTranslations({ locale, namespace: "HomePage" });
  const heroCards = homeT.raw("hero.cards") as HeroCard[];
  const feedbacks = homeT.raw("feedback.items") as FeedbackItem[];
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
  const ctaCards = heroCards.slice(0, 3).map(({ label, image }) => ({ label, image }));
  const brandNarrative =
    brandNarratives[locale as keyof typeof brandNarratives] ?? brandNarratives.pt;
  const audioVisual = audioVisualCopy[locale as keyof typeof audioVisualCopy] ?? audioVisualCopy.pt;
  const brandShowcaseSlides = [
    {
      category: "Identidade de marca",
      title: "JNL Turismo Receptivo",
      description:
        "Uma marca criada para transmitir presença, confiança e uma experiência memorável desde o primeiro contato.",
      image: "/images/logomarks/client-01.webp",
    },
    {
      category: "Identidade de marca",
      title: "Garra Atacadista",
      description:
        "Uma identidade criada para comunicar força, escala e presença no segmento atacadista.",
      image: "/images/logomarks/client-02.webp",
    },
    {
      category: "Identidade de marca",
      title: "Doce Romã",
      description:
        "Uma identidade criada para comunicar qualidade, autoridade e presença no segmento gastronomico.",
      image: "/images/logomarks/client-03.webp",
    },
    ...projects,
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
          { label: homeT("nav.feedback"), href: `/${locale}#feedback` },
        ]}
        cta={{ label: homeT("nav.cta"), href: `/${locale}#cta` }}
      />

      <main
        id="main-content"
        className="bg-background text-foreground relative min-h-screen max-w-full overflow-x-clip"
      >
        <PortfolioHeroSection
          titleBefore={copy.heroTitleBefore}
          titleHighlight={copy.heroTitleHighlight}
          titleAfter={copy.heroTitleAfter}
          description={copy.heroDescription}
          stats={copy.heroStats}
          cards={heroCards}
          showcaseId={sectionIds.showcase}
        />

        <div id={sectionIds.showcase} className="relative">
          <VisualShowcaseScroll rows={visualShowcaseRows} />
        </div>

        <section
          id={sectionIds.featured}
          aria-labelledby="featured-project-title"
          className="relative px-4 py-24 sm:px-6 md:py-32"
        >
          <div className="landing-divider" />
          <div className="mx-auto max-w-7xl">
            <SectionReveal className="max-w-3xl">
              <div className="landing-pill">
                <span className="landing-pill-dot landing-pill-dot-blue" />
                {copy.featuredBadge}
              </div>
              <h2
                id="featured-project-title"
                className="mt-6 text-3xl leading-[1.08] font-bold text-white md:text-5xl"
              >
                {brandNarrative.title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/68">{brandNarrative.description}</p>
            </SectionReveal>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {brandNarrative.pillars.map((pillar, index) => (
                <SectionReveal
                  key={pillar.title}
                  className="rounded-[1.5rem] border border-white/10 bg-white/4 p-6"
                  delay={0.08 + index * 0.08}
                  distance={20}
                >
                  <div className="landing-label">{pillar.title}</div>
                  <h3 className="mt-3 text-lg font-semibold text-white">{pillar.heading}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/64">{pillar.description}</p>
                </SectionReveal>
              ))}
            </div>

            <div className="mt-14 grid items-start gap-12 lg:grid-cols-12">
              <SectionReveal className="lg:col-span-5" direction="left">
                <div className="landing-label">{brandNarrative.benefitsTitle}</div>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/64">
                  {brandNarrative.benefitsDescription}
                </p>
                <ul
                  className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
                  aria-label={brandNarrative.title}
                >
                  {brandNarrative.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3 text-sm leading-6 text-white/70">
                      <span className="bg-brand-cyan mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </SectionReveal>

              <SectionReveal className="relative lg:col-span-7" delay={0.12} direction="right">
                <PortfolioFeaturedCarousel slides={brandShowcaseSlides} />
              </SectionReveal>
            </div>
          </div>
        </section>

        <div id={sectionIds.grid}>
          <AudioVisualShowcase {...audioVisual} />
        </div>

        <LandingCtaSection
          sectionId={sectionIds.cta}
          badge={homeT("cta.badge")}
          titleBefore={homeT("cta.titleBefore")}
          titleHighlight={homeT("cta.titleHighlight")}
          titleAfter={homeT("cta.titleAfter")}
          description={homeT("cta.description")}
          buttonLabel={homeT("cta.button")}
          contactHref={`/${locale}#${sectionIds.contact}`}
          cards={ctaCards}
        />

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
            { label: homeT("nav.about"), href: `/${locale}/about-us` },
            { label: homeT("nav.portfolio"), href: `/${locale}/portfolio` },
            { label: homeT("nav.feedback"), href: `/${locale}#feedback` },
            { label: homeT("nav.cta"), href: `/${locale}#cta` },
          ]}
        />
      </main>
    </>
  );
}
