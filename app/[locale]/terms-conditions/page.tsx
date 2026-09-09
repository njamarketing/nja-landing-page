import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "Termos e Condições - NJA Marketing",
  description:
    "Consulte os termos e condições de uso da NJA Marketing, incluindo regras de acesso, responsabilidades e uso da plataforma.",
};

export default async function TermsAndConditionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("termsConditions");
  const sections = t.raw("sections");

  return (
    <>
      <Header locale={locale} />

      <main className="bg-white pt-28 md:pt-32">
        <section className="container mx-auto max-w-4xl px-4 py-16 text-gray-900 md:px-6">
          <h1 className="mb-6 text-3xl font-bold md:text-4xl">{t("title")}</h1>

          <p className="mb-4">{t("intro")}</p>

          {Object.keys(sections).map((key) => {
            const section = sections[key];

            if (key === "contact") return null;

            return (
              <div key={key} className="mt-8">
                <h2 className="mb-3 text-2xl font-semibold">{section.title}</h2>

                {section.paragraphs?.map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            );
          })}

          <p className="mt-8">{t("sections.contact.text")}</p>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
