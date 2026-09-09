"use client";

import Link from "next/link";
import { localeOptions } from "@/i18n/routing";

type LocaleSwitcherProps = {
  currentLocale: string;
  pathname: string;
  anchorId?: string;
  className?: string;
};

function getLocaleHref(locale: string, pathname: string, anchorId?: string) {
  if (pathname.startsWith("/") && pathname.split("/").length <= 2) {
    return `/${locale}${anchorId ? `#${anchorId}` : ""}`;
  }

  return `${pathname}${anchorId ? `#${anchorId}` : ""}`;
}

export default function LocaleSwitcher({ currentLocale, pathname, anchorId, className }: LocaleSwitcherProps) {
  return (
    <div
      className={`flex items-center gap-1 rounded-full border border-white/10 bg-white/4 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.18)] ${
        className ?? ""
      }`}
      aria-label="Language switcher"
    >
      {localeOptions.map((item) => {
        const isActive = item.code === currentLocale;

        return (
          <Link
            key={item.code}
            href={getLocaleHref(item.code, pathname, anchorId)}
            locale={item.code}
            aria-current={isActive ? "true" : undefined}
            aria-label={item.label}
            title={item.label}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition duration-200 ${
              isActive
                ? "bg-white text-night-deep shadow-[0_8px_24px_rgba(255,255,255,0.22)]"
                : "text-white/78 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span aria-hidden="true">{item.flag}</span>
          </Link>
        );
      })}
    </div>
  );
}
