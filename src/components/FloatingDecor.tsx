"use client";

import { useReducedMotion } from "motion/react";
import { HeartDoodle, Petal, StarDoodle } from "@/components/Doodles";

const bits = [
  { kind: "petal", left: "8%", delay: "0s", duration: "18s", color: "text-pink/70", size: "w-3" },
  { kind: "heart", left: "18%", delay: "4s", duration: "22s", color: "text-pink/50", size: "w-3.5" },
  { kind: "star", left: "32%", delay: "1.5s", duration: "16s", color: "text-lavender/55", size: "w-3" },
  { kind: "petal", left: "46%", delay: "6s", duration: "20s", color: "text-peach/80", size: "w-4" },
  { kind: "heart", left: "62%", delay: "2s", duration: "19s", color: "text-pink/40", size: "w-2.5" },
  { kind: "petal", left: "74%", delay: "8s", duration: "21s", color: "text-sage/50", size: "w-3" },
  { kind: "star", left: "86%", delay: "3s", duration: "17s", color: "text-lavender/45", size: "w-2.5" },
  { kind: "petal", left: "94%", delay: "5s", duration: "23s", color: "text-pink/60", size: "w-3.5" },
] as const;

export function FloatingDecor() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {bits.map((bit, index) => (
        <span
          key={`${bit.kind}-${index}`}
          className={`absolute top-[-10%] ${bit.color} ${bit.size} ${reduce ? "opacity-30" : "animate-float-bit"}`}
          style={{
            left: bit.left,
            animationDelay: reduce ? undefined : bit.delay,
            animationDuration: reduce ? undefined : bit.duration,
          }}
        >
          {bit.kind === "heart" ? (
            <HeartDoodle className="h-full w-full" />
          ) : bit.kind === "star" ? (
            <StarDoodle className="h-full w-full" />
          ) : (
            <Petal className="h-full w-full" />
          )}
        </span>
      ))}
    </div>
  );
}
