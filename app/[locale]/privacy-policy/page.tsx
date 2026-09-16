import LegalPage, {
  legalMetadata,
  type LegalPageProps,
} from "@/components/legal/LegalPage";

export async function generateMetadata({ params }: LegalPageProps) {
  const { locale } = await params;
  return legalMetadata(locale, "privacy");
}

export default async function PrivacyPolicyPage({ params }: LegalPageProps) {
  const { locale } = await params;
  return <LegalPage locale={locale} kind="privacy" />;
}
