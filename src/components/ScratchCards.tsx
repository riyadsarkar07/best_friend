"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Hand, Sparkles } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";
import { friendshipConfig, type ScratchCardContent } from "@/data/friendship-config";
import { clamp } from "@/lib/scrapbook";

const BRUSH = 26;
const REVEAL_THRESHOLD = 0.4;

export function ScratchCards({ onAllRevealed }: { onAllRevealed: () => void }) {
  const cards = friendshipConfig.scratchCards;
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const revealedCount = cards.filter((card) => revealed[card.id]).length;
  const allDone = revealedCount === cards.length;

  useEffect(() => {
    if (allDone) onAllRevealed();
  }, [allDone, onAllRevealed]);

  const revealCard = useCallback((id: string) => {
    setRevealed((current) => (current[id] ? current : { ...current, [id]: true }));
  }, []);

  return (
    <SectionFrame
      id="scratch"
      eyebrow={friendshipConfig.scratchEyebrow}
      title={friendshipConfig.scratchTitle}
      intro={friendshipConfig.scratchIntro}
      tone="lavender"
      aside={
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div
            className="flex items-center gap-2 rounded-full border border-line bg-paper/80 px-4 py-2"
            role="status"
            aria-live="polite"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            <span className="text-[0.78rem] font-semibold text-ink-soft">
              {revealedCount} of {cards.length} revealed
            </span>
          </div>
          <div className="flex gap-1.5" aria-hidden="true">
            {cards.map((card) => (
              <span
                key={card.id}
                className={`h-1.5 w-6 rounded-full transition-colors duration-500 ${
                  revealed[card.id] ? "bg-sage" : "bg-line"
                }`}
              />
            ))}
          </div>
        </div>
      }
    >
      {allDone && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-3 rounded-xl border border-sage/25 bg-sage-soft/60 px-4 py-3.5 text-sage-deep"
          role="status"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage text-paper">
            <Check className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-[0.9rem] font-semibold">
            Every secret is open. The last page is unlocked and waiting.
          </p>
          <a href="#finale" className="btn-link ml-auto hidden sm:inline-flex">
            Go to the finale
          </a>
        </motion.div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => (
          <ScratchCard
            key={card.id}
            card={card}
            index={index}
            revealed={Boolean(revealed[card.id])}
            onReveal={() => revealCard(card.id)}
          />
        ))}
      </div>
    </SectionFrame>
  );
}

