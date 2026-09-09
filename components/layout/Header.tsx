"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { localeOptions } from "@/i18n/routing";

type NavItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  locale: string;
  navItems?: NavItem[];
  cta?: {
    label: string;
    href: string;
  };
  variant?: "default" | "landing";
};

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export default function Header({ locale, navItems = [], cta, variant = "default" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const languageRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === `/${locale}` || pathname === "/";
  const currentLocale = localeOptions.find((item) => item.code === locale) ?? localeOptions[0];
  const isLanding = variant === "landing";
  const mobileMenuId = isLanding ? "landing-mobile-menu" : "default-mobile-menu";
  const languageMenuId = isLanding ? "landing-language-menu" : "default-language-menu";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsLanguageOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (nextLocale: string) => {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) {
      router.push(`/${nextLocale}`);
    } else {
      segments[0] = nextLocale;
      router.push(`/${segments.join("/")}`);
    }

    setIsLanguageOpen(false);
    setIsOpen(false);
  };

  const headerShellClassName = isLanding
    ? "fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/28 via-black/12 to-transparent backdrop-blur-[2px]"
    : "fixed inset-x-0 top-0 z-40 border-b border-border/80 bg-night-deep/90 backdrop-blur";

  const innerShellClassName = isLanding
    ? "landing-glass flex items-center justify-between rounded-[1.1rem] px-3 py-2 sm:px-4"
    : "flex min-h-16 items-center justify-between px-4 py-2 md:px-6";

  const containerClassName = isLanding
    ? "mx-auto w-full max-w-[1600px] px-2 py-2 sm:px-3"
    : "mx-auto w-full max-w-6xl";

  const logoHref = isLanding ? `/${locale}#top` : `/${locale}`;

  const headerContent = (
    <header className={headerShellClassName} role="banner">
      <div className={containerClassName}>
        <div className={innerShellClassName}>
          <Link
            href={logoHref}
            aria-current={isHome ? "page" : undefined}
            aria-label="Ir para o início"
            className={`shrink-0 transition-opacity hover:opacity-80 ${isOpen ? "opacity-0 lg:opacity-100" : ""}`}
          >
            <Image
              src="/nja-logo-white.png"
              alt="NJA Consultoria e Marketing"
              width={174}
              height={48}
              priority
              className={isLanding ? "h-12 w-auto sm:h-14" : "h-11 w-auto"}
            />
          </Link>

          {navItems.length > 0 && (
            <nav
              className="hidden items-center gap-4 text-xs text-white/70 lg:flex xl:gap-6 xl:text-sm"
              aria-label="Navegação principal"
            >
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-3">
            <div className="relative" ref={languageRef}>
              <button
                type="button"
                onClick={() => setIsLanguageOpen((value) => !value)}
                aria-label="Alterar idioma"
                aria-expanded={isLanguageOpen}
                aria-haspopup="menu"
                aria-controls={languageMenuId}
                className={`flex min-h-11 min-w-14 items-center justify-center rounded-full border border-white/10 px-3 py-2.5 transition ${
                  isLanding
                    ? "bg-white/4 shadow-[0_10px_30px_rgba(0,0,0,0.18)] hover:bg-white/10"
                    : "bg-white/6 hover:bg-white/10"
                }`}
              >
                <Image
                  src={currentLocale.flag}
                  alt={currentLocale.label}
                  width={30}
                  height={30}
                  unoptimized
                  className="h-[1.9rem] w-[1.9rem] rounded-full object-cover"
                />
              </button>

              {isLanguageOpen && (
                <div
                  id={languageMenuId}
                  role="menu"
                  aria-label="Selecionar idioma"
                  className={`absolute right-0 mt-3 flex min-w-20 flex-col rounded-2xl border border-white/10 p-2 backdrop-blur-xl ${
                    isLanding
                      ? "bg-[#08131f]/95 shadow-[0_18px_48px_rgba(0,0,0,0.35)]"
                      : "bg-night-deep/95 shadow-[0_18px_48px_rgba(0,0,0,0.35)]"
                  }`}
                >
                  {localeOptions.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => handleLanguageChange(item.code)}
                      role="menuitemradio"
                      aria-checked={item.code === currentLocale.code}
                      className="flex min-h-12 items-center justify-center rounded-xl px-4 py-3 transition hover:bg-white/10"
                      aria-label={item.label}
                      title={item.label}
                    >
                      <Image
                        src={item.flag}
                        alt={item.label}
                        width={34}
                        height={34}
                        unoptimized
                        className="h-[2.15rem] w-[2.15rem] rounded-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {cta && (
              <div className="hidden lg:block">
                <a
                  href={cta.href}
                  className={
                    isLanding
                      ? "landing-button"
                      : "text-night-deep inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold transition hover:opacity-90"
                  }
                >
                  {cta.label}
                </a>
              </div>
            )}

            {navItems.length > 0 && (
              <button
                type="button"
                onClick={() => setIsOpen((value) => !value)}
                aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isOpen}
                aria-controls={mobileMenuId}
                className={`flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/10 lg:hidden ${
                  isOpen ? "invisible" : "visible"
                }`}
              >
                <MenuIcon />
              </button>
            )}
          </div>
        </div>
      </div>

      {navItems.length > 0 && (
        <div
          className={`fixed inset-0 z-50 lg:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
          aria-hidden={!isOpen}
        >
          <button
            type="button"
            aria-label="Fechar menu"
            className={`absolute inset-0 z-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsOpen(false)}
          />

          <aside
            id={mobileMenuId}
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            className={`absolute top-0 left-0 z-10 h-dvh w-[min(82vw,22rem)] overflow-y-auto border-r border-white/10 bg-[#08131f]/95 px-6 py-6 shadow-[0_18px_48px_rgba(0,0,0,0.35)] transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            aria-label="Menu mobile"
          >
            <div className="flex items-center justify-between gap-4">
              <Image
                src="/nja-logo-white.png"
                alt="NJA Consultoria e Marketing"
                width={174}
                height={48}
                className="h-10 w-auto"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/10"
                aria-label="Fechar menu"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="mt-10" aria-label="Menu">
              <ul className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex w-full rounded-2xl px-4 py-3 text-left text-lg font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {cta && (
              <a
                href={cta.href}
                onClick={() => setIsOpen(false)}
                className={
                  isLanding
                    ? "landing-button mt-8 flex w-full justify-center"
                    : "text-night-deep mt-8 flex w-full justify-center rounded-full bg-white px-5 py-3 font-semibold"
                }
              >
                {cta.label}
              </a>
            )}
          </aside>
        </div>
      )}
    </header>
  );

  if (!isMounted) {
    return headerContent;
  }

  return createPortal(headerContent, document.body);
}
