import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Globe2,
  MessageCircle,
  Palette,
  Smartphone,
  Star,
} from "lucide-react";
import WebsitePreview from "@/components/landing/WebsitePreview";
import feedback from "@/data/customer-feedback.json";
import { getWebsiteProductCopy } from "@/data/website-product";
import { WEBSITE_OFFER } from "@/lib/website-briefing";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import styles from "./page.module.css";

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://njamarketing.com.br",
).origin;
const title = "Seu site profissional por R$ 300,00 | NJA Marketing";
const description =
  "Sua empresa online, seu cliente no WhatsApp. Site profissional por R$ 300,00 + R$ 99,90/mês de hospedagem e manutenção. Converse com a NJA e comece seu projeto.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/pt/site-profissional` },
  robots: { index: false, follow: true },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/pt/site-profissional`,
    siteName: "NJA Marketing",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/website-ninja.png",
        width: 1536,
        height: 1024,
        alt: "Criação de sites profissionais com a NJA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/website-ninja.png"],
  },
};

const whatsappUrl = getWhatsAppUrl(
  WEBSITE_OFFER.phone,
  "pt",
  "websiteCampaign",
);
const product = getWebsiteProductCopy("pt");
const benefits = [
  {
    icon: Palette,
    title: "A identidade da sua empresa",
    text: "Seus serviços e diferenciais em um site com a cara do seu negócio.",
  },
  {
    icon: Smartphone,
    title: "Feito para todas as telas",
    text: "Uma boa experiência para quem chega pelo celular ou pelo computador.",
  },
  {
    icon: MessageCircle,
    title: "Um clique até o WhatsApp",
    text: "Seu visitante conhece o que você faz e encontra um caminho fácil para falar com você.",
  },
];
const steps = [
  {
    title: "Chame no WhatsApp",
    text: "Conte o que sua empresa faz. A equipe orienta você e combina os próximos passos.",
  },
  {
    title: "Envie seus materiais",
    text: "Reúna sua logo, fotos, textos e contatos. Alinhamos a apresentação do seu negócio.",
  },
  {
    title: "Receba seu site no ar",
    text: "Com pagamento confirmado e materiais completos, publicamos em até 48 horas.",
  },
];
const reviews = feedback.items.filter((review) =>
  ["Fabiano Facioni", "Marcela Souza"].includes(review.name),
);

function WhatsAppLink({
  children = "Quero meu site profissional",
  placement,
  className = "",
}: {
  children?: React.ReactNode;
  placement: string;
  className?: string;
}) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="website-whatsapp"
      data-cta-placement={placement}
      className={`${styles.whatsappButton} ${className}`}
    >
      <MessageCircle className="size-5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
      <ArrowUpRight className="ml-auto size-5 shrink-0" aria-hidden="true" />
    </a>
  );
}

function Brand() {
  return (
    <div
      className="flex items-center gap-2.5"
      aria-label="NJA Consultoria e Marketing"
    >
      <Image src="/svg/favicon.svg" alt="" width={44} height={44} />
      <div>
        <span className="font-display block text-2xl leading-none font-bold tracking-[-.06em]">
          nja<span className="text-brand-cyan">.</span>
        </span>
        <span className="mt-1 block text-[9px] tracking-[.16em] text-slate-400">
          CONSULTORIA E MARKETING
        </span>
      </div>
    </div>
  );
}

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function WebsiteCampaignPage({
  params,
  searchParams,
}: PageProps) {
  const { locale } = await params;
  // This campaign is in Portuguese. Preserve ad parameters on locale redirects.
  if (locale !== "pt") {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(await searchParams)) {
      if (Array.isArray(value))
        value.forEach((item) => query.append(key, item));
      else if (value !== undefined) query.set(key, value);
    }
    redirect(`/pt/site-profissional${query.size ? `?${query}` : ""}`);
  }

  return (
    <div className={styles.page}>
      <header className="relative z-10 border-b border-white/8 px-5 sm:px-8">
        <div className="mx-auto flex h-22 max-w-6xl items-center justify-between gap-4">
          <Brand />
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="website-whatsapp"
            data-cta-placement="header"
            className="flex min-h-11 items-center gap-2 text-xs font-medium text-slate-300 transition-colors hover:text-brand-cyan sm:text-sm"
          >
            <span className="hidden sm:inline">Vamos criar seu site?</span>
            <span className="sm:hidden">Fale com a NJA</span>
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      <main id="main-content">
        <section
          className={`${styles.hero} px-5 pt-12 pb-16 sm:px-8 sm:pt-16 lg:pt-20 lg:pb-20`}
          aria-labelledby="campaign-title"
        >
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <p className={styles.eyebrow}>
                <span className="size-1.5 rounded-full bg-brand-cyan" /> SEU
                NEGÓCIO TEM UM NOVO ENDEREÇO
              </p>
              <h1
                id="campaign-title"
                className="mt-6 text-[2.6rem] leading-[1.06] font-semibold tracking-[-.055em] sm:text-6xl lg:text-[4.1rem]"
              >
                Sua empresa online.
                <br />
                <span className={styles.gradientText}>
                  Seu cliente no WhatsApp.
                </span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Um site profissional para apresentar seu negócio, transmitir
                confiança e facilitar o contato de novos clientes.
              </p>
              <div className="mt-7 border-l-2 border-brand-cyan/60 pl-4">
                <p className="text-sm text-slate-300">
                  Seu site por{" "}
                  <strong className="font-display ml-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {WEBSITE_OFFER.development}
                  </strong>
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  + {WEBSITE_OFFER.monthly}/mês de hospedagem e manutenção
                </p>
              </div>
              <WhatsAppLink placement="hero" className="mt-7 w-full sm:w-fit" />
              <p className="mt-3 flex items-center gap-2 text-xs leading-5 text-slate-400">
                <MessageCircle
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />{" "}
                Fale direto com a equipe. Sem formulário.
              </p>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Check
                    className="size-3.5 text-brand-cyan"
                    aria-hidden="true"
                  />{" "}
                  Domínio .br no 1º ano incluso
                </span>
                <span className="flex items-center gap-1.5">
                  <Check
                    className="size-3.5 text-brand-cyan"
                    aria-hidden="true"
                  />{" "}
                  Pronto em até {WEBSITE_OFFER.delivery}*
                </span>
              </div>
              <p className="mt-3 max-w-md text-[11px] leading-5 text-slate-400">
                *Após a confirmação do pagamento e o recebimento de todos os
                materiais e informações do projeto.
              </p>
            </div>
            <div className={styles.preview}>
              <div className="mb-5 flex items-center justify-between gap-4 text-[10px] tracking-[.16em] text-slate-400">
                <span>SUA PRÓXIMA VITRINE DIGITAL</span>
                <span className="flex items-center gap-1.5 text-brand-cyan">
                  <span className="size-1.5 rounded-full bg-brand-cyan" />{" "}
                  ONLINE
                </span>
              </div>
              <WebsitePreview copy={product.preview} />
            </div>
          </div>
        </section>

        <section
          className="border-y border-white/10 bg-white/[.015] px-5 py-12 sm:px-8 lg:py-14"
          aria-labelledby="benefits-title"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              id="benefits-title"
              className="text-sm font-normal tracking-normal text-slate-400"
            >
              Tudo o que você precisa para se apresentar bem.
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
              {benefits.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <Icon
                    className="mt-1 size-6 shrink-0 text-brand-cyan"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="px-5 py-16 sm:px-8 lg:py-22"
          aria-labelledby="process-title"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className={styles.eyebrow}>
                  SIMPLES DO COMEÇO AO SITE NO AR
                </p>
                <h2
                  id="process-title"
                  className="mt-4 max-w-lg text-3xl leading-tight font-medium sm:text-4xl"
                >
                  Você cuida do negócio.
                  <br />
                  <span className="text-slate-400">A gente cuida do site.</span>
                </h2>
              </div>
              <p className="max-w-64 text-sm leading-6 text-slate-400">
                Para prestadores de serviço, profissionais autônomos e negócios
                locais.
              </p>
            </div>
            <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
              {steps.map((step, index) => (
                <li key={step.title} className="border-t border-white/15 pt-5">
                  <span className="font-display text-sm text-brand-cyan">
                    0{index + 1}
                    <span className="ml-3 text-white/20">/</span>
                  </span>
                  <h3 className="mt-4 text-lg font-medium">{step.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="px-5 pb-16 sm:px-8 lg:pb-22"
          aria-labelledby="reviews-title"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 id="reviews-title" className="text-xl font-medium">
                Quem confia na NJA conta.
              </h2>
              <span className="text-xs text-slate-400">
                Avaliações de clientes sobre a NJA no Google
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {reviews.map((review) => (
                <figure
                  key={review.id}
                  className="flex flex-col rounded-2xl border border-white/10 bg-white/[.025] p-6 sm:p-7"
                >
                  <div
                    className="flex gap-1 text-[#e4bd78]"
                    aria-label={`${review.rating} de 5 estrelas`}
                  >
                    {Array.from({ length: review.rating }, (_, index) => (
                      <Star
                        key={index}
                        className="size-3.5 fill-current"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 mb-6 text-sm leading-7 text-slate-300">
                    “{review.text}”
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3">
                    <Image
                      src={review.avatarSrc}
                      alt=""
                      width={36}
                      height={36}
                      className="size-9 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">{review.name}</p>
                      <a
                        href={review.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-6 items-center gap-1 text-xs text-slate-400 underline decoration-white/20 underline-offset-4 hover:text-white"
                      >
                        Ver avaliação no Google{" "}
                        <ArrowUpRight className="size-3" aria-hidden="true" />
                      </a>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section
          id="seu-site"
          className="px-5 pb-16 sm:px-8 lg:pb-22"
          aria-labelledby="offer-title"
        >
          <div
            className={`${styles.offer} mx-auto grid max-w-6xl gap-9 rounded-3xl border border-brand-cyan/20 p-6 sm:p-10 lg:grid-cols-[1fr_.85fr] lg:gap-20 lg:p-12`}
          >
            <div>
              <p className={styles.eyebrow}>
                SEU SITE PROFISSIONAL COMEÇA AQUI
              </p>
              <h2
                id="offer-title"
                className="mt-5 text-3xl leading-tight font-medium sm:text-4xl"
              >
                Dê ao seu negócio
                <br />
                um endereço à altura.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                Apresente seus serviços, valorize sua marca e deixe o próximo
                contato a um clique de distância.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  "Site institucional com a identidade da sua empresa",
                  "Layout adaptado para celular e computador",
                  "Botões de WhatsApp e links para redes sociais",
                  "Primeiro ano de domínio .br incluso*",
                  "Hospedagem e manutenção na mensalidade",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-slate-300"
                  >
                    <Check
                      className="mt-1 size-4 shrink-0 text-brand-cyan"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 max-w-md text-xs leading-5 text-slate-400">
                *Sujeito à disponibilidade. Renovação do domínio a partir do
                segundo ano cobrada à parte.
              </p>
            </div>
            <div className="flex flex-col justify-center border-t border-white/10 pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <p className="text-sm text-slate-300">
                Criação do site · pagamento único
              </p>
              <p className="font-display mt-2 text-[3.4rem] leading-tight font-semibold tracking-[-.06em] sm:text-6xl">
                {WEBSITE_OFFER.development}
              </p>
              <p className="mt-3 text-lg text-white">
                + {WEBSITE_OFFER.monthly}
                <span className="text-sm text-slate-300">/mês</span>
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Hospedagem e manutenção · sem reajuste
              </p>
              <WhatsAppLink placement="offer" className="mt-7 w-full">
                Quero começar meu site
              </WhatsAppLink>
              <p className="mt-3 text-center text-xs text-slate-400">
                Tire suas dúvidas e contrate pelo WhatsApp.
              </p>
              <p className="mt-6 flex items-start gap-2 text-xs leading-5 text-slate-300">
                <Clock3
                  className="mt-0.5 size-4 shrink-0 text-brand-cyan"
                  aria-hidden="true"
                />
                No ar em até {WEBSITE_OFFER.delivery} após pagamento confirmado
                e recebimento dos materiais completos.
              </p>
            </div>
          </div>
        </section>

        <section
          className="px-5 pb-16 sm:px-8 lg:pb-22"
          aria-labelledby="faq-title"
        >
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.7fr_1fr] lg:gap-20">
            <div>
              <p className={styles.eyebrow}>ANTES DE COMEÇAR</p>
              <h2
                id="faq-title"
                className="mt-4 text-3xl font-medium sm:text-4xl"
              >
                Ficou alguma dúvida?
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
                Não precisa entender de tecnologia. A equipe orienta você em
                cada etapa.
              </p>
              <ArrowDown
                className="mt-6 size-6 text-brand-cyan lg:-rotate-90"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
            <div className="border-t border-white/10">
              {[
                product.faq.items[0],
                product.faq.items[1],
                product.faq.items[2],
                {
                  question: "Este plano inclui loja virtual ou sistemas?",
                  answer:
                    "O plano é para um site institucional: apresentação da empresa, serviços, diferenciais e contato pelo WhatsApp. Loja virtual, carrinho, pagamentos pelo site, login, painel administrativo e sistemas personalizados não estão inclusos. Se precisar desses recursos, converse com a equipe sobre um projeto à parte.",
                },
              ].map((item) => (
                <details key={item.question} className={styles.faqItem}>
                  <summary className="flex min-h-17 cursor-pointer list-none items-center justify-between gap-5 py-5 text-sm font-medium">
                    <span>{item.question}</span>
                    <ChevronDown
                      className="size-4 shrink-0 text-slate-400 transition-transform"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="pr-5 pb-6 text-sm leading-7 text-slate-400">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <p className="text-xs leading-6 text-slate-400">
            © {new Date().getFullYear()} NJA Consultoria e Marketing.
            <br />
            Seu próximo passo no digital.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a
              href="/pt/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center hover:text-white"
            >
              Privacidade
            </a>
            <a
              href="/pt/terms-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center hover:text-white"
            >
              Termos de uso
            </a>
            <Globe2 className="size-4 text-slate-500" aria-hidden="true" />
          </div>
        </div>
      </footer>

      <aside
        className={styles.mobileCta}
        aria-label="Fale com a NJA sobre seu site"
      >
        <WhatsAppLink placement="mobile-fixed" className="w-full">
          Quero meu site
        </WhatsAppLink>
      </aside>
    </div>
  );
}
