import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://njamarketing.com.br",
  ).origin;
  // Include complete content pages only, excluding redirects and placeholders.
  const routes = [
    "",
    "/about-us",
    "/portfolio",
    "/franquias",
    "/franquias/foz-do-iguacu",
    "/franquias/teixeira-de-freitas",
    "/marca",
    "/video-momentum",
    "/website-creation",
    "/terms-conditions",
    "/privacy-policy",
    "/account-cancellation-policy",
  ];

  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      alternates: {
        languages: Object.fromEntries([
          ...routing.locales.map((language) => [
            language,
            `${siteUrl}/${language}${route}`,
          ]),
          ["x-default", `${siteUrl}/${routing.defaultLocale}${route}`],
        ]),
      },
    })),
  );
}
