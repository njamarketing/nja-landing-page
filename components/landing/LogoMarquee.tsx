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
            <div key={group} className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10">
              {repeatedLogos.map((logo, index) => (
                <div
                  key={`${group}-${logo.name}-${index}`}
                  className="flex h-15 w-44 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.025] px-7 sm:h-18 sm:w-56"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={190}
                    height={56}
                    sizes="(max-width: 640px) 9rem, 11rem"
                    className="h-auto max-h-9 w-full object-contain opacity-75 grayscale transition duration-300 hover:grayscale-0 sm:max-h-11"
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
