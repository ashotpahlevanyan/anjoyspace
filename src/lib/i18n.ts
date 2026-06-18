/**
 * Bilingual content helpers.
 *
 * The site keeps the original live RU/EN toggle: every element is rendered in
 * both languages with a `data-lang` attribute, and CSS (driven by the `lang`
 * attribute on <html>) shows only the active one. See `src/styles/_base.scss`
 * and the `<T>` component.
 *
 * A field can be either a plain string (single language — used for content
 * that was English-only in the original site) or a `{ ru, en }` pair.
 */
export type Localized = string | { ru: string; en: string };

export const LANGS = ['ru', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'ru';
export const LANG_STORAGE_KEY = 'anjoy_lang';

export function isBilingual(value: Localized): value is { ru: string; en: string } {
  return typeof value === 'object' && value !== null && 'ru' in value && 'en' in value;
}

/** Resolve a Localized value for a specific language (used in <head>/meta where only one string is allowed). */
export function pick(value: Localized | undefined, lang: Lang = DEFAULT_LANG): string {
  if (value == null) return '';
  return isBilingual(value) ? value[lang] : value;
}
