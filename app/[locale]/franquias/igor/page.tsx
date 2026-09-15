import { permanentRedirect } from "next/navigation";

export default async function IgorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/franquias/teixeira-de-freitas#igor-martins`);
}
