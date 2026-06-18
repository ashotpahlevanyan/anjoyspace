/** Per-teacher accent palettes (the original used --rose / --rose-light). */
export const ACCENTS = {
  gold: { accent: '#C9A96E', light: '#E2C98A', dot: '#E2C98A', border: 'rgba(201,169,110,0.2)' },
  violet: { accent: '#8B6F9E', light: '#AB8FC2', dot: '#C4A8D9', border: 'rgba(139,111,158,0.2)' },
} as const;

export type AccentKey = keyof typeof ACCENTS;

/** Inline `style` string setting the accent CSS vars on a .page-teacher wrapper. */
export function accentStyle(key: AccentKey): string {
  const a = ACCENTS[key];
  return `--accent: ${a.accent}; --accent-light: ${a.light}; --border: ${a.border};`;
}
