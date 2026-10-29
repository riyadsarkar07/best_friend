"use client";

import { useReducedMotion } from "motion/react";
import { HeartDoodle, LeafSprig, Petal, Sparkle } from "@/components/Doodles";

const bits = [
  { kind: "petal", left: "6%", delay: "0s", duration: "24s", color: "text-blush/55", size: "w-3" },
  { kind: "sparkle", left: "17%", delay: "5s", duration: "27s", color: "text-lavender/45", size: "w-3" },
  { kind: "heart", left: "29%", delay: "2.5s", duration: "21s", color: "text-blush/40", size: "w-3.5" },
  { kind: "leaf", left: "43%", delay: "8s", duration: "29s", color: "text-sage/40", size: "w-4" },
  { kind: "petal", left: "58%", delay: "3.5s", duration: "23s", color: "text-peach/60", size: "w-4" },
  { kind: "sparkle", left: "70%", delay: "10s", duration: "26s", color: "text-gold/45", size: "w-2.5" },
  { kind: "heart", left: "83%", delay: "6s", duration: "25s", color: "text-blush/35", size: "w-2.5" },
  { kind: "leaf", left: "94%", delay: "1.5s", duration: "28s", color: "text-sage/35", size: "w-3.5" },
] as const;

export function FloatingDecor({ dense = false }: { dense?: boolean }) {
  const reduce = useReducedMotion();
  const list = dense ? bits : bits.slice(0, 5);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {list.map((bit, index) => (
        <span
          key={`${bit.kind}-${index}`}
          className={`absolute top-0 ${bit.color} ${bit.size} ${reduce ? "opacity-25" : "animate-drift"}`}
          style={{
            left: bit.left,
            animationDelay: reduce ? undefined : bit.delay,
            animationDuration: reduce ? undefined : bit.duration,
          }}
        >
          {bit.kind === "heart" ? (
            <HeartDoodle className="h-full w-full" />
          ) : bit.kind === "sparkle" ? (
            <Sparkle className="h-full w-full" />
          ) : bit.kind === "leaf" ? (
            <LeafSprig className="h-full w-full" />
          ) : (
            <Petal className="h-full w-full" />
          )}
        </span>
      ))}
    </div>
  );
}
