"use client";

import { useState } from "react";
import { Download, PartyPopper, RotateCcw } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";
import { FlowerDoodle, HeartDoodle } from "@/components/Doodles";
import { friendshipConfig } from "@/data/friendship-config";

export function FinalSurprise({ unlocked, onReplay }: { unlocked: boolean; onReplay: () => void }) {
  return (
    <SectionFrame
      id="finale"
      kicker="The last fold"
      title={friendshipConfig.finaleTitle}
      intro={friendshipConfig.finaleMessage}
    >
      <div className="relative overflow-hidden rounded-md">
        <ConfettiBurst active={unlocked} />
        <div className="paper-sheet relative p-6 sm:p-10">
          {unlocked && (
            <p className="mb-6 font-script text-2xl text-sage">
              You found every secret. The certificate is officially yours.
            </p>
          )}
          <Certificate />
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onReplay}
              className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-sage px-5 font-semibold text-paper"
            >
              <RotateCcw className="h-4 w-4" />
              Replay the surprise
            </button>
            <a
              href="#letter"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-pink-soft px-5 font-semibold text-ink"
            >
              <PartyPopper className="h-4 w-4" />
              Return to the letter
            </a>
          </div>
        </div>
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
    if (ctx.measureText(test).width > maxWidth) {
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

function Certificate() {
  const [status, setStatus] = useState("");

  const saveImage = () => {
    const canvas = document.createElement("canvas");
    const width = 1200;
    const height = 760;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#fff8ee";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "#5c7458";
    ctx.lineWidth = 18;
    ctx.strokeRect(28, 28, width - 56, height - 56);
    ctx.lineWidth = 4;
    ctx.strokeRect(48, 48, width - 96, height - 96);

    ctx.fillStyle = "#65554a";
    ctx.font = "600 22px Georgia, serif";
    ctx.fillText(friendshipConfig.certificateTitle.toUpperCase(), 90, 140);

    ctx.fillStyle = "#3a2f28";
    ctx.font = "700 64px Georgia, serif";
    ctx.fillText(friendshipConfig.friendName, 90, 230);

    ctx.fillStyle = "#c97b84";
    ctx.font = "italic 36px Georgia, serif";
    ctx.fillText(friendshipConfig.certificateAward, 90, 300);

    ctx.fillStyle = "#65554a";
    ctx.font = "28px Georgia, serif";
    wrapText(ctx, friendshipConfig.certificateBody, 90, 370, 1020, 40);

    ctx.fillStyle = "#3a2f28";
    ctx.font = "italic 28px Georgia, serif";
    ctx.fillText("Lifetime membership, no expiration date.", 90, 560);
    ctx.font = "600 24px Georgia, serif";
    ctx.fillText(`Signed, ${friendshipConfig.senderName}`, 90, 620);

    const png = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = png;
    link.download = `${friendshipConfig.friendName}-best-friend-certificate.png`;
    link.click();
    setStatus("Certificate saved as a PNG.");
  };

  return (
    <div>
      <article className="relative overflow-hidden rounded-sm border-[10px] border-double border-sage bg-[#fff8ee] p-6 sm:p-10">
        <FlowerDoodle className="absolute -right-4 -top-3 h-24 w-24 text-sage/30" />
        <HeartDoodle className="absolute bottom-4 left-4 h-8 w-8 text-pink/40" />
        <p className="text-xs uppercase tracking-[0.28em] text-ink-soft">{friendshipConfig.certificateTitle}</p>
        <h3 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">{friendshipConfig.friendName}</h3>
        <p className="mt-3 font-script text-3xl text-pink">{friendshipConfig.certificateAward}</p>
        <p className="mt-5 max-w-2xl leading-relaxed text-ink-soft">{friendshipConfig.certificateBody}</p>
        <p className="mt-8 font-script text-2xl text-ink">Lifetime membership, no expiration date.</p>
        <p className="mt-2 text-sm uppercase tracking-[0.18em] text-ink-soft">Signed, {friendshipConfig.senderName}</p>
      </article>
      <button
        type="button"
        onClick={saveImage}
        className="mt-4 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-ink px-5 font-semibold text-paper"
      >
        <Download className="h-4 w-4" />
        Save certificate as image
      </button>
      <p className="mt-2 min-h-5 text-sm text-sage" aria-live="polite">{status}</p>
    </div>
  );
}

function ConfettiBurst({ active }: { active: boolean }) {
  if (!active) return null;
  const bits = Array.from({ length: 28 }, (_, index) => ({
    id: index,
    left: `${(index * 17) % 100}%`,
    delay: `${(index % 7) * 0.12}s`,
    color: ["#c97b84", "#5c7458", "#e2b48c", "#8f7aa6"][index % 4],
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {bits.map((bit) => (
        <span
          key={bit.id}
          className="absolute top-0 h-3 w-2 animate-confetti rounded-sm"
          style={{ left: bit.left, background: bit.color, animationDelay: bit.delay }}
        />
      ))}
    </div>
  );
}
