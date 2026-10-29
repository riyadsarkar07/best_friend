"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Feather, RotateCcw, SkipForward } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";
import { FlowerDoodle, HeartDoodle, PaperClip, Squiggle } from "@/components/Doodles";
import { friendshipConfig } from "@/data/friendship-config";

export function FriendshipLetter() {
  const reduce = useReducedMotion();
  const paragraphs = useMemo(() => friendshipConfig.letterBody, []);
  const fullText = useMemo(() => paragraphs.join("\n\n"), [paragraphs]);
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [complete, setComplete] = useState(false);
  const timer = useRef<number | null>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  const finish = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    setTyped(fullText);
    setComplete(true);
  }, [fullText]);

  const start = useCallback(() => {
    setOpen(true);
    setTyped(reduce ? fullText : "");
    setComplete(Boolean(reduce));
  }, [fullText, reduce]);

  const replay = useCallback(() => {
    setOpen(false);
    setTyped("");
    setComplete(false);
    window.setTimeout(start, 260);
  }, [start]);

  useEffect(() => {
    if (!open || reduce || complete) return;

    let index = 0;
    timer.current = window.setInterval(() => {
      index += 1;
      setTyped(fullText.slice(0, index));
      if (index >= fullText.length) {
        if (timer.current) window.clearInterval(timer.current);
        timer.current = null;
        setComplete(true);
      }
    }, 16);

    return () => {
      if (timer.current) window.clearInterval(timer.current);
      timer.current = null;
    };
  }, [open, reduce, complete, fullText]);

  useEffect(() => {
    if (!open) return;
    const node = letterRef.current;
    if (!node) return;
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }, [open, reduce]);

  return (
    <SectionFrame
      id="letter"
      eyebrow={friendshipConfig.letterEyebrow}
      title={friendshipConfig.letterTitle}
      intro={friendshipConfig.letterIntro}
      tone="sage"
    >
      <div className="grid items-start gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
        <div className="relative mx-auto w-full max-w-sm lg:sticky lg:top-24">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative"
          >
            <div className="paper-sheet relative overflow-hidden rounded-[5px] bg-gradient-to-b from-[#fdf4e6] to-[#f6e6cf] p-6 text-center shadow-[var(--shadow-md)]">
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(168,110,115,0.10) 0 1px, transparent 1px 12px)",
                }}
                aria-hidden="true"
              />

              <div className="relative">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-sage/25 text-sage">
                  <Feather className="h-4 w-4" aria-hidden="true" />
                </div>
                <p className="mt-3 text-[0.6rem] font-bold uppercase tracking-[0.24em] text-ink-faint">
                  private · handwritten
                </p>
                <p className="script mt-2 text-3xl leading-none text-ink">
                  To {friendshipConfig.friendName}
                </p>
                <Squiggle className="mx-auto mt-2 h-3 w-24 text-blush/50" />

                <div className="relative mt-7">
                  <div className="absolute inset-x-6 top-3 h-24 rounded-[3px] border border-line bg-paper/70" aria-hidden="true" />
                  <div className="absolute inset-x-3 top-1.5 h-24 rounded-[3px] border border-line bg-paper/85" aria-hidden="true" />
                  <div className="relative mx-auto mt-0 h-24 w-full rounded-[3px] border border-line bg-paper shadow-sm">
                    <div className="flex h-full flex-col justify-center gap-1.5 px-5">
                      <span className="h-px w-2/3 bg-line" />
                      <span className="h-px w-5/6 bg-line" />
                      <span className="h-px w-1/2 bg-line" />
                    </div>
                  </div>
                </div>

                <div className="relative mx-auto mt-5 grid h-16 w-16 place-items-center rounded-full bg-[radial-gradient(circle_at_34%_30%,#b96164,#9c4a4e_48%,#7c3236)] text-paper shadow-[inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-3px_6px_rgba(0,0,0,0.28),0_10px_18px_-10px_rgba(124,50,54,0.8)]">
                  <HeartDoodle className="h-6 w-6 opacity-85" />
                </div>
                <p className="script mt-1.5 text-lg text-ink-soft">sealed with far too much care</p>

                {!open ? (
                  <button type="button" onClick={start} className="btn btn-primary mt-6 w-full">
                    Break the seal
                  </button>
                ) : (
                  <p className="mt-6 rounded-full bg-sage-soft/70 px-4 py-2 text-[0.78rem] font-semibold text-sage-deep">
                    {complete ? "Letter complete" : "Unfolding the letter..."}
                  </p>
                )}
              </div>

              <PaperClip className="absolute -top-3 right-4 h-12 w-6 rotate-6 text-ink-faint/40" />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={complete ? replay : finish}
                disabled={!open}
                className="btn btn-paper min-h-10 px-4 text-[0.8rem]"
              >
                {complete ? (
                  <>
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Replay the letter
                  </>
                ) : (
                  <>
                    <SkipForward className="h-3.5 w-3.5" aria-hidden="true" /> Show full message
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>

        <article
          ref={letterRef}
          className="paper-sheet paper-ruled relative min-h-[30rem] scroll-mt-24 rounded-[5px] p-6 sm:p-9 lg:p-12"
        >
          <span className="tape absolute -top-2 left-10 h-5 w-28 -rotate-2" aria-hidden="true" />
          <FlowerDoodle className="absolute -right-3 -top-4 h-20 w-20 rotate-12 text-sage/30" />

          {open ? (
            <div aria-live="polite">
              <p className="script text-3xl leading-none text-ink sm:text-4xl">
                {friendshipConfig.letterGreeting}
              </p>

              <div className="mt-5 space-y-5">
                {typed.split("\n\n").map((paragraph, index) =>
                  paragraph.length > 0 ? (
                    <p
                      key={index}
                      className="whitespace-pre-line text-[1rem] leading-[2.15rem] text-ink sm:text-[1.06rem]"
                    >
                      {paragraph}
                    </p>
                  ) : null,
                )}
                {!complete && (
                  <span
                    className="inline-block h-5 w-[2px] animate-pulse bg-sage align-middle"
                    aria-hidden="true"
                  />
                )}
              </div>

              <div className={`mt-9 transition-opacity duration-700 ${complete ? "opacity-100" : "opacity-0"}`}>
                <p className="script text-2xl text-ink-soft">{friendshipConfig.letterClosing}</p>
                <p className="script mt-1 text-4xl text-blush-deep sm:text-5xl">
                  {friendshipConfig.letterSignature}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-faint">
                  <HeartDoodle className="h-3 w-3 text-blush" aria-hidden="true" />
                  signed, sealed, yours
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[24rem] flex-col items-center justify-center px-2 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-dashed border-sage/35 text-sage">
                <Feather className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="mt-5 max-w-sm font-serif text-xl italic leading-relaxed text-ink-soft">
                The letter is waiting under the wax seal. Break it open whenever you are ready for
                the words to appear.
              </p>
              <p className="script mt-4 text-xl text-ink-faint">no rush at all</p>
            </div>
          )}
        </article>
      </div>
    </SectionFrame>
  );
}
