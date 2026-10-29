"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionFrame } from "@/components/SectionFrame";
import { FlowerDoodle, Sparkle } from "@/components/Doodles";
import { friendshipConfig } from "@/data/friendship-config";

export function FriendshipTimeline() {
  const reduce = useReducedMotion();
  const entries = friendshipConfig.timeline;

  return (
    <SectionFrame
      id="timeline"
      eyebrow={friendshipConfig.timelineEyebrow}
      title={friendshipConfig.timelineTitle}
      intro={friendshipConfig.timelineIntro}
      tone="blush"
    >
      <div className="relative">
        <div
          className="absolute bottom-6 left-[13px] top-4 w-px bg-gradient-to-b from-transparent via-sage/35 to-transparent sm:left-[19px]"
          aria-hidden="true"
        />

        <ol className="space-y-6 sm:space-y-8">
          {entries.map((entry, index) => (
            <motion.li
              key={entry.id}
              initial={reduce ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.04 * (index % 3), ease: [0.22, 0.61, 0.36, 1] }}
              className="relative pl-10 sm:pl-16"
            >
              <div className="absolute left-0 top-6 grid h-7 w-7 place-items-center rounded-full border border-sage/30 bg-paper shadow-[0_2px_8px_rgba(74,56,40,0.1)] sm:h-10 sm:w-10">
                <span className="script text-sm leading-none text-sage-deep sm:text-lg">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <article className="paper-sheet relative max-w-3xl rounded-[5px] p-5 transition-shadow duration-300 hover:shadow-[var(--shadow-md)] sm:p-7">
                <span className="tape-sage tape absolute -top-2 left-8 h-4 w-16 -rotate-2" aria-hidden="true" />

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pr-12">
                  {!/^(edit this date|add a date)$/i.test(entry.date) && (
                    <p className="script text-xl leading-none text-sage-deep sm:text-2xl">
                      {entry.date}
                    </p>
                  )}
                  <span className="stamp-label">{entry.tag}</span>
                </div>

                <h3 className="serif-display mt-3 text-[1.6rem] leading-tight text-ink sm:text-3xl">
                  {entry.title}
                </h3>
                <p className="pretty mt-2.5 max-w-2xl text-[0.96rem] leading-relaxed text-ink-soft sm:text-[1.02rem]">
                  {entry.description}
                </p>

                {entry.photoSrc && (
                  <div className="mt-4 overflow-hidden rounded-[3px] border border-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={entry.photoSrc}
                      alt={entry.title}
                      className="h-56 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                {index === entries.length - 1 ? (
                  <FlowerDoodle className="absolute -right-2 -top-3 h-16 w-16 rotate-12 text-blush/40" />
                ) : (
                  <Sparkle className="absolute right-4 top-4 h-4 w-4 text-gold/50" />
                )}
              </article>
            </motion.li>
          ))}
        </ol>

        <div className="relative mt-8 pl-10 sm:pl-16">
          <p className="script text-xl text-ink-faint">and the next page is still blank, on purpose.</p>
        </div>
      </div>
    </SectionFrame>
  );
}
