/** Per-teacher accent palettes (the original used --rose / --rose-light). */
export const ACCENTS = {
  // `text` is a contrast-safe variant of the accent (>=4.5:1 on dark bg) used
  // only for small accent-coloured text (eyebrows, mono captions). The base
  // `accent` stays for large text, icons, borders and fills.
  gold: { accent: '#C9A96E', light: '#E2C98A', dot: '#E2C98A', text: '#C9A96E', border: 'rgba(201,169,110,0.2)' },
  violet: { accent: '#8B6F9E', light: '#AB8FC2', dot: '#C4A8D9', text: '#A98BC0', border: 'rgba(139,111,158,0.2)' },
} as const;

export type AccentKey = keyof typeof ACCENTS;

/** Inline `style` string setting the accent CSS vars on a .page-teacher wrapper. */
export function accentStyle(key: AccentKey): string {
  const a = ACCENTS[key];
  return `--accent: ${a.accent}; --accent-light: ${a.light}; --accent-text: ${a.text}; --border: ${a.border};`;
}
