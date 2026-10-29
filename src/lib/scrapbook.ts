export function tiltFromId(id: string, span = 4) {
  let n = 0;
  for (const char of id) n = (n + char.charCodeAt(0) * 13) % 97;
  return (n % (span * 2 + 1)) - span;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
