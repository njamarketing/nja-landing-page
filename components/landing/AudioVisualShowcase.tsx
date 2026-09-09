"use client";

import { Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SectionReveal from "@/components/landing/SectionReveal";

type VideoItem = {
  id: string;
  title: string;
  label: string;
};

type AudioVisualShowcaseProps = {
  badge: string;
  title: string;
  description: string;
  supportText: string;
  videos: readonly VideoItem[];
};

export default function AudioVisualShowcase({
  badge,
  title,
  description,
  supportText,
  videos,
}: AudioVisualShowcaseProps) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <section
        aria-labelledby="audio-visual-title"
        className="relative px-4 py-24 sm:px-6 md:py-32"
      >
        <div className="landing-divider" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(62,229,250,0.12),transparent_27%),radial-gradient(circle_at_18%_72%,rgba(35,91,215,0.18),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="pointer-events-none absolute top-0 right-[-4rem] hidden w-[28rem] lg:block xl:right-[-1rem] xl:w-[33rem]">
            <Image
              src="/images/video-ninja.png"
              alt=""
              width={1536}
              height={1024}
              sizes="(min-width: 1280px) 33rem, 28rem"
              className="h-auto w-full object-contain drop-shadow-[0_20px_55px_rgba(35,91,215,0.26)]"
            />
          </div>

          <SectionReveal className="relative z-10 max-w-3xl">
            <div className="landing-pill">
              <span className="landing-pill-dot" />
              {badge}
            </div>
            <h2
              id="audio-visual-title"
              className="mt-6 text-4xl leading-[1.02] font-bold text-white md:text-6xl"
            >
              {title}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{description}</p>
            <p className="text-brand-cyan mt-4 max-w-2xl text-base leading-7">{supportText}</p>
          </SectionReveal>

          <div className="pointer-events-none mx-auto mt-2 w-full max-w-sm lg:hidden">
            <Image
              src="/images/video-ninja.png"
              alt=""
              width={1536}
              height={1024}
              sizes="(max-width: 640px) 90vw, 24rem"
              className="h-auto w-full object-contain drop-shadow-[0_20px_55px_rgba(35,91,215,0.26)]"
            />
          </div>

          <div className="mt-20 grid gap-5 md:mt-24 md:grid-cols-3">
            {videos.map((video, index) => (
              <SectionReveal key={video.id} delay={0.08 + index * 0.08} distance={22}>
                <button
                  type="button"
                  onClick={() => setActiveVideo(video)}
                  className="landing-glass landing-panel group hover:border-brand-cyan/35 relative block w-full overflow-hidden rounded-[1.8rem] border border-white/10 text-left transition hover:-translate-y-1"
                  aria-label={`Assistir ${video.title}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#07101d]">
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt=""
                      className="h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,11,0.08),rgba(3,5,11,0.88))]" />
                    <span className="absolute top-5 left-5 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-white/80 uppercase">
                      {video.label}
                    </span>
                    <span className="group-hover:bg-brand-cyan absolute top-1/2 left-1/2 flex h-15 w-15 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/12 text-white backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:text-[#02050d]">
                      <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true" />
                    </span>
                    <div className="absolute right-5 bottom-5 left-5">
                      <div className="text-sm font-semibold text-white">{video.title}</div>
                      <div className="mt-1 text-xs tracking-[0.13em] text-white/56 uppercase">
                        Abrir filme
                      </div>
                    </div>
                  </div>
                </button>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02040a]/95 p-4 backdrop-blur-xl md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`Vídeo: ${activeVideo.title}`}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Fechar vídeo"
            onClick={() => setActiveVideo(null)}
          />
          <div className="relative z-10 w-full max-w-6xl">
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="landing-glass-strong hover:border-brand-cyan/50 hover:text-brand-cyan absolute -top-14 right-0 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition"
              aria-label="Fechar vídeo"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="overflow-hidden rounded-[1.5rem] border border-white/12 bg-black shadow-[0_28px_90px_rgba(0,0,0,0.6)]">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
