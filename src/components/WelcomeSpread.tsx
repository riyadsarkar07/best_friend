"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Sparkles } from "lucide-react";
import {
  FlowerDoodle,
  HeartDoodle,
  LeafSprig,
  PaperClip,
  Sparkle,
  Squiggle,
  Underline,
} from "@/components/Doodles";
import { PolaroidArt } from "@/components/PolaroidArt";
import { friendshipConfig } from "@/data/friendship-config";
import { tiltFromId } from "@/lib/scrapbook";

export function WelcomeSpread() {
  const reduce = useReducedMotion();
  const featured = friendshipConfig.gallery.slice(0, 3);

  const reveal = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] as const },
  });

  return (
    <section
      id="home"
      className="relative overflow-hidden px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-16 lg:px-10 lg:pb-24 lg:pt-20"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-blush-soft/40 blur-3xl" />
        <div className="absolute -right-20 top-24 h-80 w-80 rounded-full bg-sage-soft/40 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:gap-10">
        <div className="relative">
          <motion.div {...reveal(0)} className="flex items-center gap-3">
            <span className="stamp-label">
              <Sparkle className="h-3 w-3" />
              {friendshipConfig.welcomeEyebrow}
            </span>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
          </motion.div>

          <motion.h1
            {...reveal(0.08)}
            className="serif-display balance mt-5 text-[3rem] text-ink sm:text-[4.2rem] lg:text-[4.6rem]"
          >
            {friendshipConfig.welcomeTitle}
          </motion.h1>

          <motion.div {...reveal(0.12)} className="relative mt-1 inline-flex">
            <Underline className="h-4 w-52 text-blush-deep/55 sm:w-64" />
            <span className="script absolute -right-10 -top-3 rotate-[-7deg] text-lg text-sage">
              for {friendshipConfig.friendName}
            </span>
          </motion.div>

          <motion.p
            {...reveal(0.16)}
            className="pretty mt-6 max-w-xl text-[1.05rem] leading-[1.85] text-ink-soft sm:text-lg"
          >
            {friendshipConfig.welcomeMessage}
          </motion.p>

          <motion.div
            {...reveal(0.22)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <a href="#letter" className="btn btn-primary">
              Read the letter
              <ArrowDown className="h-4 w-4" />
            </a>
            <a href="#gallery" className="btn btn-ghost">
              Wander the pages
            </a>
          </motion.div>

          <motion.div
            {...reveal(0.3)}
            className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-faint"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-gold" /> 6 secrets
            </span>
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            <span>1 letter</span>
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            <span>1 certificate</span>
          </motion.div>
        </div>

        <div className="relative mx-auto h-[26rem] w-full max-w-md sm:h-[30rem] lg:h-[32rem]">
          <FlowerDoodle className="absolute -left-3 top-2 h-14 w-14 rotate-[-8deg] text-sage/40" />
          <HeartDoodle className="absolute right-2 top-0 h-6 w-6 rotate-12 text-blush/55" />
          <LeafSprig className="absolute -bottom-2 right-0 h-24 w-16 -scale-x-100 text-sage/30" />
          <Squiggle className="absolute -left-4 bottom-16 h-4 w-20 rotate-90 text-blush/35" />

          {featured.map((photo, index) => {
            const positions = [
              "left-[2%] top-[6%] w-[62%]",
              "right-[0%] top-[32%] w-[56%]",
              "left-[10%] bottom-[2%] w-[54%]",
            ];
            return (
              <motion.div
                key={photo.id}
                className={`paper-sheet absolute rounded-[4px] p-2.5 pb-11 ${positions[index]}`}
                style={{ rotate: tiltFromId(photo.id, 7), zIndex: index + 1 }}
                initial={reduce ? false : { opacity: 0, y: 24, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: tiltFromId(photo.id, 7) }}
                transition={{ delay: 0.2 + index * 0.14, duration: 0.75, ease: [0.22, 0.61, 0.36, 1] }}
                whileHover={reduce ? undefined : { y: -6, rotate: 0, zIndex: 20 }}
              >
                <span className="tape absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 -rotate-2" />
                <div className="aspect-[4/5] overflow-hidden rounded-[2px] bg-cream-deep">
                  {photo.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <PolaroidArt photo={photo} />
                  )}
                </div>
                <p className="script mt-2.5 truncate px-0.5 text-xl leading-none text-ink">
                  {photo.caption}
                </p>
              </motion.div>
            );
          })}

          <div className="absolute -right-1 bottom-6 z-20 hidden rotate-[-6deg] rounded-sm border border-line bg-paper/95 px-3 py-2 text-center shadow-[var(--shadow-sm)] sm:block">
            <p className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-ink-faint">
              est. forever
            </p>
            <p className="script text-lg leading-tight text-sage-deep">
              {friendshipConfig.friendName} &amp; {friendshipConfig.senderName}
            </p>
          </div>

          <PaperClip className="absolute -top-1 left-[46%] h-12 w-6 rotate-[12deg] text-ink-faint/50" />
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl items-center gap-4 border-t border-line pt-6 sm:mt-16">
        <span className="h-px w-6 bg-gold/50" aria-hidden="true" />
        <p className="script text-lg text-ink-soft sm:text-xl">
          {friendshipConfig.welcomeSignature}
        </p>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
      </div>
    </section>
  );
}
