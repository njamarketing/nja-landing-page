"use client";

import { useEffect, useRef } from "react";

type SectionPlayVideoProps = {
  src: string;
  className?: string;
  label: string;
};

export default function SectionPlayVideo({
  src,
  className,
  label,
}: SectionPlayVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wasVisibleRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;

    if (!container || !video) {
      return;
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (!entry) {
        return;
      }

      if (entry.isIntersecting) {
        wasVisibleRef.current = true;
        void video.play().catch(() => {
          wasVisibleRef.current = false;
        });
        return;
      }

      if (!wasVisibleRef.current) {
        return;
      }

      wasVisibleRef.current = false;
      video.pause();
      video.currentTime = 0;
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "240px 0px",
      threshold: 0.1,
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <video
        ref={videoRef}
        className={className}
        muted
        playsInline
        preload="auto"
        aria-label={label}
        disablePictureInPicture
      >
        <source src={src} type="video/mp4" />
        Seu navegador não suporta a reprodução deste vídeo.
      </video>
    </div>
  );
}
