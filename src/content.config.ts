import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** A bilingual { ru, en } field. */
const loc = z.object({ ru: z.string(), en: z.string() });

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
    tag: z.string(), // e.g. "Sep 2025"
    tagStyle: z.enum(['upcoming', 'intensive', 'journey']).default('upcoming'),
    title: z.string(),
    location: z.string(),
    days: z.string(), // e.g. "7 Days"
    participants: z.string(), // e.g. "12 Participants"
    price: z.string(), // e.g. "$2,400"
    priceFrom: z.boolean().default(true),
    summary: z.string(), // card description
    // detail page
    heroEyebrow: z.string().default('Upcoming Retreat'),
    intro: z.string().optional(), // lead paragraph on the detail page
    highlights: z.array(z.string()).default([]),
    itinerary: z
      .array(z.object({ label: z.string(), title: z.string(), body: z.string() }))
      .default([]),
    gallery: z.array(z.object({ variant: z.string(), symbol: z.string() })).default([]),
    ctaTitle: z.string().optional(),
    ctaBody: z.string().optional(),
  }),
});

/** Past retreats archive (home page). English-only, as in the original site. */
const pastRetreats = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/past-retreats' }),
  schema: z.object({
    order: z.number().default(0),
    period: z.string(), // "Spring 2025 · Bali"
    title: z.string(),
    location: z.string(),
    summary: z.string(),
    participants: z.string(), // "12 participants · Sold out"
  }),
});

/** Gallery tiles (home page). */
const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: z.object({
    order: z.number().default(0),
    symbol: z.string(), // glyph / emoji shown over the tile
    variant: z.string(), // gimg-1 … gimg-8
    caption: z.string(),
  }),
});

/** Testimonials (home page). */
const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    order: z.number().default(0),
    quote: z.string(),
    author: z.string(),
    initial: z.string(),
    retreatRef: z.string(),
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
