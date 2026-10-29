"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FlowerDoodle, HeartDoodle, StarDoodle } from "@/components/Doodles";
import { friendshipConfig } from "@/data/friendship-config";

export function EasterEggs() {
  const [active, setActive] = useState<string | null>(null);
  const egg = friendshipConfig.easterEggs.find((item) => item.id === active);

  return (
    <>
      <button
        type="button"
        className="absolute right-[8%] top-24 z-20 cursor-pointer text-lavender transition hover:scale-110"
        onClick={() => setActive("egg-star")}
        aria-label="A hidden star"
      >
        <StarDoodle className="h-7 w-7" />
      </button>
      <button
        type="button"
        className="absolute left-[6%] top-[42%] z-20 cursor-pointer text-sage transition hover:rotate-12"
        onClick={() => setActive("egg-sticker")}
        aria-label="A hidden flower sticker"
      >
        <FlowerDoodle className="h-14 w-14" />
      </button>
      <button
        type="button"
        className="absolute bottom-28 right-[10%] z-20 cursor-pointer text-pink transition hover:scale-110"
        onClick={() => setActive("egg-note")}
        aria-label="A hidden margin note"
      >
        <HeartDoodle className="h-8 w-8" />
      </button>

      <AnimatePresence>
        {egg && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#3a2f28]/45 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={egg.title}
          >
            <motion.div
              className="paper-sheet max-w-md rounded-md p-6"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <p className="font-script text-2xl text-sage">You found a secret</p>
              <h3 className="mt-1 font-serif text-3xl text-ink">{egg.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-soft">{egg.message}</p>
              <button
                type="button"
                className="mt-6 min-h-11 cursor-pointer rounded-full bg-ink px-4 text-paper"
                onClick={() => setActive(null)}
              >
                Tuck it back
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
