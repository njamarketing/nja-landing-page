import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "Política de Privacidade - NJA Marketing",
  description:
    "Conheça como a NJA Marketing coleta, utiliza e protege dados pessoais em suas experiências digitais e serviços.",
};

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("privacyPolicy");
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

            return (
              <div key={key} className="mt-8">
                <h2 className="mb-3 text-2xl font-semibold">{section.title}</h2>

                {section.paragraphs?.map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}

                {section.list && (
                  <ul className="mb-4 list-disc pl-6">
                    {section.list.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.footer && <p className="mb-4">{section.footer}</p>}
              </div>
            );
          })}
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
