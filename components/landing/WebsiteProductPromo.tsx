import { ArrowUpRight, Globe2 } from "lucide-react";
import SectionReveal from "@/components/landing/SectionReveal";
import { getWebsiteProductCopy } from "@/data/website-product";

export default function WebsiteProductPromo({ locale }: { locale: string }) {
  const copy = getWebsiteProductCopy(locale);

  return (
    <section
      aria-labelledby="website-promo-title"
      className="relative px-4 pb-12 sm:px-6"
    >
      <SectionReveal className="landing-glass-strong mx-auto flex max-w-7xl flex-col items-start gap-6 rounded-[2rem] p-7 sm:p-10 lg:flex-row lg:items-center lg:gap-8">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-brand-cyan/20 bg-brand-cyan/10 text-brand-cyan">
          <Globe2 className="size-7" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <div className="flex-1">
          <div className="landing-label">{copy.nav.product}</div>
          <h2
            id="website-promo-title"
            className="mt-3 text-2xl font-semibold sm:text-3xl"
          >
            {copy.promo.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">
            {copy.promo.description}
          </p>
        </div>
        <a
          href={`/${locale}/website-creation`}
          className="landing-button gap-3 text-sm"
        >
          {copy.promo.action}
          <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
        </a>
      </SectionReveal>
    </section>
  );
}
