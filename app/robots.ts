import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://njamarketing.com.br",
  ).origin;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
