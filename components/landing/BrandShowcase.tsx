import PortfolioFeaturedCarousel from "@/components/landing/PortfolioFeaturedCarousel";
import SectionReveal from "@/components/landing/SectionReveal";

type BrandSlide = {
  category: string;
  title: string;
  description: string;
  image: string;
};

type BrandPillar = {
  title: string;
  heading: string;
  description: string;
};

type BrandShowcaseProps = {
  sectionId: string;
  badge: string;
  title: string;
  description: string;
  benefitsTitle: string;
  benefitsDescription: string;
  benefits: readonly string[];
  pillars: readonly BrandPillar[];
  slides: readonly BrandSlide[];
};

export default function BrandShowcase({
  sectionId,
  badge,
  title,
  description,
  benefitsTitle,
  benefitsDescription,
  benefits,
  pillars,
  slides,
}: BrandShowcaseProps) {
  return (
    <section id={sectionId} className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="landing-divider" />
      <div className="landing-grid-bg pointer-events-none absolute inset-0 opacity-25" />
      <div className="landing-orb landing-orb-left pointer-events-none opacity-50" />
      <div className="landing-orb landing-orb-right pointer-events-none opacity-45" />

      <div className="relative mx-auto max-w-7xl">
        <SectionReveal className="max-w-3xl">
          <div className="landing-pill">
            <span className="landing-pill-dot landing-pill-dot-blue" />
            {badge}
          </div>
          <h2 className="mt-6 text-3xl leading-[1.08] font-bold text-white md:text-5xl">{title}</h2>
          <p className="mt-6 text-lg leading-8 text-white/68">{description}</p>
        </SectionReveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar, index) => (
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
            <div className="landing-label">{benefitsTitle}</div>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/64">{benefitsDescription}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-sm leading-6 text-white/70">
                  <span className="bg-brand-cyan mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                  {benefit}
                </li>
              ))}
            </ul>
          </SectionReveal>

          <SectionReveal className="relative lg:col-span-7" delay={0.12} direction="right">
            <PortfolioFeaturedCarousel slides={slides} />
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
