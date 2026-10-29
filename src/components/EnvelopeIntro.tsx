"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MailOpen } from "lucide-react";
import { FloatingDecor } from "@/components/FloatingDecor";
import { FlowerDoodle } from "@/components/Doodles";
import { friendshipConfig } from "@/data/friendship-config";

type EnvelopeIntroProps = {
  open: boolean;
  onOpen: () => void;
};

export function EnvelopeIntro({ open, onOpen }: EnvelopeIntroProps) {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<"idle" | "flap" | "letter">("idle");

  const begin = () => {
    if (stage !== "idle") return;
    if (reduce) {
      onOpen();
      return;
    }
    setStage("flap");
    window.setTimeout(() => setStage("letter"), 520);
    window.setTimeout(() => onOpen(), 1150);
  };

  return (
    <AnimatePresence>
      {!open && (
        <motion.section
          key="intro"
          className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-10"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: reduce ? 0 : -24 }}
          transition={{ duration: reduce ? 0.2 : 0.55, ease: "easeInOut" }}
          aria-label="Friendship surprise envelope"
        >
          <FloatingDecor />
          <div className="relative z-10 mx-auto w-full max-w-xl text-center">
            <p className="font-script text-2xl text-sage sm:text-3xl">
              {friendshipConfig.introEyebrow}
            </p>
            <h1 className="mt-2 font-serif text-4xl text-ink sm:text-6xl">
              {friendshipConfig.introHeadline}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
              {friendshipConfig.introSubhead}
            </p>

            <div className="relative mx-auto mt-10 h-[300px] w-full max-w-[360px] sm:h-[340px]" style={{ perspective: "1200px" }}>
              <motion.div
                className="absolute inset-x-10 top-16 h-[70%] rounded-md bg-[#fff8ee] p-5 text-left shadow-[0_18px_40px_rgba(80,58,42,0.18)]"
                initial={{ y: 36, opacity: 0 }}
                animate={
                  stage === "letter"
                    ? { y: -28, opacity: 1 }
                    : { y: 36, opacity: stage === "idle" ? 0 : 0.4 }
                }
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <p className="font-script text-2xl text-pink">for {friendshipConfig.friendName}</p>
                <p className="mt-3 font-serif text-lg leading-snug text-ink">
                  A scrapbook, a letter, and a few secrets tucked between the pages.
                </p>
              </motion.div>

              <div className="absolute inset-x-0 bottom-0 z-10 h-[62%] overflow-hidden rounded-b-[18px] bg-[#e8c9a4] shadow-[0_20px_36px_rgba(80,58,42,0.2)]">
                <div className="absolute inset-x-0 top-0 h-16 bg-[#d9b48c]" />
                <div className="absolute left-1/2 top-8 h-16 w-16 -translate-x-1/2 rounded-full bg-wax shadow-inner" />
                <FlowerDoodle className="absolute bottom-3 right-4 h-12 w-12 text-sage/70" />
              </div>

              <motion.div
                className="absolute inset-x-0 top-0 z-20 h-[46%] origin-top"
                initial={{ rotateX: 0 }}
                animate={{ rotateX: stage === "idle" ? 0 : -168 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                  transformStyle: "preserve-3d",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background: "linear-gradient(180deg, #f3d5b5 0%, #e2b48c 100%)",
                  backfaceVisibility: "hidden",
                }}
              />
            </div>

            <button
              type="button"
              onClick={begin}
              disabled={stage !== "idle"}
              className="mt-8 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-sage px-6 py-3 font-semibold text-paper shadow-[0_10px_24px_rgba(63,83,64,0.25)] transition duration-200 hover:bg-sage-deep hover:scale-[1.02] active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
            >
              <MailOpen className="h-5 w-5" aria-hidden="true" />
              {stage === "idle" ? friendshipConfig.openButtonLabel : "Opening..."}
            </button>
            <p className="mt-3 text-sm text-ink-soft">No rush. Open it whenever you are ready.</p>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
