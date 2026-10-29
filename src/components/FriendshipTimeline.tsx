"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/SectionFrame";
import { friendshipConfig } from "@/data/friendship-config";

export function FriendshipTimeline() {
  return (
    <SectionFrame
      id="timeline"
      kicker="Pressed between the pages"
      title="Friendship timeline"
      intro="A handful of chapters you can rewrite. Dates, titles, and descriptions all live in the config file."
    >
      <ol className="relative space-y-8 border-l-2 border-dashed border-sage/40 pl-6 sm:pl-10">
        {friendshipConfig.timeline.map((entry, index) => (
          <motion.li
            key={entry.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative"
          >
            <span className="absolute -left-[34px] top-3 h-4 w-4 rounded-full border-4 border-paper bg-pink sm:-left-[50px]" />
            <article className="paper-sheet rounded-md p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-script text-xl text-sage">{entry.date}</p>
                <span className="stamp rounded-sm px-2 py-1 text-[10px]">{entry.tag}</span>
              </div>
              <h3 className="mt-2 font-serif text-2xl text-ink">{entry.title}</h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">{entry.description}</p>
            </article>
          </motion.li>
        ))}
      </ol>
    </SectionFrame>
  );
}
