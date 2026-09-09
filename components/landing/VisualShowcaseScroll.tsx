"use client";

import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Heart, MessageCircle, Send } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

type VisualCard = {
  label: string;
  image: string;
  profile: {
    avatarSrc: string;
    company: string;
    name: string;
    text: string;
  };
};

type VisualShowcaseScrollProps = {
  rows: VisualCard[][];
};

type LikedPostsState = Record<string, boolean>;

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-none stroke-current">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function getRowLayoutClass(rowIndex: number) {
  const patternIndex = rowIndex % 3;

  if (patternIndex === 0) {
    return "w-[280%] grid-cols-5 -translate-x-[36%] sm:w-[175%] sm:grid-cols-5 sm:-translate-x-[18%] xl:w-[125%] xl:grid-cols-5 xl:-translate-x-[12.5%]";
  }

  if (patternIndex === 1) {
    return "w-[280%] grid-cols-5 sm:w-[175%] sm:grid-cols-5 xl:w-[125%] xl:grid-cols-5";
  }

  return "w-[336%] grid-cols-6 -translate-x-[40%] sm:w-[210%] sm:grid-cols-6 sm:-translate-x-[20%] xl:w-[150%] xl:grid-cols-6 xl:-translate-x-[12.5%]";
}

function reorderRow(row: VisualCard[], shift: number) {
  const normalizedShift = shift % row.length;

  return [...row.slice(normalizedShift), ...row.slice(0, normalizedShift)];
}

function getCardKey(card: VisualCard) {
  return `${card.label}-${card.image}-${card.profile.company}`;
}

function getBaseLikes(card: VisualCard) {
  const source = getCardKey(card);

  return (Array.from(source).reduce((total, char) => total + char.charCodeAt(0), 0) % 180) + 120;
}

