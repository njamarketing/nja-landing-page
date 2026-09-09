import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nja.marketing";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "NJA Marketing",
  applicationName: "NJA Marketing",
  description: "Página institucional da NJA Marketing.",
  keywords: ["NJA Marketing", "marketing", "institucional"],
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/svg/ico.svg", type: "image/svg+xml" }],
    shortcut: ["/svg/ico.svg"],
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <a href="#main-content" className="skip-link">
          Ir para o conteúdo principal
        </a>
        <NextIntlClientProvider>
          <LenisProvider>{children}</LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
