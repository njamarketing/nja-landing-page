import Image from "next/image";
import Link from "next/link";
import SectionReveal from "@/components/landing/SectionReveal";

export default function FozDoIguacuHeadquarters({
  locale,
  profile = false,
}: {
  locale: string;
  profile?: boolean;
}) {
  return (
    <section
      id="foz-do-iguacu"
      className={
        profile
          ? "relative px-4 py-16 sm:px-6 md:py-24"
          : "relative py-20 pr-4 pl-16 sm:py-24 sm:pr-6 sm:pl-24 md:py-32 md:pr-6 md:pl-6"
      }
    >
      {!profile && (
        <div className="absolute top-20 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200/60 bg-[#061221] font-mono text-[10px] text-cyan-100 shadow-[0_0_22px_rgba(62,229,250,0.45)] sm:left-8 md:left-1/2 md:-translate-x-1/2">
          02
        </div>
      )}
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="max-w-3xl md:max-w-[calc(50%-1.5rem)]">
          <div className="landing-pill">
            <span className="landing-pill-dot landing-pill-dot-blue" />
            Sede matriz
          </div>
          <h2 className="mt-6 text-3xl leading-[1.08] font-bold text-white md:text-5xl">
            {profile ? (
              <>
                Onde a nossa{" "}
                <span className="landing-text-gradient">história começou</span>
              </>
            ) : (
              <Link
                href={`/${locale}/franquias/foz-do-iguacu`}
                className="decoration-cyan-300/50 underline-offset-8 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Foz do Iguaçu,{" "}
                <span className="landing-text-gradient">Paraná</span>
              </Link>
            )}
          </h2>
          <p className="mt-5 text-xl text-white/82">
            Da Tríplice Fronteira para novas oportunidades
          </p>
        </SectionReveal>
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <SectionReveal
            className="landing-glass rounded-[2rem] p-7 md:p-10"
            direction="left"
          >
            <p className="text-base leading-8 text-white/72 md:text-lg">
              A NJA nasceu em{" "}
              <strong className="text-white">Foz do Iguaçu, no Paraná</strong>,
              fundada por seu CEO,{" "}
              <Link
                href={
                  profile
                    ? "#nelson-zeni-junior"
                    : `/${locale}/franquias/foz-do-iguacu#nelson-zeni-junior`
                }
                className="font-bold text-cyan-200 underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Nelson Zeni Junior
              </Link>
              , com o propósito de impulsionar empresas da região e aproximar
              oportunidades de negócio no Brasil, na Argentina e no Paraguai.
            </p>
            <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
              Com uma metodologia baseada em processos ágeis, a sede matriz
              construiu um amplo portfólio de clientes satisfeitos e uma base
              sólida de empresas que seguem confiando na marca.
            </p>
            <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
              Há nove anos, a NJA caminha ao lado de empresários em uma parceria
              pautada pela transparência, pela proximidade e pela busca de
              resultados consistentes.
            </p>
          </SectionReveal>
          <SectionReveal
            className="rounded-[2rem] border border-white/10 bg-white/5 p-7"
            delay={0.12}
            direction="right"
          >
            <div className="relative -mx-2 -mt-2 mb-7 h-64 overflow-hidden rounded-[1.35rem] border border-white/10">
              <Image
                src="/images/franquias/Nelson-seat.webp"
                alt="Nelson Zeni Junior, fundador e CEO da NJA"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071321]/60 to-transparent" />
            </div>
            <div className="landing-label">Nossa origem</div>
            <p className="font-display mt-5 text-2xl leading-tight text-white">
              Estratégia e conexão entre três países
            </p>
            <p className="mt-4 text-sm leading-7 text-white/68">
              A experiência na Tríplice Fronteira faz parte da nossa essência:
              entender cada mercado, construir relações de confiança e criar
              estratégias alinhadas aos objetivos de cada empresa.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Brasil", "Argentina", "Paraguai"].map((country) => (
                <span
                  key={country}
                  className="rounded-full border border-white/12 bg-white/6 px-3 py-2 text-sm text-white/80"
                >
                  {country}
                </span>
              ))}
            </div>
            {!profile && (
              <Link
                href={`/${locale}/franquias/foz-do-iguacu`}
                className="mt-7 inline-block text-sm font-medium text-cyan-200 underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Conheça a sede e seu fundador
              </Link>
            )}
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
