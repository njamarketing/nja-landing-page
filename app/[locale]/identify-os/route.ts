import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "pt", "es"];
const defaultLocale = "pt";

type RouteContext = {
  params: Promise<{
    locale: string;
  }>;
};

function getValidLocale(locale: string) {
  return locales.includes(locale) ? locale : defaultLocale;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { locale } = await context.params;

  const homeUrl = new URL(`/${getValidLocale(locale)}`, request.url);
  homeUrl.hash = "download";

  return NextResponse.redirect(homeUrl);
}
