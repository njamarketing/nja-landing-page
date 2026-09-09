import BrandShowcase from "@/components/landing/BrandShowcase";
import ServiceLandingPage from "@/components/landing/ServiceLandingPage";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const pageCopy = {
  pt: {
    seoTitle: "Criação de Marca | NJA Marketing",
    seoDescription: "Identidade de marca estratégica para empresas que querem ser lembradas.",
    hero: {
      titleBefore: "Criamos marcas que",
      titleHighlight: "ocupam espaço",
      titleAfter: "na mente e no mercado.",
      description:
        "Transformamos visão, estratégia e identidade em marcas que geram reconhecimento, confiança e valor para o seu negócio.",
      stats: [
        { value: "01", label: "estratégia antes do traço" },
        { value: "360°", label: "identidade completa" },
        { value: "100%", label: "autenticidade" },
      ],
      actionLabel: "Conhecer a marca",
    },
    overview: {
      badge: "Branding NJA",
      title: "Uma marca com direção, personalidade e propósito.",
      description:
        "Da essência à aplicação, cada escolha constrói uma presença consistente para sua empresa ser escolhida e lembrada.",
      points: [
        "Diagnóstico e posicionamento para definir o território da marca.",
        "Identidade visual que traduz o que torna sua empresa única.",
        "Sistema de comunicação pronto para crescer com o negócio.",
        "Materiais essenciais para aplicar a marca com consistência.",
      ],
    },
  },
  en: {
    seoTitle: "Brand Creation | NJA Marketing",
    seoDescription: "Strategic brand identity for companies that want to be remembered.",
    hero: {
      titleBefore: "We create brands that",
      titleHighlight: "take their place",
      titleAfter: "in minds and markets.",
      description:
        "We turn vision, strategy and identity into brands that build recognition, trust and value.",
      stats: [
        { value: "01", label: "strategy before design" },
        { value: "360°", label: "complete identity" },
        { value: "100%", label: "authenticity" },
      ],
      actionLabel: "Discover branding",
    },
    overview: {
      badge: "NJA Branding",
      title: "A brand with direction, personality and purpose.",
      description:
        "From essence to application, every choice creates a consistent presence that gets remembered.",
      points: [
        "Positioning diagnosis.",
        "A unique visual identity.",
        "A scalable communication system.",
        "Essential brand materials.",
      ],
    },
  },
  es: {
    seoTitle: "Creación de Marca | NJA Marketing",
    seoDescription: "Identidad de marca estratégica para empresas que quieren ser recordadas.",
    hero: {
      titleBefore: "Creamos marcas que",
      titleHighlight: "ocupan espacio",
      titleAfter: "en la mente y en el mercado.",
      description:
        "Convertimos visión, estrategia e identidad en marcas que generan reconocimiento, confianza y valor.",
      stats: [
        { value: "01", label: "estrategia antes del diseño" },
        { value: "360°", label: "identidad completa" },
        { value: "100%", label: "autenticidad" },
      ],
      actionLabel: "Conocer la marca",
    },
    overview: {
      badge: "Branding NJA",
      title: "Una marca con dirección, personalidad y propósito.",
      description:
        "De la esencia a la aplicación, cada elección construye una presencia coherente y memorable.",
      points: [
        "Diagnóstico de posicionamiento.",
        "Identidad visual única.",
        "Sistema de comunicación escalable.",
        "Materiales esenciales de marca.",
      ],
    },
  },
} as const;

