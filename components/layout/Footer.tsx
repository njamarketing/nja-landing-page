"use client";

import Image from "next/image";

type FooterProps = {
  locale: string;
};

export default function Footer({ locale }: FooterProps) {
  return (
    <footer className="border-border/80 bg-night-deep border-t">
      <div className="mx-auto flex min-h-24 w-full max-w-6xl items-center justify-between px-4 py-6 md:px-6">
        <Image
          src="/nja-logo-white.png"
          alt="NJA Consultoria e Marketing"
          width={174}
          height={48}
          className="h-9 w-auto"
        />
        <a
          href={`/${locale}`}
          className="text-foreground text-sm transition-opacity hover:opacity-80"
        >
          Início
        </a>
      </div>
    </footer>
  );
}