function ScratchCard({
  card,
  index,
  revealed,
  onReveal,
}: {
  card: ScratchCardContent;
  index: number;
  revealed: boolean;
  onReveal: () => void;
}) {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const [progress, setProgress] = useState(0);

  const paintFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, card.foil);
    gradient.addColorStop(0.48, mix(card.foil, "#ffffff", 0.22));
    gradient.addColorStop(0.52, card.foil);
    gradient.addColorStop(1, mix(card.foil, "#f4e4c8", 0.42));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = 1;
    for (let x = -height; x < width; x += 11) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height, height);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(255,253,247,0.35)";
    ctx.setLineDash([6, 6]);
    ctx.lineWidth = 1.2;
    ctx.strokeRect(9, 9, width - 18, height - 18);
    ctx.setLineDash([]);

    ctx.fillStyle = "rgba(255,253,247,0.9)";
    ctx.font = "600 10px Manrope, ui-sans-serif, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("S C R A T C H   T O   R E V E A L", width / 2, height / 2 + 4);

    ctx.globalAlpha = 0.5;
    ctx.font = "500 9px Manrope, ui-sans-serif, sans-serif";
    ctx.fillText(card.label.toUpperCase(), width / 2, height / 2 + 24);
    ctx.globalAlpha = 1;
  }, [card.foil, card.label]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      paintFoil();
      setProgress(0);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [paintFoil, revealed]);

  const scratchSegment = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = BRUSH * 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(to.x, to.y, BRUSH, 0, Math.PI * 2);
    ctx.fill();
  };

  const measure = () => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let data: Uint8ClampedArray;
    try {
      data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    } catch {
      return;
    }
    let clear = 0;
    let sampled = 0;
    for (let i = 3; i < data.length; i += 40) {
      sampled += 1;
      if (data[i] < 48) clear += 1;
    }
    const ratio = sampled === 0 ? 0 : clear / sampled;
    const next = Math.round(clamp(ratio * 100, 0, 100));
    setProgress(next);
    if (ratio > REVEAL_THRESHOLD) onReveal();
  };

  const pointFrom = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const pointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (revealed) return;
    drawing.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = pointFrom(event);
    lastPoint.current = point;
    scratchSegment(point, point);
  };

  const pointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || revealed) return;
    const point = pointFrom(event);
    scratchSegment(lastPoint.current ?? point, point);
    lastPoint.current = point;
  };

  const pointerUp = () => {
    if (!drawing.current) return;
    drawing.current = false;
    lastPoint.current = null;
    measure();
  };

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.06, ease: [0.22, 0.61, 0.36, 1] }}
      className="paper-sheet group relative flex flex-col overflow-hidden rounded-[5px]"
    >
      <div className="flex items-center justify-between gap-3 px-4 pt-4">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: card.foil }}
            aria-hidden="true"
          />
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ink-faint">
            {card.label} · {card.prompt}
          </p>
        </div>
        {revealed ? (
          <span className="flex items-center gap-1 rounded-full bg-sage-soft px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-sage-deep">
            <Check className="h-3 w-3" aria-hidden="true" /> open
          </span>
        ) : (
          <button
            type="button"
            className="min-h-11 cursor-pointer rounded-full border border-line bg-paper px-3.5 text-[0.72rem] font-bold text-ink-soft transition hover:border-sage/40 hover:text-sage-deep"
            onClick={onReveal}
          >
            Reveal
          </button>
        )}
      </div>

      <div className="relative m-4 aspect-[4/3] overflow-hidden rounded-[3px] bg-cream">
        <div className="absolute inset-0 flex flex-col justify-center px-5 py-4">
          <p className="script text-lg leading-none text-blush-deep">{card.prompt}</p>
          <h3 className="serif-display mt-1.5 text-[1.45rem] leading-tight text-ink sm:text-2xl">
            {card.title}
          </h3>
          <p className="mt-2 text-[0.86rem] leading-relaxed text-ink-soft">{card.body}</p>
        </div>

        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full touch-none transition-opacity duration-500 ${
            revealed ? "pointer-events-none opacity-0" : "cursor-grab opacity-100 active:cursor-grabbing"
          }`}
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={pointerUp}
          onPointerCancel={pointerUp}
          onPointerLeave={pointerUp}
          aria-label={`Scratch to reveal: ${card.title}`}
          role="img"
        />
      </div>

      <div className="mt-auto flex items-center gap-3 px-4 pb-4">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-cream-deep">
          <div
            className="h-full rounded-full bg-sage transition-[width] duration-300"
            style={{ width: `${revealed ? 100 : progress}%` }}
          />
        </div>
        <span className="flex items-center gap-1 text-[0.68rem] font-semibold text-ink-faint">
          {revealed ? (
            "revealed"
          ) : (
            <>
              <Hand className="h-3 w-3" aria-hidden="true" />
              {progress}%
            </>
          )}
        </span>
      </div>
    </motion.article>
  );
}

function mix(from: string, to: string, amount: number) {
  const parse = (hex: string) => {
    const clean = hex.replace("#", "");
    const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
    return [
      parseInt(full.slice(0, 2), 16),
      parseInt(full.slice(2, 4), 16),
      parseInt(full.slice(4, 6), 16),
    ];
  };
  try {
    const a = parse(from);
    const b = parse(to);
    const channel = (i: number) => Math.round(a[i] + (b[i] - a[i]) * amount);
    return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
  } catch {
    return from;
  }
}
