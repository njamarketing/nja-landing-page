import Image from "next/image";
import Link from "next/link";
import SectionReveal from "@/components/landing/SectionReveal";

export default function TeixeiraDeFreitasFranchise({
  locale,
  profile = false,
}: {
  locale: string;
  profile?: boolean;
}) {
  return (
    <section
      id="teixeira-de-freitas"
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
            Unidade em operação
          </div>
          <h2 className="mt-6 text-3xl leading-[1.08] font-bold text-white md:text-5xl">
            {profile ? (
              <>
                Nossa atuação{" "}
                <span className="landing-text-gradient">na região</span>
              </>
            ) : (
              <Link
                href={`/${locale}/franquias/teixeira-de-freitas`}
                className="decoration-cyan-300/50 underline-offset-8 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Teixeira de Freitas,{" "}
                <span className="landing-text-gradient">Bahia</span>
              </Link>
            )}
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
              Implantada em{" "}
              <strong className="text-white">dezembro de 2025</strong>, a
              unidade NJA de{" "}
              <strong className="text-white">
                Teixeira de Freitas, na Bahia
              </strong>
              , nasceu com o propósito de aproximar a metodologia NJA dos
              empresários da região.
            </p>
            <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
              Sob a direção de{" "}
              <Link
                href={
                  profile
                    ? "#igor-martins"
                    : `/${locale}/franquias/teixeira-de-freitas#igor-martins`
                }
                className="font-bold text-cyan-200 underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Igor Martins
              </Link>
              , a franquia segue ampliando sua atuação e sua carteira de
              clientes, ajudando empresas a identificarem oportunidades,
              estruturarem seus negócios e alcançarem novos objetivos por meio
              de uma metodologia já validada no mercado internacional.
            </p>
            <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
              Em poucos meses de operação, a unidade passou a construir um
              portfólio formado por empresas relevantes de diferentes segmentos,
              demonstrando a capacidade da metodologia NJA de se adaptar às
              particularidades e necessidades de cada negócio.
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
              Entre as empresas atendidas pela unidade de Teixeira de Freitas
              estão:
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
              Cada novo projeto fortalece a presença da NJA na região e reforça
              nosso compromisso de gerar impacto real nos negócios que confiam
              em nossa metodologia.
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
