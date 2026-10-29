"use client";

import { motion, useReducedMotion } from "motion/react";
import { FlowerDoodle, HeartDoodle, Squiggle } from "@/components/Doodles";
import { PolaroidArt } from "@/components/PolaroidArt";
import { friendshipConfig } from "@/data/friendship-config";
import { tiltFromId } from "@/lib/scrapbook";

export function WelcomeSpread() {
  const reduce = useReducedMotion();
  const featured = friendshipConfig.gallery.slice(0, 3);

  return (
    <section id="home" className="relative overflow-hidden px-4 pb-8 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="font-script text-2xl text-sage">A handmade page for {friendshipConfig.friendName}</p>
          <h1 className="mt-2 max-w-xl font-serif text-5xl leading-tight text-ink sm:text-6xl">
            {friendshipConfig.welcomeTitle}
          </h1>
          <Squiggle className="mt-4 h-6 w-40 text-pink" />
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            {friendshipConfig.welcomeMessage}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#letter"
              className="inline-flex min-h-12 items-center rounded-full bg-sage px-5 font-semibold text-paper"
            >
              Read the letter
            </a>
            <a
              href="#gallery"
              className="inline-flex min-h-12 items-center rounded-full bg-peach-soft px-5 font-semibold text-ink"
            >
              Wander the pages
            </a>
          </div>
        </div>

        <div className="relative mx-auto h-[420px] w-full max-w-md">
          <FlowerDoodle className="absolute -left-4 top-6 h-16 w-16 text-sage/50" />
          <HeartDoodle className="absolute right-2 top-10 h-8 w-8 text-pink/60" />
          {featured.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="paper-sheet absolute w-[68%] overflow-hidden rounded-sm p-2 pb-10"
              style={{
                left: `${index * 12}%`,
                top: `${index * 42}px`,
                zIndex: index + 1,
                rotate: tiltFromId(photo.id, 6),
              }}
              initial={reduce ? false : { y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.12 * index, duration: 0.45 }}
            >
              <div className="aspect-[4/5] overflow-hidden bg-cream-deep">
                {photo.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
                ) : (
                  <PolaroidArt photo={photo} />
                )}
              </div>
              <p className="mt-3 px-1 font-script text-xl text-ink">{photo.caption}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
