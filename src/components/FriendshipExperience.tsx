"use client";

import { useCallback, useEffect, useState } from "react";
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

  useEffect(() => {
    if (!opened) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max <= 0 ? 100 : Math.min(100, (window.scrollY / max) * 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [opened]);

  const replay = () => {
    setOpened(false);
    setScratchComplete(false);
    setProgress(0);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const onAllScratched = useCallback(() => {
    setScratchComplete(true);
  }, []);

  return (
    <>
      <a href="#home" className="skip-link">
        Skip to scrapbook
      </a>
      {!opened ? (
        <EnvelopeIntro open={opened} onOpen={() => setOpened(true)} />
      ) : (
        <div className="relative min-h-dvh">
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
          <EasterEggs />
          <MusicPlayer />
          <footer className="px-4 py-10 text-center text-sm text-ink-soft">
            Made for {friendshipConfig.friendName} by {friendshipConfig.senderName}. Personalize everything in src/data/friendship-config.ts.
          </footer>
        </div>
      )}
    </>
  );
}
