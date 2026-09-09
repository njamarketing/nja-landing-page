"use client";

import CtaOpportunityParallax from "@/components/landing/CtaOpportunityParallax";
import SectionReveal from "@/components/landing/SectionReveal";

type CtaOpportunityCard = {
  label: string;
  image: string;
};

type LandingCtaSectionProps = {
  badge: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  description: string;
  buttonLabel: string;
  contactHref: string;
  cards: CtaOpportunityCard[];
  sectionId?: string;
};

export default function LandingCtaSection({
  badge,
  titleBefore,
  titleHighlight,
  titleAfter,
  description,
  buttonLabel,
  contactHref,
  cards,
  sectionId = "cta",
}: LandingCtaSectionProps) {
  return (
    <section
      id={sectionId}
      aria-labelledby="cta-title"
      className="relative px-4 py-24 sm:px-6 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="landing-cta-shell">
          <div className="landing-cta-inner">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] lg:items-center lg:gap-10">
              <SectionReveal className="flex flex-col justify-center" direction="left">
                <div className="max-w-4xl text-center lg:text-left">
                  <div className="landing-pill mx-auto lg:mx-0">
                    <span className="landing-pill-dot" />
                    {badge}
                  </div>
                  <h2 id="cta-title" className="mt-6 text-4xl leading-[1.04] font-bold md:text-6xl">
                    {titleBefore} <span className="landing-text-gradient">{titleHighlight}</span>{" "}
                    {titleAfter}
                  </h2>
                  <p className="mx-auto mt-8 max-w-3xl text-lg text-white/76 md:text-xl lg:mx-0">
                    {description}
                  </p>
                </div>

                <div className="mt-12 flex justify-center lg:justify-start">
                  <a href={contactHref} className="landing-button landing-button-light">
                    {buttonLabel}
                  </a>
                </div>
              </SectionReveal>

              <SectionReveal
                className="relative hidden lg:flex lg:min-h-[44rem] lg:items-stretch"
                delay={0.14}
                direction="right"
              >
                <CtaOpportunityParallax cards={cards} />
              </SectionReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
