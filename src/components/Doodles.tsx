type DoodleProps = {
  className?: string;
};

export function FlowerDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none">
      <path
        d="M32 36c3 8 1 15-1 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path d="M31 48c-5 1-8-1-10-4 4-1 8 0 10 4Z" fill="currentColor" opacity="0.32" />
      <ellipse cx="32" cy="23" rx="7.5" ry="10.5" fill="currentColor" opacity="0.34" />
      <ellipse cx="22" cy="28" rx="7.5" ry="9.5" fill="currentColor" opacity="0.42" />
      <ellipse cx="42" cy="28" rx="7.5" ry="9.5" fill="currentColor" opacity="0.42" />
      <ellipse cx="26" cy="17" rx="6.5" ry="8.5" fill="currentColor" opacity="0.5" />
      <ellipse cx="38" cy="17" rx="6.5" ry="8.5" fill="currentColor" opacity="0.5" />
      <circle cx="32" cy="24" r="4.6" fill="#F7E6D3" />
    </svg>
  );
}

export function HeartDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M16 27s-10.5-7.2-10.5-14A5.5 5.5 0 0 1 16 9.8 5.5 5.5 0 0 1 26.5 13C26.5 19.8 16 27 16 27Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function OutlineHeart({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <path
        d="M16 26.5s-10-6.9-10-13.4A5.2 5.2 0 0 1 16 9.6a5.2 5.2 0 0 1 10 3.5c0 6.5-10 13.4-10 13.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="m16 3 3.2 8.4H28l-7 5.2 2.7 8.4L16 20.6 8.3 25l2.7-8.4-7-5.2h8.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Sparkle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <path
        d="M16 3c1.2 7 3.2 9 10 10-6.8 1-8.8 3-10 10-1.2-7-3.2-9-10-10 6.8-1 8.8-3 10-10Z"
        fill="currentColor"
        opacity="0.75"
      />
    </svg>
  );
}

export function Squiggle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 160 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M4 14c18-16 28 16 46 0s28 16 46 0 28 16 46 0"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Underline({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 220 18" className={className} aria-hidden="true" fill="none">
      <path
        d="M4 12c34-8 76-9 110-6 30 2 68 3 102-2"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M22 16c40-5 90-6 132-3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.38"
      />
    </svg>
  );
}

export function Petal({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 20 28" className={className} aria-hidden="true">
      <ellipse cx="10" cy="14" rx="7" ry="13" fill="currentColor" />
    </svg>
  );
}

export function LeafSprig({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 44 66" className={className} aria-hidden="true" fill="none">
      <path
        d="M22 64c0-18 2-34 10-48"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path d="M22 30c-9-2-13-8-13-15 8 0 14 5 13 15Z" fill="currentColor" opacity="0.36" />
      <path d="M26 22c-1-9 3-15 10-18 1 8-2 15-10 18Z" fill="currentColor" opacity="0.28" />
      <path d="M22 42c8-2 14 1 17 7-7 2-14 0-17-7Z" fill="currentColor" opacity="0.32" />
      <path d="M24 52c-7-2-12 0-15 6 6 2 12 0 15-6Z" fill="currentColor" opacity="0.26" />
    </svg>
  );
}

export function Butterfly({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <path
        d="M24 15c-2-8-9-11-14-8-5 3-4 11 1 14 4 2 9 3 13 2"
        fill="currentColor"
        opacity="0.42"
      />
      <path
        d="M24 15c2-8 9-11 14-8 5 3 4 11-1 14-4 2-9 3-13 2"
        fill="currentColor"
        opacity="0.52"
      />
      <path d="M24 23c-4 2-10 5-10 10 0 4 4 5 7 2 2-2 3-7 3-12Z" fill="currentColor" opacity="0.3" />
      <path d="M24 23c4 2 10 5 10 10 0 4-4 5-7 2-2-2-3-7-3-12Z" fill="currentColor" opacity="0.38" />
      <path d="M24 12v22" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function PaperClip({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 28 56" className={className} aria-hidden="true" fill="none">
      <path
        d="M19 16v24a7 7 0 0 1-14 0V12a9 9 0 0 1 18 0v26"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
