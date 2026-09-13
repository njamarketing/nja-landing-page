import {
  ArrowUpRight,
  Check,
  Globe2,
  Layers3,
  LockKeyhole,
  MessageCircle,
  Smartphone,
  Sparkles,
} from "lucide-react";
import type { WebsiteProductCopy } from "@/data/website-product";

export default function WebsitePreview({
  copy,
}: {
  copy: WebsiteProductCopy["preview"];
}) {
  return (
    <figure className="relative mx-auto w-full max-w-xl pt-8 pb-12 lg:pt-0">
      <div className="landing-card-glow pointer-events-none absolute inset-8 rounded-full opacity-30" />
      <div className="relative rounded-[1.5rem] border border-white/15 bg-[#0b1220] p-2 shadow-[0_30px_100px_-20px_rgba(35,91,215,0.4)] sm:p-3">
        <div className="flex items-center gap-3 px-2 pt-1 pb-3 sm:gap-5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2 rounded-full bg-white/25" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/10" />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-md border border-white/5 bg-black/30 py-1.5 text-[10px] text-white/55">
            <LockKeyhole className="size-2.5" aria-hidden="true" />
            {copy.address}
          </div>
          <ArrowUpRight className="size-3 text-white/35" aria-hidden="true" />
        </div>

        <div className="overflow-hidden rounded-[.85rem] bg-[#f2f5f5] text-[#11242b]">
          <div className="flex items-center justify-between border-b border-black/6 px-5 py-4 sm:px-7">
            <span className="font-display text-base font-bold tracking-tight">
              {copy.brand}
            </span>
            <div
              className="flex items-center gap-3 text-[8px]"
              aria-hidden="true"
            >
              <span className="hidden sm:inline">{copy.services}</span>
              <span className="rounded-full bg-[#11242b] px-3 py-1.5 text-white">
                {copy.action}
              </span>
            </div>
          </div>
          <div className="relative isolate overflow-hidden px-5 pt-8 pb-7 sm:px-7 sm:pt-10">
            <div
              className="pointer-events-none absolute -top-7 -right-14 -z-10 size-64 rounded-full border-[32px] border-[#b5d6e1]/50 sm:size-80 sm:border-[48px]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute top-14 right-10 -z-10 size-36 rounded-full bg-gradient-to-br from-[#235bd7] to-[#3ee5fa] opacity-15 blur-2xl"
              aria-hidden="true"
            />
            <span className="text-[8px] font-semibold tracking-[.18em] text-[#446c7a]">
              {copy.tag}
            </span>
            <p className="font-display mt-4 max-w-[16rem] text-[1.75rem] leading-[1.08] font-semibold tracking-tight sm:max-w-[20rem] sm:text-[2.35rem]">
              {copy.title}
            </p>
            <p className="mt-4 max-w-48 text-[10px] leading-relaxed text-[#526a72] sm:max-w-60 sm:text-xs">
              {copy.description}
            </p>
            <span className="mt-5 inline-flex items-center gap-4 rounded-full bg-[#11242b] px-4 py-2.5 text-[9px] font-medium text-white">
              {copy.action}
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </span>
          </div>
          <div className="px-5 pb-7 sm:px-7">
            <div className="mb-3 h-px bg-black/10" />
            <p className="text-[10px] font-semibold">{copy.services}</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[Layers3, Sparkles, Globe2].map((Icon, index) => (
                <div
                  key={copy.cards[index]}
                  className="rounded-lg border border-[#d7e1e3] bg-white/70 p-3"
                >
                  <Icon
                    className="size-4 text-[#235bd7]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-[8px] font-medium sm:text-[10px]">
                    {copy.cards[index]}
                  </p>
                  <div
                    className="mt-2 h-1 w-full rounded-full bg-[#dce5e8]"
                    aria-hidden="true"
                  />
                  <div
                    className="mt-1 h-1 w-2/3 rounded-full bg-[#e5ecee]"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 px-2 pt-3 pb-1 text-[9px] text-white/55 sm:text-[10px]">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            {copy.status}
          </span>
          <span className="flex items-center gap-1.5">
            <Smartphone className="size-3" aria-hidden="true" />
            {copy.mobile}
          </span>
        </div>
      </div>

      <div className="absolute -bottom-1 left-4 flex items-center gap-3 rounded-2xl border border-brand-cyan/20 bg-[#0a1827]/95 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,.4)] backdrop-blur-xl sm:-left-5 sm:px-5 sm:py-4">
        <div className="flex size-10 items-center justify-center rounded-xl border border-brand-cyan/20 bg-brand-cyan/10 text-brand-cyan">
          <MessageCircle className="size-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-medium text-white sm:text-sm">
            {copy.floating}
          </p>
          <p className="mt-1 text-[10px] text-white/55 sm:text-xs">
            {copy.floatingDetail}
          </p>
        </div>
        <Check className="ml-2 size-4 text-brand-cyan" aria-hidden="true" />
      </div>
      <figcaption className="absolute inset-x-0 -bottom-10 px-4 text-center text-[10px] leading-5 text-white/45">
        {copy.caption}
      </figcaption>
    </figure>
  );
}
