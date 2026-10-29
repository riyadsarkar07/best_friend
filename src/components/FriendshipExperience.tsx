"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { EnvelopeIntro } from "@/components/EnvelopeIntro";
import { EasterEggs } from "@/components/EasterEggs";
import { FinalSurprise } from "@/components/FinalSurprise";
import { FriendshipLetter } from "@/components/FriendshipLetter";
import { FriendshipQuiz } from "@/components/FriendshipQuiz";
import { FriendshipTimeline } from "@/components/FriendshipTimeline";
import { MemoryGallery } from "@/components/MemoryGallery";
import { MusicPlayer } from "@/components/MusicPlayer";
import { ScrapbookNav } from "@/components/ScrapbookNav";
import { ScratchCards } from "@/components/ScratchCards";
import { WelcomeSpread } from "@/components/WelcomeSpread";
import { friendshipConfig } from "@/data/friendship-config";

export function FriendshipExperience() {
  const [opened, setOpened] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scratchComplete, setScratchComplete] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    if (!opened) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max <= 0 ? 100 : Math.min(100, (window.scrollY / max) * 100));
      setShowTop(window.scrollY > 1200);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [opened]);

  const replay = useCallback(() => {
    setOpened(false);
    setScratchComplete(false);
    setProgress(0);
    setShowTop(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const onAllScratched = useCallback(() => setScratchComplete(true), []);

  useEffect(() => {
    if (!opened) return;
    const hash = window.location.hash;
    if (!hash) return;
    const target = document.querySelector(hash);
    if (target) {
      window.setTimeout(() => target.scrollIntoView({ behavior: "auto" }), 80);
    }
  }, [opened]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!opened ? (
          <EnvelopeIntro key="intro" open={opened} onOpen={() => setOpened(true)} />
        ) : (
          <motion.div
            key="scrapbook"
            className="relative min-h-dvh"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <a href="#home" className="skip-link">
              Skip to scrapbook
            </a>
            <ScrapbookNav progress={progress} />

            <main>
              <WelcomeSpread />
              <MemoryGallery />
              <FriendshipTimeline />
              <ScratchCards onAllRevealed={onAllScratched} />
              <FriendshipLetter />
              <FriendshipQuiz />
              <FinalSurprise unlocked={scratchComplete} onReplay={replay} />
            </main>

            <footer className="relative overflow-hidden border-t border-line px-5 py-12 text-center sm:py-16">
              <div className="mx-auto max-w-lg">
                <p className="script text-2xl text-ink-soft">
                  made for {friendshipConfig.friendName}, by {friendshipConfig.senderName}
                </p>
                <div className="hairline mx-auto mt-4 max-w-[10rem]" aria-hidden="true" />
                <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                  No accounts. No analytics. Just a gift.
                </p>
                <p className="mt-2 text-[0.72rem] text-ink-faint/80">
                  Personalize every word in{" "}
                  <code className="rounded bg-paper/70 px-1.5 py-0.5">
                    src/data/friendship-config.ts
                  </code>
                </p>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="btn-link mt-6"
                >
                  Back to the top
                </button>
              </div>
            </footer>

            <EasterEggs enabled={opened} />
            <MusicPlayer />

            <AnimatePresence>
              {showTop && (
                <motion.button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="fixed bottom-4 right-4 z-40 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-paper/95 text-ink shadow-[var(--shadow-sm)] backdrop-blur-sm transition hover:bg-paper sm:bottom-6 sm:right-6"
                  aria-label="Back to top"
                >
                  <ArrowUp className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
