import { defineRouting } from "next-intl/routing";

export const localeOptions = [
  { code: "pt", label: "Português (Brasil)", flag: "https://flagcdn.com/br.svg" },
  { code: "en", label: "English", flag: "https://flagcdn.com/us.svg" },
  { code: "es", label: "Español", flag: "https://flagcdn.com/es.svg" },
] as const;

export const routing = defineRouting({
  locales: localeOptions.map((locale) => locale.code),
  localeDetection: true,
  defaultLocale: "pt",
});
