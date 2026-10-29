"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Download, Lock, RotateCcw, Sparkles } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";
import { FlowerDoodle, HeartDoodle, LeafSprig, Sparkle, StarDoodle } from "@/components/Doodles";
import { friendshipConfig } from "@/data/friendship-config";

export function FinalSurprise({ unlocked, onReplay }: { unlocked: boolean; onReplay: () => void }) {
  const [celebrate, setCelebrate] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!unlocked) return;
    const timer = window.setTimeout(() => setCelebrate(true), 250);
    const stop = window.setTimeout(() => setCelebrate(false), 6200);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(stop);
    };
  }, [unlocked]);

  return (
    <SectionFrame
      id="finale"
      eyebrow={friendshipConfig.finaleEyebrow}
      title={friendshipConfig.finaleTitle}
      intro={friendshipConfig.finaleMessage}
      align="center"
    >
      <div className="relative mx-auto max-w-3xl">
        <AnimatePresence>{celebrate && !reduce && <Confetti />}</AnimatePresence>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative"
        >
          <div
            className={`mb-6 flex flex-col items-center gap-2 rounded-xl border px-5 py-4 text-center sm:flex-row sm:text-left ${
              unlocked
                ? "border-sage/30 bg-sage-soft/55 text-sage-deep"
                : "border-line bg-paper/70 text-ink-soft"
            }`}
            role="status"
          >
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
                unlocked ? "bg-sage text-paper" : "bg-cream-deep text-ink-faint"
              }`}
            >
              {unlocked ? <Sparkles className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
            </span>
            <p className="text-[0.9rem] font-semibold">
              {unlocked ? friendshipConfig.finaleUnlockedNote : friendshipConfig.finaleLockedNote}
            </p>
            {!unlocked && (
              <a href="#scratch" className="btn-link shrink-0 sm:ml-auto">
                Open the secrets <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          <Certificate unlocked={unlocked} />

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={onReplay} className="btn btn-ghost">
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Replay the surprise
            </button>
            <a href="#letter" className="btn btn-primary">
              <HeartDoodle className="h-4 w-4" aria-hidden="true" /> Read the letter again
            </a>
          </div>
        </motion.div>
      </div>
    </SectionFrame>
  );
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let cursorY = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY);
      line = word;
      cursorY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cursorY);
  return cursorY;
}

function drawFlourish(ctx: CanvasRenderingContext2D, x: number, y: number, flip = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(flip, 1);
  ctx.strokeStyle = "rgba(171, 133, 76, 0.75)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(40, -18, 70, 12, 100, -4);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(104, -5, 3.5, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(171, 133, 76, 0.75)";
  ctx.fill();
  ctx.restore();
}

function Certificate({ unlocked }: { unlocked: boolean }) {
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const certificateNumber = useMemo(() => {
    const seed =
      friendshipConfig.friendName.length * 137 + friendshipConfig.senderName.length * 53;
    return `BF-${friendshipConfig.friendName.slice(0, 2).toUpperCase()}-${(seed % 9000) + 1000}`;
  }, []);

  const saveImage = async () => {
    setSaving(true);
    setStatus("");
    try {
      const width = 1400;
      const height = 900;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unavailable");

      ctx.fillStyle = "#fffdf7";
      ctx.fillRect(0, 0, width, height);

      const wash = ctx.createRadialGradient(180, 120, 40, 180, 120, 760);
      wash.addColorStop(0, "rgba(223,230,215,0.55)");
      wash.addColorStop(0.5, "rgba(247,230,211,0.25)");
      wash.addColorStop(1, "rgba(255,253,247,0)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "#44523f";
      ctx.lineWidth = 10;
      ctx.strokeRect(40, 40, width - 80, height - 80);
      ctx.strokeStyle = "rgba(171,133,76,0.7)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(62, 62, width - 124, height - 124);

      ctx.textAlign = "center";
      ctx.fillStyle = "#978b7d";
      ctx.font = "700 17px Manrope, Arial, sans-serif";
      ctx.fillText("O F F I C I A L   B E S T   F R I E N D   C E R T I F I C A T E", width / 2, 150);

      drawFlourish(ctx, width / 2 - 110, 196);
      drawFlourish(ctx, width / 2 + 110, 196, -1);

      ctx.fillStyle = "#978b7d";
      ctx.font = "italic 26px Georgia, serif";
      ctx.fillText("proudly awarded to", width / 2, 268);

      ctx.fillStyle = "#2d2822";
      ctx.font = "600 92px Georgia, 'Times New Roman', serif";
      ctx.fillText(friendshipConfig.friendName, width / 2, 380);

      ctx.strokeStyle = "rgba(168,110,115,0.55)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 240, 410);
      ctx.bezierCurveTo(width / 2 - 80, 398, width / 2 + 80, 420, width / 2 + 240, 406);
      ctx.stroke();

      ctx.fillStyle = "#a86e73";
      ctx.font = "italic 40px Georgia, serif";
      ctx.fillText(friendshipConfig.certificateAward, width / 2, 480);

      ctx.fillStyle = "#6d6357";
      ctx.font = "26px Georgia, serif";
      const endY = wrapText(ctx, friendshipConfig.certificateBody, width / 2, 552, 900, 42);

      ctx.fillStyle = "#44523f";
      ctx.font = "italic 28px Georgia, serif";
      ctx.fillText(friendshipConfig.certificateFootnote, width / 2, endY + 70);

      ctx.strokeStyle = "rgba(96,80,62,0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(180, 770);
      ctx.lineTo(520, 770);
      ctx.moveTo(width - 520, 770);
      ctx.lineTo(width - 180, 770);
      ctx.stroke();

      ctx.fillStyle = "#2d2822";
      ctx.font = "italic 30px Georgia, serif";
      ctx.fillText(friendshipConfig.senderName, 350, 756);
      ctx.font = "700 14px Manrope, Arial, sans-serif";
      ctx.fillStyle = "#978b7d";
      ctx.fillText("THE ONE WHO MADE THIS", 350, 796);

      ctx.fillStyle = "#2d2822";
      ctx.font = "italic 30px Georgia, serif";
      ctx.fillText(friendshipConfig.friendName, width - 350, 756);
      ctx.font = "700 14px Manrope, Arial, sans-serif";
      ctx.fillStyle = "#978b7d";
      ctx.fillText("THE OFFICIAL BEST FRIEND", width - 350, 796);

      ctx.fillStyle = "#978b7d";
      ctx.font = "600 14px Manrope, Arial, sans-serif";
      ctx.fillText(`CERTIFICATE ${certificateNumber}  ·  LIFETIME MEMBERSHIP`, width / 2, 812);

      const png = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = png;
      link.download = `${friendshipConfig.friendName}-best-friend-certificate.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setStatus("Saved. Your certificate is now a PNG in your downloads.");
    } catch {
      setStatus("The download did not work in this browser. Try a screenshot instead.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <article className="paper-sheet relative overflow-hidden rounded-[5px] p-1.5 shadow-[var(--shadow-md)]">
        <div className="relative overflow-hidden rounded-[3px] border-[9px] border-double border-sage/70 bg-[#fffdf7] px-5 py-8 sm:px-10 sm:py-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(28rem 20rem at 0% 0%, rgba(223,230,215,0.5), transparent 70%), radial-gradient(24rem 18rem at 100% 100%, rgba(247,230,211,0.5), transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative text-center">
            <p className="text-[0.56rem] font-bold uppercase tracking-[0.32em] text-ink-faint sm:text-[0.62rem]">
              Official Best Friend Certificate
            </p>

            <div className="mt-4 flex items-center justify-center gap-3" aria-hidden="true">
              <span className="h-px w-10 bg-gold/45 sm:w-16" />
              <StarDoodle className="h-3.5 w-3.5 text-gold/70" />
              <span className="h-px w-10 bg-gold/45 sm:w-16" />
            </div>

            <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-faint">
              proudly awarded to
            </p>
            <h3 className="serif-display mt-1 text-[2.8rem] leading-none text-ink sm:text-[4rem]">
              {friendshipConfig.friendName}
            </h3>

            <p className="serif-italic mx-auto mt-3 max-w-md text-xl text-blush-deep sm:text-2xl">
              {friendshipConfig.certificateAward}
            </p>

            <div className="hairline mx-auto mt-5 max-w-xs" aria-hidden="true" />

            <p className="pretty mx-auto mt-5 max-w-lg text-[0.94rem] leading-relaxed text-ink-soft sm:text-base">
              {friendshipConfig.certificateBody}
            </p>

            <p className="script mt-6 text-xl text-sage-deep sm:text-2xl">
              {friendshipConfig.certificateFootnote}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <div className="h-px bg-line" aria-hidden="true" />
                <p className="script mt-1.5 text-xl leading-none text-ink">
                  {friendshipConfig.senderName}
                </p>
                <p className="mt-1 text-[0.5rem] font-bold uppercase tracking-[0.18em] text-ink-faint sm:text-[0.54rem]">
                  The one who made this
                </p>
              </div>
              <div>
                <div className="h-px bg-line" aria-hidden="true" />
                <p className="script mt-1.5 text-xl leading-none text-ink">
                  {friendshipConfig.friendName}
                </p>
                <p className="mt-1 text-[0.5rem] font-bold uppercase tracking-[0.18em] text-ink-faint sm:text-[0.54rem]">
                  The official best friend
                </p>
              </div>
            </div>

            <p className="mt-6 text-[0.52rem] font-bold uppercase tracking-[0.22em] text-ink-faint/80">
              Certificate {certificateNumber} · Lifetime membership
            </p>
          </div>

          <FlowerDoodle className="pointer-events-none absolute -right-3 -top-3 h-20 w-20 rotate-12 text-sage/20" />
          <HeartDoodle className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 text-blush/30" />
          <LeafSprig className="pointer-events-none absolute -bottom-4 -left-3 h-20 w-14 -rotate-12 text-sage/20" />
          <Sparkle className="pointer-events-none absolute right-5 top-14 h-4 w-4 text-gold/40" />
        </div>
      </article>

      <div className="mt-5 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={saveImage}
          disabled={!unlocked || saving}
          className="btn btn-primary w-full sm:w-auto"
          aria-describedby="certificate-status"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          {saving ? "Preparing your certificate..." : "Save certificate as image"}
        </button>
        {!unlocked && (
          <p className="text-[0.75rem] text-ink-faint">
            Unlock all six secrets above to enable the download.
          </p>
        )}
        <p id="certificate-status" className="min-h-5 text-[0.8rem] text-sage-deep" aria-live="polite">
          {status}
        </p>
      </div>
    </div>
  );
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 46 }, (_, index) => {
        const palette = ["#cd989b", "#5f7359", "#e2b087", "#9a86ab", "#ab854c", "#f3dcdc"];
        return {
          id: index,
          left: (index * 37 + 7) % 100,
          delay: (index % 12) * 0.09,
          duration: 3 + ((index * 7) % 18) / 10,
          drift: `${((index % 2 === 0 ? 1 : -1) * ((index * 13) % 60)) / 10}rem`,
          spin: 380 + (index % 5) * 120,
          color: palette[index % palette.length],
          size: index % 3 === 0 ? "h-2.5 w-1.5" : index % 3 === 1 ? "h-2 w-2" : "h-3 w-1",
          round: index % 4 === 0,
        };
      }),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-x-0 -top-10 z-20 h-[130%] overflow-hidden" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className={`confetti-bit absolute top-0 ${piece.size} ${piece.round ? "rounded-full" : "rounded-[1px]"}`}
          style={
            {
              left: `${piece.left}%`,
              backgroundColor: piece.color,
              "--delay": `${piece.delay}s`,
              "--duration": `${piece.duration}s`,
              "--drift": piece.drift,
              "--spin": `${piece.spin}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
