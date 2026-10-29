"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { PolaroidArt } from "@/components/PolaroidArt";
import { SectionFrame } from "@/components/SectionFrame";
import { friendshipConfig, type GalleryPhoto } from "@/data/friendship-config";
import { tiltFromId } from "@/lib/scrapbook";

export function MemoryGallery() {
  const photos = friendshipConfig.gallery;
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % photos.length));
      if (event.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, photos.length]);

  return (
    <SectionFrame
      id="gallery"
      kicker="Polaroids on the table"
      title="Memory gallery"
      intro="These frames are waiting for your photographs. Until you add them, each one is an honest placeholder, not a pretend memory."
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <PolaroidCard
            key={photo.id}
            photo={photo}
            onOpen={() => setActive(index)}
          />
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#3a2f28]/55 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={photos[active].caption}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="paper-sheet relative w-full max-w-xl rounded-sm p-4 sm:p-6"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="aspect-[4/5] overflow-hidden bg-cream-deep">
                {photos[active].src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photos[active].src}
                    alt={photos[active].alt}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <PolaroidArt photo={photos[active]} />
                )}
              </div>
              <p className="mt-4 font-script text-3xl text-ink">{photos[active].caption}</p>
              <p className="text-sm uppercase tracking-[0.2em] text-ink-soft">{photos[active].date}</p>
              <p className="mt-2 text-ink-soft">{photos[active].note}</p>
              <p className="mt-3 rounded-md bg-peach-soft/70 px-3 py-2 text-sm text-ink">
                Placeholder artwork only. Add a real photo path in src/data/friendship-config.ts.
              </p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full bg-sage-soft text-sage-deep"
                  onClick={() => setActive((i) => (i === null ? i : (i - 1 + photos.length) % photos.length))}
                  aria-label="Previous photograph"
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-ink px-4 text-paper"
                  onClick={() => setActive(null)}
                >
                  <X className="h-4 w-4" />
                  Close
                </button>
                <button
                  type="button"
                  className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full bg-sage-soft text-sage-deep"
                  onClick={() => setActive((i) => (i === null ? i : (i + 1) % photos.length))}
                  aria-label="Next photograph"
                >
                  <ChevronRight />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionFrame>
  );
}

function PolaroidCard({ photo, onOpen }: { photo: GalleryPhoto; onOpen: () => void }) {
  const tilt = tiltFromId(photo.id);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative mx-auto w-full max-w-sm cursor-pointer text-left"
      style={{ transform: `rotate(${tilt}deg)` }}
      aria-label={`Open ${photo.caption}`}
    >
      <span className="washi absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2" />
      <span className="paper-sheet block rounded-sm p-3 pb-10 transition duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_22px_40px_rgba(80,58,42,0.16)]">
        <span className="block aspect-[4/5] overflow-hidden bg-cream-deep">
          {photo.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
          ) : (
            <PolaroidArt photo={photo} />
          )}
        </span>
        <span className="mt-4 block font-script text-2xl text-ink">{photo.caption}</span>
        <span className="block text-xs uppercase tracking-[0.18em] text-ink-soft">{photo.date}</span>
      </span>
    </button>
  );
}