const brandShowcaseCopy = {
  pt: {
    title: "Por que devo criar uma marca?",
    description:
      "Marca é estratégia: diferencia seu negócio, gera confiança e faz sua empresa ser lembrada.",
    benefitsTitle: "Impacto de uma marca forte",
    benefitsDescription:
      "Quando cada ponto de contato é coerente, sua marca conquista espaço na mente e na escolha do cliente.",
    benefits: [
      "Diferencia sua empresa",
      "Gera confiança e fidelidade",
      "Fortalece o reconhecimento",
      "Valoriza o marketing e o negócio",
    ],
    pillars: [
      {
        title: "Exclusividade",
        heading: "Tenha uma marca só sua",
        description: "Uma proposta única, difícil de copiar e fácil de reconhecer.",
      },
      {
        title: "Autenticidade",
        heading: "Genuína e verdadeira",
        description: "Coerência entre o que a sua marca diz, faz e entrega.",
      },
      {
        title: "Segurança",
        heading: "Dê tranquilidade",
        description: "Confiança em cada ponto de contato com a sua empresa.",
      },
    ],
    slides: [
      {
        category: "Identidade de marca",
        title: "JNL Turismo Receptivo",
        description:
          "Uma marca criada para transmitir presença, confiança e uma experiência memorável.",
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
      {
        category: "Identidade de marca",
        title: "Munck Castelli",
        description:
          "Uma identidade criada para comunicar força, tradição e experiência de mercado.",
        image: "/images/logomarks/client-04.webp",
      },
      {
        category: "Identidade de marca",
        title: "Desafio",
        description: "Uma identidade criada para comunicar simplicidade, praticidade e qualidade.",
        image: "/images/logomarks/client-05.webp",
      },
      {
        category: "Branding",
        title: "Identidade que ganha espaço",
        description: "Sistemas visuais pensados para criar reconhecimento em cada contato.",
        image: "/images/landing/hero-branding.webp",
      },
      {
        category: "Estratégia",
        title: "Posicionamento com propósito",
        description: "Direção para comunicar valor e crescer com consistência.",
        image: "/images/landing/hero-consulting.webp",
      },
    ],
  },
  en: {
    title: "Why should I build a brand?",
    description:
      "Brand is strategy: it differentiates your business, creates trust and makes you memorable.",
    benefitsTitle: "The impact of a strong brand",
    benefitsDescription:
      "When every touchpoint is consistent, your brand earns a place in customers' minds and choices.",
    benefits: [
      "Differentiates your business",
      "Builds trust and loyalty",
      "Strengthens recognition",
      "Adds value to marketing and business",
    ],
    pillars: [
      {
        title: "Exclusivity",
        heading: "A brand that is uniquely yours",
        description: "A distinct proposition that is difficult to copy and easy to recognize.",
      },
      {
        title: "Authenticity",
        heading: "Genuine and true",
        description: "Consistency between what your brand says, does and delivers.",
      },
      {
        title: "Security",
        heading: "Give customers confidence",
        description: "Trust at every touchpoint with your company.",
      },
    ],
    slides: [
      {
        category: "Brand identity",
        title: "JNL Turismo Receptivo",
        description: "A brand created to convey presence, trust and a memorable experience.",
        image: "/images/logomarks/client-01.webp",
      },
      {
        category: "Brand identity",
        title: "Garra Atacadista",
        description:
          "An identity created to communicate strength, scale and presence in the wholesale sector.",
        image: "/images/logomarks/client-02.webp",
      },
      {
        category: "Branding",
        title: "An identity that stands out",
        description: "Visual systems designed to build recognition at every touchpoint.",
        image: "/images/landing/hero-branding.webp",
      },
      {
        category: "Strategy",
        title: "Purposeful positioning",
        description: "Direction to communicate value and grow consistently.",
        image: "/images/landing/hero-consulting.webp",
      },
    ],
  },
  es: {
    title: "¿Por qué crear una marca?",
    description:
      "Marca es estrategia: diferencia tu negocio, genera confianza y hace que te recuerden.",
    benefitsTitle: "El impacto de una marca sólida",
    benefitsDescription:
      "Cuando cada punto de contacto es coherente, tu marca gana espacio en la mente y la elección de los clientes.",
    benefits: [
      "Diferencia tu empresa",
      "Genera confianza y fidelidad",
      "Fortalece el reconocimiento",
      "Aporta valor al marketing y al negocio",
    ],
    pillars: [
      {
        title: "Exclusividad",
        heading: "Una marca solo tuya",
        description: "Una propuesta única, difícil de copiar y fácil de reconocer.",
      },
      {
        title: "Autenticidad",
        heading: "Genuina y verdadera",
        description: "Coherencia entre lo que tu marca dice, hace y entrega.",
      },
      {
        title: "Seguridad",
        heading: "Da tranquilidad",
        description: "Confianza en cada punto de contacto con tu empresa.",
      },
    ],
    slides: [
      {
        category: "Identidad de marca",
        title: "JNL Turismo Receptivo",
        description:
          "Una marca creada para transmitir presencia, confianza y una experiencia memorable.",
        image: "/images/logomarks/client-01.webp",
      },
      {
        category: "Identidad de marca",
        title: "Garra Atacadista",
        description:
          "Una identidad creada para comunicar fuerza, escala y presencia en el sector mayorista.",
        image: "/images/logomarks/client-02.webp",
      },
      {
        category: "Branding",
        title: "Una identidad que destaca",
        description: "Sistemas visuales para construir reconocimiento en cada contacto.",
        image: "/images/landing/hero-branding.webp",
      },
      {
        category: "Estrategia",
        title: "Posicionamiento con propósito",
        description: "Dirección para comunicar valor y crecer con consistencia.",
        image: "/images/landing/hero-consulting.webp",
      },
    ],
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = pageCopy[locale as keyof typeof pageCopy] ?? pageCopy.pt;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nja.marketing";
  const pageUrl = `${siteUrl}/${locale}/marca`;

  return {
    title: copy.seoTitle,
    description: copy.seoDescription,
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(
        routing.locales.map((availableLocale) => [
          availableLocale,
          `${siteUrl}/${availableLocale}/marca`,
        ])
      ),
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
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { locale } = await params;
  const copy = pageCopy[locale as keyof typeof pageCopy] ?? pageCopy.pt;
  const showcase =
    brandShowcaseCopy[locale as keyof typeof brandShowcaseCopy] ?? brandShowcaseCopy.pt;

  return (
    <ServiceLandingPage
      locale={locale}
      copy={copy}
      showcase={
        <BrandShowcase sectionId="sobre-o-servico" badge={copy.overview.badge} {...showcase} />
      }
    />
  );
}
