/**
 * Theme / design tokens.
 *
 * Colors and fonts live in `src/content/settings/theme.json`, which is editable
 * through the CMS (color pickers per token, plus a scheme selector). At build
 * time `buildRootCss()` turns the active scheme into `:root { --token: value }`
 * declarations that BaseLayout injects in <head> — so all SCSS keeps using
 * `var(--gold)` etc. and changing a color in the CMS re-themes the whole site.
 */
import themeData from '../content/settings/theme.json';

export interface ThemeScheme {
  id: string;
  label: string;
  colors: Record<string, string>;
}

export interface ThemeConfig {
  active: string;
  gap: string;
  fonts: { serif: string; sans: string; mono: string };
  schemes: ThemeScheme[];
}

const theme = themeData as ThemeConfig;

export function getActiveScheme(): ThemeScheme {
  return theme.schemes.find((s) => s.id === theme.active) ?? theme.schemes[0];
}

/** Build the inline `:root { ... }` CSS for the active scheme. */
export function buildRootCss(): string {
  const scheme = getActiveScheme();
  const colorVars = Object.entries(scheme.colors)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');
  return `:root {
${colorVars}
  --gap: ${theme.gap};
  --font-serif: ${theme.fonts.serif};
  --font-sans: ${theme.fonts.sans};
  --font-mono: ${theme.fonts.mono};
}`;
}

export { theme };
