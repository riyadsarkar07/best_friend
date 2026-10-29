"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SectionFrame } from "@/components/SectionFrame";
import { friendshipConfig } from "@/data/friendship-config";
import { clamp } from "@/lib/scrapbook";

const BRUSH = 32;

export function ScratchCards({
  onAllRevealed,
}: {
  onAllRevealed: () => void;
}) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const revealedCount = Object.values(revealed).filter(Boolean).length;
  const allDone = revealedCount === friendshipConfig.scratchCards.length;

  useEffect(() => {
    if (allDone) onAllRevealed();
  }, [allDone, onAllRevealed]);

  return (
    <SectionFrame
      id="scratch"
      kicker="Scratch gently"
      title="Six little secrets"
      intro="Use a finger, mouse, or the keyboard reveal button. When every card is open, a celebration waits at the end."
    >
      <p className="mb-6 font-script text-xl text-ink-soft">
        Revealed {revealedCount} of {friendshipConfig.scratchCards.length}
      </p>
      {allDone && (
        <p className="mb-6 rounded-md bg-sage-soft px-4 py-3 text-sage-deep" role="status">
          Every secret is open. The last page has a little celebration waiting.
        </p>
      )}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {friendshipConfig.scratchCards.map((card) => (
          <ScratchCard
            key={card.id}
            title={card.title}
            label={card.label}
            body={card.body}
            foil={card.foil}
            revealed={Boolean(revealed[card.id])}
            onReveal={() => setRevealed((current) => ({ ...current, [card.id]: true }))}
          />
        ))}
      </div>
    </SectionFrame>
  );
}

function ScratchCard({
  title,
  label,
  body,
  foil,
  revealed,
  onReveal,
}: {
  title: string;
  label: string;
  body: string;
  foil: string;
  revealed: boolean;
  onReveal: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [progress, setProgress] = useState(0);

  const paintFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, foil);
    gradient.addColorStop(1, "#f4e4c8");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "rgba(255,250,242,0.22)";
    for (let i = 0; i < 20; i += 1) {
      ctx.fillRect(i * 16, 0, 7, rect.height);
    }
    ctx.fillStyle = "rgba(58,47,40,0.62)";
    ctx.font = "600 16px Nunito, sans-serif";
    ctx.fillText("scratch here", 20, rect.height / 2);
  }, [foil]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintFoil();
      setProgress(0);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [paintFoil, revealed]);

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, BRUSH, 0, Math.PI * 2);
    ctx.fill();
  };

  const measureReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    let sampled = 0;
    for (let i = 3; i < data.length; i += 32) {
      sampled += 1;
      if (data[i] < 48) clear += 1;
    }
    const ratio = sampled === 0 ? 0 : clear / sampled;
    setProgress(Math.round(clamp(ratio * 100, 0, 100)));
    if (ratio > 0.42) onReveal();
  };

  const pointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    scratchAt(event.clientX, event.clientY);
  };

  const pointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    scratchAt(event.clientX, event.clientY);
  };

  const pointerUp = () => {
    drawing.current = false;
    measureReveal();
  };

  return (
    <article className="paper-sheet overflow-hidden rounded-md">
      <div className="flex items-center justify-between px-4 pt-4">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">{label}</p>
        <button
          type="button"
          className="min-h-10 cursor-pointer rounded-full bg-peach-soft px-3 text-sm font-semibold text-ink"
          onClick={onReveal}
        >
          Reveal
        </button>
      </div>
      <div className="relative m-4 aspect-[4/3] overflow-hidden rounded-sm bg-pink-soft">
        <div className="absolute inset-0 flex flex-col justify-center p-5">
          <h3 className="font-serif text-2xl text-ink">{title}</h3>
          <p className="mt-2 leading-relaxed text-ink-soft">{body}</p>
        </div>
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full touch-none transition-opacity duration-300 ${revealed ? "pointer-events-none opacity-0" : "opacity-100"}`}
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={pointerUp}
          onPointerCancel={pointerUp}
          onPointerLeave={pointerUp}
          aria-label={`Scratch to reveal ${title}`}
          role="img"
        />
      </div>
      <p className="px-4 pb-4 text-sm text-ink-soft">
        Progress: {revealed ? 100 : progress}% {revealed ? "open" : "hidden"}
      </p>
    </article>
  );
}
