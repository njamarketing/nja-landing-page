import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donations" });
  return { title: t("meta_title") };
}

export default async function DonationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donations" });

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} />
      <main className="flex-1 bg-white px-4 py-16 text-gray-900 md:px-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold md:text-4xl">{t("page_title")}</h1>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
