import type { GalleryPhoto } from "@/data/friendship-config";

export function PolaroidArt({ photo }: { photo: GalleryPhoto }) {
  const { from, to, motif } = photo.placeholder;

  return (
    <svg viewBox="0 0 320 360" className="h-full w-full" role="img" aria-label={photo.alt}>
      <defs>
        <linearGradient id={`${photo.id}-sky`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="320" height="360" fill={`url(#${photo.id}-sky)`} />
      {motif === "sunrise" && (
        <>
          <circle cx="210" cy="150" r="48" fill="#FFF4D8" opacity="0.9" />
          <path d="M0 250 C80 210 140 280 220 230 C270 200 300 250 320 240 L320 360 H0Z" fill="#E8C4A8" />
          <path d="M0 290 C90 250 160 310 250 270 L320 290 V360 H0Z" fill="#D9A58A" />
        </>
      )}
      {motif === "notes" && (
        <>
          <rect x="48" y="70" width="150" height="190" fill="#FFF8EE" transform="rotate(-8 123 165)" />
          <rect x="130" y="90" width="140" height="170" fill="#F4E4F0" transform="rotate(7 200 175)" />
          <path d="M70 120 h90 M68 148 h80 M72 176 h70" stroke="#8F7AA6" strokeWidth="3" opacity="0.45" />
        </>
      )}
      {motif === "rain" && (
        <>
          <rect x="0" y="220" width="320" height="140" fill="#8FA3B0" opacity="0.45" />
          <path d="M40 40 l8 28 M90 20 l7 32 M150 50 l6 26 M210 18 l8 30 M270 40 l7 28" stroke="#FFF" strokeWidth="3" opacity="0.55" />
          <rect x="90" y="150" width="140" height="90" fill="#F6EFE4" opacity="0.35" />
        </>
      )}
      {motif === "picnic" && (
        <>
          <ellipse cx="160" cy="250" rx="120" ry="40" fill="#C9B48A" opacity="0.5" />
          <circle cx="120" cy="180" r="34" fill="#E8A0A8" />
          <circle cx="190" cy="170" r="28" fill="#D7E3C4" />
          <rect x="140" y="200" width="70" height="18" rx="8" fill="#FFF8EE" />
        </>
      )}
      {motif === "night" && (
        <>
          <circle cx="230" cy="90" r="28" fill="#F6EFE4" />
          <circle cx="70" cy="70" r="3" fill="#FFF8EE" />
          <circle cx="110" cy="120" r="2" fill="#FFF8EE" />
          <circle cx="180" cy="50" r="2.5" fill="#FFF8EE" />
          <path d="M0 260 C80 220 140 280 200 240 C260 210 300 250 320 230 V360 H0Z" fill="#4E5A73" opacity="0.55" />
        </>
      )}
      {motif === "letters" && (
        <>
          <rect x="60" y="90" width="170" height="110" fill="#FFF8EE" transform="rotate(-6 145 145)" />
          <rect x="90" y="140" width="170" height="110" fill="#F3D6D8" transform="rotate(8 175 195)" />
          <circle cx="175" cy="195" r="18" fill="#8A3D42" opacity="0.85" />
        </>
      )}
      <rect x="18" y="300" width="284" height="42" fill="#FFF8EE" opacity="0.18" />
    </svg>
  );
}
