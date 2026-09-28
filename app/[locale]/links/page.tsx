import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Globe2,
  Headphones,
  MapPin,
  MessageCircle,
  PanelsTopLeft,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";
import { getLinksPageCopy, NJA_LINKS } from "@/data/links-page";
import { localeOptions, routing } from "@/i18n/routing";
import { WEBSITE_OFFER } from "@/lib/website-briefing";
import styles from "./page.module.css";

type PageProps = { params: Promise<{ locale: string }> };

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://njamarketing.com.br",
).origin;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = getLinksPageCopy(locale);
  const url = `${siteUrl}/${locale}/links`;

  return {
    title: copy.seoTitle,
    description: copy.seoDescription,
    alternates: {
      canonical: url,
      languages: Object.fromEntries([
        ...routing.locales.map((language) => [
          language,
          `${siteUrl}/${language}/links`,
        ]),
        ["x-default", `${siteUrl}/${routing.defaultLocale}/links`],
      ]),
    },
    openGraph: {
      title: copy.seoTitle,
      description: copy.seoDescription,
      url,
      siteName: "NJA Marketing",
      locale: locale === "pt" ? "pt_BR" : locale === "en" ? "en_US" : "es_ES",
      type: "website",
      images: [
        {
          url: "/nja-logo-white.png",
          width: 1920,
          height: 1080,
          alt: "NJA Marketing",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: copy.seoTitle,
      description: copy.seoDescription,
      images: ["/nja-logo-white.png"],
    },
  };
}

function LinkCard({
  href,
  title,
  description,
  icon,
  external = true,
}: {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
  external?: boolean;
}) {
  const content = (
    <>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.cardText}>
        <span className={styles.cardTitle}>{title}</span>
        <span className={styles.cardDescription}>{description}</span>
      </span>
      {external ? (
        <ArrowUpRight className={styles.arrow} aria-hidden="true" />
      ) : (
        <ArrowRight className={styles.arrow} aria-hidden="true" />
      )}
    </>
  );

  return external ? (
    <a
      href={href}
      className={styles.card}
      target="_blank"
      rel="noopener noreferrer"
      aria-describedby="external-link-hint"
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={styles.card}>
      {content}
    </Link>
  );
}

export default async function LinksPage({ params }: PageProps) {
  const { locale } = await params;
  if (!routing.locales.some((language) => language === locale)) notFound();
  const copy = getLinksPageCopy(locale);
  const groups = [
    {
      id: "team",
      title: copy.contact,
      items: [
        {
          ...copy.commercial,
          href: NJA_LINKS.commercial,
          icon: <MessageCircle />,
        },
        { ...copy.support, href: NJA_LINKS.support, icon: <Headphones /> },
        { ...copy.finance, href: NJA_LINKS.finance, icon: <Wallet /> },
      ],
    },
    {
      id: "bahia",
      title: copy.bahiaTitle,
      items: [{ ...copy.bahia, href: NJA_LINKS.bahia, icon: <MapPin /> }],
    },
    {
      id: "resources",
      title: copy.resources,
      items: [
        { ...copy.ebook, href: NJA_LINKS.ebook, icon: <BookOpen /> },
        { ...copy.planner, href: NJA_LINKS.planner, icon: <CalendarDays /> },
      ],
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.brandMark} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.header}>
          <nav className={styles.languages} aria-label={copy.language}>
            {localeOptions.map((language) => (
              <Link
                key={language.code}
                href={`/${language.code}/links`}
                hrefLang={language.code}
                lang={language.code}
                aria-label={language.label}
                aria-current={language.code === locale ? "page" : undefined}
              >
                {language.code.toUpperCase()}
              </Link>
            ))}
          </nav>
          <Link
            href={`/${locale}`}
            className={styles.logo}
            aria-label={copy.home}
          >
            <Image
              src="/svg/nja-logo-extended.svg"
              alt="NJA Consultoria e Marketing"
              width={256}
              height={144}
              priority
            />
          </Link>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            {copy.badge}
          </p>
        </header>

        <main id="main-content" tabIndex={-1}>
          <div className={styles.intro}>
            <h1>
              {copy.title}
              <br />
              <span>{copy.highlight}</span>
            </h1>
            <p>{copy.description}</p>
          </div>

          <nav aria-label={copy.navigation}>
            <Link
              href={`/${locale}/website-creation`}
              className={styles.featured}
            >
              <span className={styles.offerEyebrow}>
                <PanelsTopLeft aria-hidden="true" />
                {copy.offer.eyebrow}
              </span>
              <span className={styles.offerTitle}>
                {copy.offer.title}{" "}
                <span>
                  {copy.offer.pricePrefix}{" "}
                  <strong>{WEBSITE_OFFER.development}</strong>
                </span>
              </span>
              <span className={styles.offerNote}>
                + {WEBSITE_OFFER.monthly}
                {copy.offer.monthly}
              </span>
              <span className={styles.offerAction}>
                {copy.offer.action}
                <ArrowRight aria-hidden="true" />
              </span>
            </Link>

            {groups.map((group) => (
              <section
                key={group.id}
                className={styles.group}
                aria-labelledby={`${group.id}-title`}
              >
                <h2 id={`${group.id}-title`} className={styles.groupTitle}>
                  {group.title}
                </h2>
                <ul className={styles.cardList}>
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <LinkCard {...item} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <section className={styles.group} aria-labelledby="follow-title">
              <h2 id="follow-title" className={styles.groupTitle}>
                {copy.follow}
              </h2>
              <LinkCard
                {...copy.website}
                href={`/${locale}`}
                icon={<Globe2 />}
                external={false}
              />
              <ul className={styles.socials}>
                <li>
                  <LinkCard
                    {...copy.instagram}
                    href={NJA_LINKS.instagram}
                    icon={
                      <Image
                        src="/svg/instagram-icon.svg"
                        alt=""
                        width={22}
                        height={22}
                      />
                    }
                  />
                </li>
                <li>
                  <LinkCard
                    {...copy.facebook}
                    href={NJA_LINKS.facebook}
                    icon={
                      <Image
                        src="/svg/facebook-icon.svg"
                        alt=""
                        width={22}
                        height={22}
                      />
                    }
                  />
                </li>
              </ul>
            </section>
          </nav>
          <p id="external-link-hint" className="sr-only">
            {copy.external}
          </p>
        </main>

        <footer className={styles.footer}>
          <p>
            © {new Date().getFullYear()} <span>NJA Marketing</span>
          </p>
          <p>{copy.tagline}</p>
          <div className={styles.legal}>
            <Link href={`/${locale}/privacy-policy`}>{copy.privacy}</Link>
            <span aria-hidden="true">·</span>
            <Link href={`/${locale}/terms-conditions`}>{copy.terms}</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
