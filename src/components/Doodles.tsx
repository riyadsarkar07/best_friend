type DoodleProps = {
  className?: string;
};

export function FlowerDoodle({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M32 34c8 10 4 18 0 22"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <ellipse cx="32" cy="24" rx="8" ry="11" fill="currentColor" opacity="0.35" />
      <ellipse cx="22" cy="28" rx="8" ry="10" fill="currentColor" opacity="0.45" />
      <ellipse cx="42" cy="28" rx="8" ry="10" fill="currentColor" opacity="0.45" />
      <ellipse cx="26" cy="18" rx="7" ry="9" fill="currentColor" opacity="0.5" />
      <ellipse cx="38" cy="18" rx="7" ry="9" fill="currentColor" opacity="0.5" />
      <circle cx="32" cy="24" r="5" fill="#F6E1CC" />
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

export function Squiggle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 160 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M4 14c18-16 28 16 46 0s28 16 46 0 28 16 46 0"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
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