const ShowcaseGrid = memo(function ShowcaseGrid({
  rows,
  onSelect,
  className = "",
}: {
  rows: VisualCard[][];
  onSelect: (card: VisualCard) => void;
  className?: string;
}) {
  return (
    <div className={`max-w-full space-y-3 overflow-hidden px-3 xl:space-y-4 xl:px-0 ${className}`}>
      {rows.map((row, rowIndex) => (
        <div
          key={`showcase-row-${rowIndex}`}
          className={`grid auto-rows-fr gap-3 overflow-hidden xl:gap-4 ${getRowLayoutClass(
            rowIndex
          )}`}
        >
          {row.map((card, cardIndex) => (
            <button
              key={`${card.label}-${rowIndex}-${cardIndex}`}
              type="button"
              onClick={() => onSelect(card)}
              className="group focus-visible:ring-ring/50 block cursor-pointer overflow-hidden rounded-[1.8rem] border border-white/8 bg-white/[0.035] text-left shadow-[var(--shadow-card)] outline-none focus-visible:ring-3"
              aria-label={`Abrir visual de ${card.label}`}
              aria-haspopup="dialog"
            >
              <div className="relative aspect-[1/1.28] sm:aspect-[1/1.02] xl:aspect-[5/4]">
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  sizes="(max-width: 640px) 60vw, (max-width: 1280px) 35vw, 20vw"
                  quality={72}
                  className="object-cover opacity-82 transition duration-500 group-hover:scale-110 group-focus-visible:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/36 to-black/10" />
              </div>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
});

export default function VisualShowcaseScroll({ rows }: VisualShowcaseScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [selectedCard, setSelectedCard] = useState<VisualCard | null>(null);
  const [likedPosts, setLikedPosts] = useState<LikedPostsState>({});
  const revealedRows = useMemo(
    () => [reorderRow(rows[0], 2), reorderRow(rows[1], 1), reorderRow(rows[2], 3)],
    [rows]
  );
  const handleSelectCard = useCallback((card: VisualCard) => setSelectedCard(card), []);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.68, 1], [1, 1.08, 1]);
  const revealBottom = useTransform(scrollYProgress, [0.08, 0.56], [100, 0]);
  const revealClipPath = useMotionTemplate`inset(0% 0% ${revealBottom}% 0%)`;

  useEffect(() => {
    const savedLikes = window.localStorage.getItem("nja-liked-posts");

    if (!savedLikes) {
      return;
    }

    try {
      setLikedPosts(JSON.parse(savedLikes) as LikedPostsState);
    } catch {
      window.localStorage.removeItem("nja-liked-posts");
    }
  }, []);

  function handleToggleLike(card: VisualCard) {
    const cardKey = getCardKey(card);

    setLikedPosts((current) => {
      const nextState = {
        ...current,
        [cardKey]: !current[cardKey],
      };

      window.localStorage.setItem("nja-liked-posts", JSON.stringify(nextState));

      return nextState;
    });
  }

  const selectedCardKey = selectedCard ? getCardKey(selectedCard) : null;
  const isSelectedCardLiked = selectedCardKey ? Boolean(likedPosts[selectedCardKey]) : false;
  const selectedCardLikes = selectedCard
    ? getBaseLikes(selectedCard) + (isSelectedCardLiked ? 1 : 0)
    : 0;

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-[180vh] overflow-hidden py-20 md:min-h-[280vh] md:py-32"
        aria-label="Galeria visual de campanhas e resultados"
      >
        <div className="landing-divider landing-divider-blue" />
        <div className="sticky top-0 flex min-h-screen max-w-full items-center overflow-hidden">
          <div className="relative isolate w-full max-w-full overflow-hidden">
            <motion.div
              className="relative z-10 w-full origin-center transform-gpu will-change-transform"
              style={reduceMotion ? undefined : { scale }}
            >
              <ShowcaseGrid rows={rows} onSelect={handleSelectCard} />
              <motion.div
                className="overflow-hidden [will-change:clip-path] [contain:paint]"
                style={reduceMotion ? undefined : { clipPath: revealClipPath }}
              >
                <ShowcaseGrid
                  rows={revealedRows}
                  onSelect={handleSelectCard}
                  className="pt-3 xl:pt-4"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Dialog open={Boolean(selectedCard)} onOpenChange={(open) => !open && setSelectedCard(null)}>
        {selectedCard ? (
          <DialogContent className="max-w-[min(96vw,1380px)] p-0">
            <DialogHeader className="sr-only">
              <DialogTitle>{selectedCard.label}</DialogTitle>
              <DialogDescription>
                Post visual com imagem da campanha e comentario em destaque.
              </DialogDescription>
            </DialogHeader>
            <DialogClose />

            <div className="grid max-h-[94vh] min-h-[36rem] overflow-hidden md:grid-cols-[minmax(0,1.45fr)_minmax(420px,0.75fr)]">
              <div className="relative min-h-[24rem] bg-[#050505] md:min-h-[82vh]">
                <Image
                  src={selectedCard.image}
                  alt={selectedCard.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>

              <div className="flex min-h-0 flex-col bg-[#0b0b0d]">
                <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                  <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-black/30 p-1.5">
                    <Image
                      src="/nja-logo-white.png"
                      alt="NJA Marketing"
                      width={42}
                      height={42}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {selectedCard.profile.company}
                    </p>
                    <p className="truncate text-xs text-white/60">NJA Marketing</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] font-medium tracking-[0.18em] text-white/72 uppercase">
                    <InstagramGlyph />
                    Post
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-black/30 p-1.5">
                      <Image
                        src="/nja-logo-white.png"
                        alt="NJA Marketing"
                        width={36}
                        height={36}
                        className="h-auto w-full object-contain"
                      />
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm leading-7 text-white/88">
                        <span className="mr-2 font-semibold text-white">
                          {selectedCard.profile.company}
                        </span>
                        {selectedCard.profile.text}
                      </p>
                      <p className="text-[0.72rem] tracking-[0.18em] text-white/38 uppercase">
                        parceria com NJA Marketing
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 px-5 py-4">
                  <div className="flex items-center gap-4 text-white">
                    <button
                      type="button"
                      onClick={() => handleToggleLike(selectedCard)}
                      className={`transition ${
                        isSelectedCardLiked ? "text-[#ff4d6d]" : "text-white hover:text-[#ff4d6d]"
                      }`}
                      aria-label={isSelectedCardLiked ? "Descurtir post" : "Curtir post"}
                    >
                      <Heart
                        className="h-5 w-5"
                        fill={isSelectedCardLiked ? "currentColor" : "none"}
                      />
                    </button>
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    <Send className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-white">
                    {selectedCardLikes.toLocaleString("pt-BR")} curtidas
                  </p>
                  <p className="mt-2 text-xs text-white/46">Há poucos instantes</p>
                </div>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  );
}
