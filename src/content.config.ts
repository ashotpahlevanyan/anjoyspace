import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** A bilingual { ru, en } field. */
const loc = z.object({ ru: z.string(), en: z.string() });

/**
 * A field that is either a plain string (single-language — as the English-only
 * demo retreats use) or a bilingual { ru, en } pair. Rendered through `<T>`.
 */
const localized = z.union([z.string(), loc]);

/**
 * Upcoming retreats. Each entry is a folder-collection file in the CMS, and
 * each one statically generates a full page at /retreats/<slug>/ — so authors
 * create new retreat pages simply by adding an entry. The markdown body holds
 * the long-form overview.
 */
const retreats = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/retreats' }),
  schema: z.object({
    order: z.number().default(0),
    draft: z.boolean().default(false),
    // card + hero
    tag: localized, // e.g. "Sep 2025"
    tagStyle: z.enum(['upcoming', 'intensive', 'journey']).default('upcoming'),
    title: localized,
    location: localized,
    days: localized, // e.g. "7 Days"
    participants: localized, // e.g. "12 Participants"
    price: localized, // e.g. "$2,400"
    priceFrom: z.boolean().default(true),
    summary: localized, // card description
    // detail page
    heroEyebrow: localized.default('Upcoming Retreat'),
    intro: localized.optional(), // lead paragraph on the detail page
    highlights: z.array(localized).default([]),
    itinerary: z
      .array(z.object({ label: localized, title: localized, body: localized }))
      .default([]),
    // long-form overview, expressed as bilingual sections instead of the
    // markdown body (which cannot carry two languages). When non-empty these
    // render in place of the markdown <Content />.
    sections: z
      .array(z.object({ heading: localized, body: z.array(localized).default([]) }))
      .default([]),
    faq: z.array(z.object({ q: localized, a: localized })).default([]),
    // real venue photos (carousel + lightbox); preferred over `gallery` glyphs.
    photos: z.array(z.object({ src: z.string(), alt: localized.optional() })).default([]),
    // video / image testimonials shown in a carousel with popups.
    reviews: z
      .array(
        z.object({
          name: localized,
          kind: z.enum(['video', 'image', 'vk']).default('video'),
          poster: z.string().optional(),
          src: z.string().optional(), // self-hosted video / image file
          vk: z.string().optional(), // VK video id, e.g. "-230744987_456239018"
        }),
      )
      .default([]),
    gallery: z.array(z.object({ variant: z.string(), symbol: z.string() })).default([]),
    ctaTitle: localized.optional(),
    ctaBody: localized.optional(),
  }),
});

/** Past retreats archive (home page). Bilingual. */
const pastRetreats = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/past-retreats' }),
  schema: z.object({
    order: z.number().default(0),
    period: localized, // "Spring 2025 · Bali"
    title: localized,
    location: localized,
    summary: localized,
    participants: localized, // "12 participants · Sold out"
  }),
});

/** Gallery tiles (home page). */
const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: z.object({
    order: z.number().default(0),
    symbol: z.string(), // glyph / emoji shown over the tile
    variant: z.string(), // gimg-1 … gimg-8
    caption: localized,
  }),
});

/** Testimonials (home page). */
const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    order: z.number().default(0),
    quote: localized,
    author: z.string(),
    initial: z.string(),
    retreatRef: localized,
    rating: z.number().min(1).max(5).default(5),
  }),
});

/**
 * Teachers. Rich bilingual model that drives both the teacher card on
 * /teachers/ and the full profile page at /teachers/<slug>/.
 */
const teachers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teachers' }),
  schema: z.object({
    order: z.number().default(0),
    accent: z.enum(['gold', 'violet']).default('gold'),
    portraitVariant: z.enum(['tp-1', 'tp-2', 'tp-3']).default('tp-1'),
    // card
    name: loc,
    cardRole: loc,
    cardTags: z.array(loc).default([]),
    cardBio: loc,
    // detail hero
    firstName: loc,
    lastName: loc,
    eyebrow: loc,
    lede: loc,
    heroTags: z.array(loc).default([]),
    portraitRole: loc,
    // philosophy
    philosophy: z.object({ quote: loc, attribution: loc }),
    // offerings
    offeringsIntro: loc,
    offerings: z
      .array(
        z.object({
          tag: loc.optional(),
          title: loc,
          body: loc,
          linkLabel: loc.optional(),
          linkHref: z.string().optional(),
        }),
      )
      .default([]),
    // practices
    practicesIntro: loc,
    practices: z.array(z.object({ icon: z.string(), title: loc, body: loc })).default([]),
    // path / credentials
    path: z.array(z.object({ year: loc, title: loc, body: loc })).default([]),
    // gallery tiles
    gallery: z.array(z.object({ variant: z.string(), symbol: z.string() })).default([]),
    // testimonials
    testimonials: z.array(z.object({ quote: loc, name: z.string(), meta: loc })).default([]),
    // cta + contacts
    cta: z.object({ title: loc, body: loc }),
    contacts: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    footerName: loc,
  }),
});

export const collections = { retreats, pastRetreats, gallery, testimonials, teachers };
