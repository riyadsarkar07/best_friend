"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { FlowerDoodle, HeartDoodle, Sparkle, StarDoodle } from "@/components/Doodles";
import { friendshipConfig } from "@/data/friendship-config";

type EggPosition = {
  id: string;
  label: string;
  className: string;
  icon: React.ReactNode;
  rotate: string;
};

const positions: EggPosition[] = [
  {
    id: "egg-star",
    label: "A hidden star",
    className: "right-[4%] top-[30%] hidden sm:block",
    icon: <StarDoodle className="h-5 w-5" />,
    rotate: "-12deg",
  },
  {
    id: "egg-sticker",
    label: "A hidden flower sticker",
    className: "left-[1.5%] top-[54%] hidden lg:block",
    icon: <FlowerDoodle className="h-12 w-12" />,
    rotate: "8deg",
  },
  {
    id: "egg-note",
    label: "A hidden margin note",
    className: "right-[3%] top-[78%] hidden lg:block",
    icon: <HeartDoodle className="h-6 w-6" />,
    rotate: "10deg",
  },
];

export function EasterEggs({ enabled }: { enabled: boolean }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [found, setFound] = useState<string[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const egg = friendshipConfig.easterEggs.find((item) => item.id === active);

  useEffect(() => {
    if (!active) {
      triggerRef.current?.focus();
      return;
    }
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const open = (id: string, element: HTMLElement) => {
    triggerRef.current = element;
    setActive(id);
    setFound((current) => (current.includes(id) ? current : [...current, id]));
  };

  if (!enabled) return null;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-30" aria-hidden="false">
        <div className="relative h-full w-full">
          {positions.map((position) => {
            const isFound = found.includes(position.id);
            return (
              <div
                key={position.id}
                className={`pointer-events-auto absolute ${position.className}`}
                style={{ rotate: position.rotate }}
              >
                <button
                  type="button"
                  onClick={(event) => open(position.id, event.currentTarget)}
                  aria-label={`${position.label}. Found ${found.length} of ${friendshipConfig.easterEggs.length} secrets.`}
                  className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-transparent text-ink-faint/45 transition duration-300 hover:scale-110 hover:border-line hover:bg-paper/70 hover:text-sage ${
                    isFound ? "opacity-70" : "animate-twinkle"
                  } ${reduce ? "" : ""}`}
                >
                  {position.icon}
                  {isFound && (
                    <span
                      className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {found.length > 0 && (
        <div className="pointer-events-none fixed bottom-20 left-4 z-30 hidden lg:block">
          <p className="rounded-full border border-line/70 bg-paper/85 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-faint shadow-[var(--shadow-sm)] backdrop-blur-sm">
            {found.length}/{friendshipConfig.easterEggs.length} hidden notes found
          </p>
        </div>
      )}

      <AnimatePresence>
        {egg && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#241f1a]/50 p-4 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="egg-title"
          >
            <motion.div
              className="paper-sheet relative w-full max-w-md overflow-hidden rounded-[5px] p-6 sm:p-8"
              initial={reduce ? { opacity: 0 } : { scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { scale: 0.97, opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <span className="tape-blush tape absolute -top-2 left-1/2 h-5 w-24 -translate-x-1/2" aria-hidden="true" />
              <Sparkle className="absolute right-5 top-5 h-5 w-5 text-gold/60" />

              <p className="script text-2xl text-sage">You found a secret</p>
              <h3 id="egg-title" className="serif-display mt-1 text-[1.9rem] leading-tight text-ink">
                {egg.title}
              </h3>
              <div className="hairline my-4" aria-hidden="true" />
              <p className="pretty text-[0.98rem] leading-relaxed text-ink-soft">{egg.message}</p>

              <div className="mt-6 flex items-center justify-between gap-3">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
                  {found.length} of {friendshipConfig.easterEggs.length} found
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setActive(null)}
                  className="btn btn-primary min-h-11 px-4 text-[0.84rem]"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" /> Tuck it back
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
