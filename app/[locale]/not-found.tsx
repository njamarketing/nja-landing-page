import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function NotFoundPage() {
  const locale = await getLocale();
  const t = await getTranslations("NotFound");

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-black px-4 py-10 sm:px-6">
      <Image
        src="/images/landing/not-found-ninja.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-left"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/40 to-black/95" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35" />
      <div aria-hidden="true" className="not-found-smoke">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="ml-auto max-w-xl text-center lg:text-left">
          <div className="landing-label">{t("eyebrow")}</div>
          <div className="mt-5 font-[family-name:var(--font-space-grotesk)] text-[clamp(7rem,20vw,12rem)] leading-[0.72] font-bold tracking-[-0.1em] text-brand-cyan">
            404
          </div>
          <h1 className="mt-9 text-3xl font-bold text-white sm:text-5xl">{t("title")}</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/65 sm:text-lg lg:mx-0">{t("description")}</p>
          <Link href={`/${locale}`} className="landing-button mt-9 gap-3">
            {t("cta")}
            <span aria-hidden="true" className="text-lg leading-none">
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
