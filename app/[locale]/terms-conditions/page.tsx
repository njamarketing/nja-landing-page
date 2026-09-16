import LegalPage, {
  legalMetadata,
  type LegalPageProps,
} from "@/components/legal/LegalPage";

export async function generateMetadata({ params }: LegalPageProps) {
  const { locale } = await params;
  return legalMetadata(locale, "terms");
}

export default async function TermsAndConditionsPage({
  params,
}: LegalPageProps) {
  const { locale } = await params;
  return <LegalPage locale={locale} kind="terms" />;
}
