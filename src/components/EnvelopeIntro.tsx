"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, MailOpen } from "lucide-react";
import { FloatingDecor } from "@/components/FloatingDecor";
import { FlowerDoodle, HeartDoodle, LeafSprig, Sparkle, Squiggle } from "@/components/Doodles";
import { friendshipConfig } from "@/data/friendship-config";

type Stage = "idle" | "opening" | "reading" | "leaving";

export function EnvelopeIntro({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<Stage>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useEffect(() => {
    if (!open) setStage("idle");
  }, [open]);

  const begin = () => {
    if (stage !== "idle") return;
    if (reduce) {
      onOpen();
      return;
    }
    setStage("opening");
    timers.current.push(
      window.setTimeout(() => setStage("reading"), 760),
      window.setTimeout(() => setStage("leaving"), 1780),
      window.setTimeout(() => onOpen(), 2280),
    );
  };

  const opening = stage !== "idle";
  const reading = stage === "reading" || stage === "leaving";

  return (
    <AnimatePresence>
      {!open && (
        <motion.section
          key="intro"
          className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-10 sm:py-14"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: reduce ? 1 : 1.015 }}
          transition={{ duration: reduce ? 0.2 : 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          aria-label="Friendship surprise envelope"
        >
          <FloatingDecor dense />

          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cream/70 to-transparent"
            aria-hidden="true"
          />

          <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
                <p className="eyebrow">{friendshipConfig.introEyebrow}</p>
                <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
              </div>

              <h1 className="serif-display balance mt-4 text-[2.6rem] text-ink sm:text-6xl">
                {friendshipConfig.introHeadline}
              </h1>

              <p className="pretty mt-4 max-w-lg text-[1.02rem] leading-relaxed text-ink-soft sm:text-lg">
                {friendshipConfig.introSubhead}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative mt-9 w-full max-w-[30rem] sm:mt-12"
            >
              <Sparkle className="absolute -left-2 -top-5 h-6 w-6 animate-twinkle text-gold/70 sm:-left-4" />
              <HeartDoodle className="absolute -right-1 top-2 h-5 w-5 -rotate-12 text-blush/70 sm:-right-3" />

              <div
                className="relative mx-auto aspect-[1.42/1] w-full"
                style={{ perspective: "1400px" }}
              >
                {/* envelope back */}
                <div className="absolute inset-0 overflow-hidden rounded-[10px] bg-[#e8d3b4] shadow-[var(--shadow-md)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f1e2c9] via-[#e6cfae] to-[#d8bd99]" />
                  <div className="absolute inset-0 opacity-[0.18] mix-blend-multiply [background-image:repeating-linear-gradient(45deg,#8f7a5f_0_1px,transparent_1px_9px)]" />
                </div>

                {/* letter rising from envelope */}
                <motion.div
                  className="absolute inset-x-[8%] top-[14%] z-10 h-[96%] rounded-[6px] bg-paper shadow-[0_10px_30px_rgba(74,56,40,0.22)]"
                  initial={false}
                  animate={
                    reading
                      ? { y: "-46%", opacity: 1, rotate: -0.6 }
                      : { y: "12%", opacity: opening ? 1 : 0 }
                  }
                  transition={{ duration: reduce ? 0 : 0.72, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <div className="flex h-full flex-col justify-between px-6 py-5 text-left">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="script text-2xl leading-none text-blush-deep">for</p>
                        <p className="serif-display mt-1 text-3xl leading-none text-ink">
                          {friendshipConfig.friendName}
                        </p>
                      </div>
                      <div className="grid h-11 w-9 place-items-center rounded-[3px] border border-dashed border-wax/45 text-center text-[0.5rem] font-bold uppercase leading-tight tracking-[0.1em] text-wax/80">
                        <span>
                          made
                          <br />
                          by
                          <br />
                          hand
                        </span>
                      </div>
                    </div>

                    <div className="max-w-[19rem]">
                      <div className="hairline mb-3" />
                      <p className="script text-[1.55rem] leading-snug text-ink">
                        A scrapbook, a letter, and a few secrets tucked between the pages.
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                        {friendshipConfig.introStamp}
                      </p>
                      <FlowerDoodle className="h-8 w-8 text-sage/50" />
                    </div>
                  </div>
                </motion.div>

                {/* envelope front pocket */}
                <div className="absolute inset-0 z-20 overflow-hidden rounded-[10px]">
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: "polygon(0 100%, 0 16%, 50% 66%, 100% 16%, 100% 100%)",
                      background: "linear-gradient(165deg, #f6e8cf 0%, #ecd8b8 48%, #dfc4a0 100%)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-[0.5]"
                    style={{
                      clipPath: "polygon(0 100%, 0 16%, 50% 66%, 100% 16%, 100% 100%)",
                      background:
                        "linear-gradient(112deg, rgba(255,255,255,0.55) 0%, transparent 32%), linear-gradient(248deg, rgba(170,140,102,0.28) 0%, transparent 34%)",
                    }}
                  />
                </div>

                {/* flap */}
                <motion.div
                  className="absolute inset-x-0 top-0 z-30 h-[62%] origin-top"
                  initial={false}
                  animate={{ rotateX: opening ? -172 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.78, ease: [0.4, 0.06, 0.2, 1] }}
                  style={{
                    transformStyle: "preserve-3d",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: "linear-gradient(180deg, #f7ead3 0%, #eed9b8 62%, #e2c8a3 100%)",
                    boxShadow: "0 10px 20px -12px rgba(74,56,40,0.45)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <HeartDoodle className="absolute left-1/2 top-[46%] h-4 w-4 -translate-x-1/2 text-wax/25" />
                </motion.div>

                {/* wax seal button */}
                <div className="absolute left-1/2 top-[58%] z-40 -translate-x-1/2 -translate-y-1/2">
                  <AnimatePresence>
                    {!opening && (
                      <motion.button
                        type="button"
                        onClick={begin}
                        exit={{ scale: 0.6, opacity: 0 }}
                        whileHover={reduce ? undefined : { scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="group grid h-[4.6rem] w-[4.6rem] cursor-pointer place-items-center rounded-full border border-[#7c3236] bg-[radial-gradient(circle_at_34%_28%,#c06a6c,#9c4a4e_46%,#7c3236_100%)] text-paper shadow-[inset_0_2px_4px_rgba(255,255,255,0.32),inset_0_-4px_8px_rgba(0,0,0,0.3),0_14px_26px_-12px_rgba(124,50,54,0.85)] animate-seal sm:h-20 sm:w-20"
                        aria-label={`${friendshipConfig.introSealNote} and open your surprise`}
                      >
                        <span className="pointer-events-none flex flex-col items-center gap-0.5">
                          <HeartDoodle className="h-5 w-5 opacity-90 transition-transform duration-300 group-hover:scale-110" />
                          <span className="text-[0.5rem] font-bold uppercase tracking-[0.14em]">
                            press
                          </span>
                        </span>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                {/* postmark */}
                <div
                  className="pointer-events-none absolute -right-3 -top-4 z-20 hidden rotate-6 select-none rounded-full border-2 border-dashed border-sage/35 px-3 py-2 text-center text-[0.5rem] font-bold uppercase leading-tight tracking-[0.16em] text-sage/70 sm:block"
                  aria-hidden="true"
                >
                  <span className="block">with love</span>
                  <span className="block">first class</span>
                </div>
              </div>
            </motion.div>

            <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10">
              <button
                type="button"
                onClick={begin}
                disabled={opening}
                className="btn btn-primary w-full max-w-[19rem] sm:w-auto"
              >
                {opening ? (
                  <>
                    <MailOpen className="h-4 w-4" />
                    Opening...
                  </>
                ) : (
                  <>
                    {friendshipConfig.openButtonLabel}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              <p className="text-[0.82rem] text-ink-faint">
                {friendshipConfig.introPostscript}
              </p>

              <Squiggle className="h-4 w-24 text-blush/40" />
            </div>
          </div>

          <LeafSprig className="pointer-events-none absolute -left-6 bottom-0 hidden h-48 w-32 text-sage/25 lg:block" />
          <LeafSprig className="pointer-events-none absolute -right-6 bottom-0 hidden h-56 w-36 -scale-x-100 text-sage/20 lg:block" />
        </motion.section>
      )}
    </AnimatePresence>
  );
}
