import type { GalleryPhoto } from "@/data/friendship-config";

export function PolaroidArt({ photo }: { photo: GalleryPhoto }) {
  const { from, to, motif } = photo.placeholder;
  const uid = photo.id;

  return (
    <svg viewBox="0 0 320 360" className="h-full w-full" role="img" aria-label={photo.alt}>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" x2="0.4" y1="0" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <linearGradient id={`${uid}-glow`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFF8E8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFF8E8" stopOpacity="0" />
        </linearGradient>
        <filter id={`${uid}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <filter id={`${uid}-blur`}>
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      <rect width="320" height="360" fill={`url(#${uid}-sky)`} />
      <rect width="320" height="360" fill={`url(#${uid}-glow)`} opacity="0.35" />

      {motif === "sunrise" && (
        <>
          <circle cx="206" cy="150" r="62" fill="#FFF6DE" opacity="0.55" filter={`url(#${uid}-blur)`} />
          <circle cx="206" cy="150" r="40" fill="#FFF9EC" opacity="0.9" />
          <path d="M0 248 C70 214 138 276 208 234 C262 202 296 246 320 236 L320 360 H0Z" fill="#E9C4A6" opacity="0.85" />
          <path d="M0 286 C86 248 158 306 246 268 C284 252 308 268 320 262 L320 360 H0Z" fill="#D9A98D" opacity="0.9" />
          <path d="M0 322 C74 296 166 330 240 308 C284 296 306 302 320 300 L320 360 H0Z" fill="#C08E76" opacity="0.8" />
          <g stroke="#FFF8E8" strokeWidth="2" strokeLinecap="round" opacity="0.5">
            <path d="M64 108h18M73 99v18" />
            <path d="M268 84h12M274 78v12" />
          </g>
        </>
      )}

      {motif === "notes" && (
        <>
          <rect x="40" y="64" width="156" height="196" rx="2" fill="#FFFCF4" transform="rotate(-7 118 162)" />
          <rect x="120" y="88" width="148" height="176" rx="2" fill="#F6E9F2" transform="rotate(6 194 176)" />
          <g stroke="#8F7AA6" strokeWidth="2.6" strokeLinecap="round" opacity="0.38">
            <path d="M64 116h104M62 142h92M66 168h78M64 194h96" />
          </g>
          <g stroke="#C98991" strokeWidth="2.2" strokeLinecap="round" opacity="0.5">
            <path d="M142 140h96M146 164h80M144 188h96M146 212h64" />
          </g>
          <path d="M226 96c6-10 20-8 22 2 2 9-12 16-22 22" stroke="#9C4A4E" strokeWidth="1.8" fill="none" opacity="0.45" />
        </>
      )}

      {motif === "rain" && (
        <>
          <rect x="0" y="210" width="320" height="150" fill="#8095A3" opacity="0.5" />
          <g stroke="#FFFDF7" strokeWidth="2.4" strokeLinecap="round" opacity="0.55">
            <path d="M46 34l-7 26M96 16l-7 30M150 44l-6 24M206 14l-7 28M262 38l-6 26M292 66l-5 20" />
          </g>
          <rect x="84" y="138" width="152" height="104" rx="2" fill="#F7F2E8" opacity="0.32" />
          <path d="M84 138h152M160 138v104M84 190h152" stroke="#F7F2E8" strokeWidth="2" opacity="0.4" />
          <ellipse cx="160" cy="300" rx="120" ry="22" fill="#6F8391" opacity="0.35" />
          <circle cx="230" cy="270" r="16" fill="#F3D6D8" opacity="0.55" />
        </>
      )}

      {motif === "picnic" && (
        <>
          <rect x="0" y="236" width="320" height="124" fill="#C8B183" opacity="0.35" />
          <g opacity="0.35" stroke="#FFF8EE" strokeWidth="9">
            <path d="M0 268h320M0 320h320" />
            <path d="M40 236v124M120 236v124M200 236v124M280 236v124" />
          </g>
          <ellipse cx="158" cy="250" rx="118" ry="36" fill="#E4D2A6" opacity="0.55" />
          <circle cx="118" cy="184" r="30" fill="#E8A0A8" />
          <circle cx="106" cy="174" r="9" fill="#F3C9C9" opacity="0.7" />
          <circle cx="190" cy="172" r="24" fill="#D7E3C4" />
          <circle cx="184" cy="166" r="7" fill="#EDF3E1" opacity="0.7" />
          <rect x="142" y="204" width="66" height="16" rx="7" fill="#FFF8EE" />
          <rect x="142" y="204" width="66" height="6" rx="3" fill="#E8C4A0" />
          <path d="M244 226c8-16 26-14 28 0 2 12-16 20-28 28" stroke="#B7C9A8" strokeWidth="2" fill="none" opacity="0.6" />
        </>
      )}

      {motif === "night" && (
        <>
          <circle cx="228" cy="86" r="30" fill="#FFF6DE" opacity="0.92" />
          <circle cx="216" cy="78" r="30" fill={to} opacity="0.85" />
          <g fill="#FFFDF7">
            <circle cx="66" cy="64" r="2.4" />
            <circle cx="108" cy="112" r="1.8" />
            <circle cx="178" cy="44" r="2" />
            <circle cx="64" cy="150" r="1.6" />
            <circle cx="256" cy="152" r="2.2" />
            <circle cx="146" cy="88" r="1.4" />
            <circle cx="288" cy="60" r="1.6" />
          </g>
          <g stroke="#FFFDF7" strokeWidth="1.2" opacity="0.6">
            <path d="M104 130l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
            <path d="M262 116l1.4 3.6 3.6 1.4-3.6 1.4-1.4 3.6-1.4-3.6-3.6-1.4 3.6-1.4Z" />
          </g>
          <path d="M0 258 C74 218 138 276 202 238 C258 206 300 246 320 228 L320 360 H0Z" fill="#4C5770" opacity="0.62" />
          <path d="M0 298 C82 268 152 314 236 284 C282 268 306 280 320 274 L320 360 H0Z" fill="#3B445B" opacity="0.55" />
        </>
      )}

      {motif === "letters" && (
        <>
          <rect x="46" y="82" width="176" height="116" rx="2" fill="#FFFCF4" transform="rotate(-6 134 140)" />
          <path d="M46 82 134 148 222 82" stroke="#D9C4A8" strokeWidth="2" fill="none" transform="rotate(-6 134 140)" opacity="0.8" />
          <rect x="92" y="150" width="176" height="116" rx="2" fill="#F3DCE0" transform="rotate(7 180 208)" />
          <path d="M92 150 180 216 268 150" stroke="#D9A5A8" strokeWidth="2" fill="none" transform="rotate(7 180 208)" opacity="0.8" />
          <circle cx="182" cy="212" r="17" fill="#9C4A4E" opacity="0.8" />
          <path d="M182 206s-5-3.4-5-6.4a2.4 2.4 0 0 1 5-1 2.4 2.4 0 0 1 5 1c0 3-5 6.4-5 6.4Z" fill="#F7DCDC" opacity="0.9" />
          <g stroke="#B7C9A8" strokeWidth="1.6" fill="none" opacity="0.55">
            <path d="M56 296c14-14 28-14 42 0" />
            <path d="M226 300c12-12 24-12 36 0" />
          </g>
        </>
      )}

      <rect width="320" height="360" filter={`url(#${uid}-grain)`} opacity="0.055" />
      <rect x="0" y="0" width="320" height="360" fill="none" stroke="#000" strokeOpacity="0.04" strokeWidth="2" />
    </svg>
  );
}
