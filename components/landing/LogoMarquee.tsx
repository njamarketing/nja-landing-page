import Image from "next/image";

type LogoItem = {
  name: string;
  src: string;
};

type LogoMarqueeProps = {
  logos: readonly LogoItem[];
  eyebrow: string;
  title: string;
  description: string;
};

const REPEAT_COUNT = 5;

export default function LogoMarquee({ logos, eyebrow, title, description }: LogoMarqueeProps) {
  if (logos.length === 0) {
    return null;
  }

  const repeatedLogos = Array.from({ length: REPEAT_COUNT }, () => logos).flat();

  return (
    <section aria-label={title} className="relative overflow-hidden border-y border-white/8 py-16 sm:py-20">
      <div className="mx-auto mb-9 max-w-7xl px-4 text-center sm:mb-11 sm:px-6">
        <div className="landing-label">{eyebrow}</div>
        <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/62 sm:text-base">
          {description}
        </p>
      </div>
      <div className="relative py-7 sm:py-9">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent sm:w-28" />
        <div className="landing-logo-marquee flex w-max items-center">
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6">
              {repeatedLogos.map((logo, index) => (
                <div
                  key={`${group}-${logo.name}-${index}`}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.025] sm:h-32 sm:w-32"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={128}
                    height={128}
                    sizes="(max-width: 640px) 6rem, 8rem"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
