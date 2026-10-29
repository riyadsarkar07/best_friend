"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { PolaroidArt } from "@/components/PolaroidArt";
import { SectionFrame } from "@/components/SectionFrame";
import { PaperClip } from "@/components/Doodles";
import { friendshipConfig, type GalleryPhoto } from "@/data/friendship-config";
import { tiltFromId } from "@/lib/scrapbook";

export function MemoryGallery() {
  const photos = friendshipConfig.gallery;
  const [active, setActive] = useState<number | null>(null);
  const [lastFocused, setLastFocused] = useState<HTMLElement | null>(null);

  const close = useCallback(() => setActive(null), []);

  const go = useCallback(
    (direction: 1 | -1) => {
      setActive((index) =>
        index === null ? index : (index + direction + photos.length) % photos.length,
      );
    },
    [photos.length],
  );

  useEffect(() => {
    if (active === null) {
      lastFocused?.focus();
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, close, go, lastFocused]);

  const open = (index: number) => {
    setLastFocused(document.activeElement as HTMLElement | null);
    setActive(index);
  };

  return (
    <SectionFrame
      id="gallery"
      eyebrow={friendshipConfig.galleryEyebrow}
      title={friendshipConfig.galleryTitle}
      intro={friendshipConfig.galleryIntro}
      tone="sage"
      aside={
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-gold/25 bg-gold-soft/25 px-4 py-3 text-[0.82rem] leading-relaxed text-ink-soft">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" aria-hidden="true" />
          {friendshipConfig.galleryNote}
        </p>
      }
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
        {photos.map((photo, index) => (
          <PolaroidCard
            key={photo.id}
            photo={photo}
            index={index}
            onOpen={() => open(index)}
          />
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <Lightbox
            photo={photos[active]}
            index={active}
            total={photos.length}
            onClose={close}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
          />
        )}
      </AnimatePresence>
    </SectionFrame>
  );
}

function PolaroidCard({
  photo,
  index,
  onOpen,
}: {
  photo: GalleryPhoto;
  index: number;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const tilt = tiltFromId(photo.id, 5);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.07, ease: [0.22, 0.61, 0.36, 1] }}
      className="group relative mx-auto w-full max-w-[21rem]"
      style={{ rotate: tilt }}
    >
      <PaperClip className="pointer-events-none absolute -top-3 left-4 z-20 h-10 w-5 rotate-[-8deg] text-ink-faint/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <button
        type="button"
        onClick={onOpen}
        className="paper-sheet block w-full cursor-pointer rounded-[5px] p-3 pb-12 text-left transition-[transform,box-shadow] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[var(--shadow-md)]"
        aria-label={`Open photo: ${photo.caption}`}
      >
        <span className="tape absolute left-1/2 top-1 h-4 w-20 -translate-x-1/2 -rotate-1" aria-hidden="true" />
        <span className="relative block aspect-[4/5] overflow-hidden rounded-[2px] bg-cream-deep">
          {photo.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo.src}
              alt={photo.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <span className="block h-full w-full transition-transform duration-700 group-hover:scale-[1.03]">
              <PolaroidArt photo={photo} />
            </span>
          )}
          <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/5" aria-hidden="true" />
          <span className="absolute bottom-2.5 right-2.5 grid h-9 w-9 place-items-center rounded-full bg-paper/90 text-ink opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </span>
        </span>
        <span className="mt-3.5 flex items-start justify-between gap-3 px-0.5">
          <span className="script text-[1.55rem] leading-tight text-ink">{photo.caption}</span>
          <span className="mt-1.5 shrink-0 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
            {photo.date}
          </span>
        </span>
      </button>
    </motion.div>
  );
}

function Lightbox({
  photo,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  photo: GalleryPhoto;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#241f1a]/62 p-3 backdrop-blur-[3px] sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${total}: ${photo.caption}`}
    >
      <motion.div
        ref={dialogRef}
        className="paper-sheet relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-[6px] p-3 sm:p-5"
        initial={reduce ? { opacity: 0 } : { y: 28, scale: 0.97, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={reduce ? { opacity: 0 } : { y: 16, scale: 0.985, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-1 pb-3">
          <div className="min-w-0">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-ink-faint">
              Polaroid {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <h3 className="serif-display mt-1 truncate text-2xl text-ink sm:text-3xl">
              {photo.caption}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full border border-line bg-cream/80 text-ink transition hover:bg-cream"
            aria-label="Close photo"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1.05fr_0.95fr] sm:gap-5">
          <div className="relative overflow-hidden rounded-[3px] bg-cream-deep">
            <div className="aspect-[4/5]">
              {photo.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
              ) : (
                <PolaroidArt photo={photo} />
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 px-1 pb-1">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-faint">
                {photo.date}
              </p>
              <p className="script mt-2 text-2xl leading-tight text-ink">{photo.caption}</p>
              <div className="hairline my-3" />
              <p className="text-[0.94rem] leading-relaxed text-ink-soft">{photo.note}</p>
              {!photo.src && (
                <p className="mt-4 rounded-lg bg-peach-soft/70 px-3 py-2 text-[0.76rem] leading-relaxed text-ink-soft">
                  Placeholder artwork. Add a real photo path in{" "}
                  <code className="rounded bg-paper/70 px-1 py-0.5 text-[0.72rem]">
                    src/data/friendship-config.ts
                  </code>
                  .
                </p>
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onPrev}
                className="btn btn-paper min-h-11 min-w-11 px-0"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="flex items-center gap-1.5" aria-hidden="true">
                {Array.from({ length: total }).map((_, dot) => (
                  <span
                    key={dot}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dot === index ? "w-5 bg-sage" : "w-1.5 bg-line"
                    }`}
                  />
                ))}
              </span>
              <button
                type="button"
                onClick={onNext}
                className="btn btn-paper min-h-11 min-w-11 px-0"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
