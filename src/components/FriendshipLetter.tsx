"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";
import { friendshipConfig } from "@/data/friendship-config";

export function FriendshipLetter() {
  const [open, setOpen] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const paragraphs = useMemo(() => friendshipConfig.letterBody, []);

  const replay = () => {
    setOpen(true);
    setReplayKey((value) => value + 1);
  };

  return (
    <SectionFrame
      id="letter"
      kicker="Folded stationery"
      title="A letter, just for you"
      intro="Open the envelope whenever you like. You do not need to finish the rest of the scrapbook first."
    >
      <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="paper-sheet relative overflow-hidden rounded-md bg-peach-soft p-6 text-center shadow-[0_16px_32px_rgba(80,58,42,0.14)]">
            <p className="font-script text-3xl text-ink">To {friendshipConfig.friendName}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.22em] text-ink-soft">handwritten mail</p>
            <div className="mx-auto mt-8 h-20 w-20 rounded-full bg-wax shadow-inner" />
            <p className="mt-3 font-script text-xl text-paper/90">seal of friendship</p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-6 inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full bg-sage px-5 font-semibold text-paper"
            >
              Read Full Letter
            </button>
          </div>
        </div>

        <article className="paper-sheet paper-ruled relative min-h-[420px] rounded-md p-6 sm:p-8">
          <span className="washi absolute left-8 top-3 h-5 w-28 -rotate-6" />
          {open ? (
            <motion.div key={replayKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="font-script text-3xl text-ink">{friendshipConfig.letterGreeting}</p>
              {paragraphs.map((paragraph, index) => (
                <motion.p
                  key={`${replayKey}-${index}`}
                  className="mt-4 max-w-xl leading-8 text-ink"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 * (index + 1), duration: 0.4 }}
                >
                  {paragraph}
                </motion.p>
              ))}
              <motion.p
                className="mt-8 font-script text-2xl text-ink"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18 * (paragraphs.length + 1) }}
              >
                {friendshipConfig.letterClosing}
              </motion.p>
              <motion.p
                className="font-script text-4xl text-pink"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18 * (paragraphs.length + 2) }}
              >
                {friendshipConfig.letterSignature}
              </motion.p>
            </motion.div>
          ) : (
            <p className="mt-16 max-w-md font-script text-2xl text-ink-soft">
              The letter is waiting under the wax seal. Press the button whenever you want the words to appear.
            </p>
          )}
          <button
            type="button"
            onClick={replay}
            className="mt-8 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-lavender-soft px-4 text-sm font-semibold text-ink"
          >
            <RotateCcw className="h-4 w-4" />
            Replay animation
          </button>
        </article>
      </div>
    </SectionFrame>
  );
}
