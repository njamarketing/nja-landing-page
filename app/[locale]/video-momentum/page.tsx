import type { Metadata } from "next";
import AudioVisualShowcase from "@/components/landing/AudioVisualShowcase";
import ServiceLandingPage from "@/components/landing/ServiceLandingPage";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const pageCopy = {
  pt: {
    seoTitle: "Video Momentum | NJA Marketing",
    seoDescription:
      "Produção audiovisual para campanhas, marcas e conteúdos que precisam ganhar movimento.",
    hero: {
      titleBefore: "Conteúdos que",
      titleHighlight: "ganham movimento",
      titleAfter: "e fazem sua marca ser vista.",
      description:
        "Video Momentum é a frente audiovisual da NJA: produção moderna, direção criativa e conteúdo de alta qualidade para sua publicidade.",
      stats: [
        { value: "4K", label: "qualidade de imagem" },
        { value: "360°", label: "produção completa" },
        { value: "Global", label: "atendimento internacional" },
      ],
      actionLabel: "Conhecer o Momentum",
    },
    overview: {
      badge: "Audio Visual",
      title: "Produção que transforma atenção em presença de marca.",
      description:
        "Criamos filmes, campanhas e conteúdos pensados para acompanhar a velocidade do mercado e a ambição da sua empresa.",
      points: [
        "Direção criativa alinhada à estratégia da marca.",
        "Captação, edição e finalização em alto padrão.",
        "Conteúdos para campanhas, redes sociais e apresentações.",
        "Atendimento no Brasil e no exterior.",
      ],
    },
  },
  en: {
    seoTitle: "Video Momentum | NJA Marketing",
    seoDescription: "Audiovisual production for campaigns, brands and content that need momentum.",
    hero: {
      titleBefore: "Content that",
      titleHighlight: "builds momentum",
      titleAfter: "and makes your brand visible.",
      description:
        "Video Momentum is NJA's audiovisual service: modern production, creative direction and premium content.",
      stats: [
        { value: "4K", label: "image quality" },
        { value: "360°", label: "full production" },
        { value: "BR", label: "nationwide service" },
      ],
      actionLabel: "Discover Momentum",
    },
    overview: {
      badge: "Audio Visual",
      title: "Production that turns attention into brand presence.",
      description:
        "We create films, campaigns and content designed for market speed and your company's ambition.",
      points: [
        "Creative direction.",
        "High-standard filming and editing.",
        "Campaign and social content.",
        "Service in Brazil and abroad.",
      ],
    },
  },
  es: {
    seoTitle: "Video Momentum | NJA Marketing",
    seoDescription:
      "Producción audiovisual para campañas, marcas y contenidos que necesitan movimiento.",
    hero: {
      titleBefore: "Contenidos que",
      titleHighlight: "ganan movimiento",
      titleAfter: "y hacen visible tu marca.",
      description:
        "Video Momentum es la solución audiovisual de NJA: producción moderna, dirección creativa y contenido de alta calidad.",
      stats: [
        { value: "4K", label: "calidad de imagen" },
        { value: "360°", label: "producción completa" },
        { value: "Global", label: "servicio internacional" },
      ],
      actionLabel: "Conocer Momentum",
    },
    overview: {
      badge: "Audiovisual",
      title: "Producción que transforma atención en presencia de marca.",
      description:
        "Creamos películas, campañas y contenidos pensados para la velocidad del mercado y la ambición de tu empresa.",
      points: [
        "Dirección creativa.",
        "Rodaje y edición de alto nivel.",
        "Contenido para campañas y redes.",
        "Atención en Brasil y en el exterior.",
      ],
    },
  },
} as const;

const audioVisualCopy = {
  pt: {
    badge: "Audio Visual",
    title: "Video Momentum",
    description:
      "Uma produtora de vídeos que reúne o que há de mais moderno no mercado para entregar conteúdo de alta qualidade à sua publicidade.",
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
      "A video production service that brings modern standards to create high-quality content for your advertising.",
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = pageCopy[locale as keyof typeof pageCopy] ?? pageCopy.pt;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nja.marketing";
  const pageUrl = `${siteUrl}/${locale}/video-momentum`;

  return {
    title: copy.seoTitle,
    description: copy.seoDescription,
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(
        routing.locales.map((availableLocale) => [
          availableLocale,
          `${siteUrl}/${availableLocale}/video-momentum`,
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

export default async function VideoMomentumPage({ params }: PageProps) {
  const { locale } = await params;
  const copy = pageCopy[locale as keyof typeof pageCopy] ?? pageCopy.pt;
  const showcase = audioVisualCopy[locale as keyof typeof audioVisualCopy] ?? audioVisualCopy.pt;

  return (
    <ServiceLandingPage
      locale={locale}
      copy={copy}
      showcase={
        <div id="sobre-o-servico">
          <AudioVisualShowcase {...showcase} />
        </div>
      }
    />
  );
}
