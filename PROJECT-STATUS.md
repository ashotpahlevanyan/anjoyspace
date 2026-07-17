# Anjoy Space — Project Status & Context

> Resume point. Where things stand, key facts, and what's next.
> Last updated: 2026-07-17.

## What this is
The whole anjoy.space site + brand system is a **gift being built for Ani (Ani Ovakimian)**,
the yoga teacher behind Anjoy Space. She has **not yet accepted / taken ownership** — so a few
things wait on her (real teacher photos, filming **real asana videos with Ani**, her direct
involvement in content). Decisions are made thoughtfully on her behalf. Keep craft high and the
brand authentic (real presence over AI).

## Stack & workflow
- **Astro** static site, hosted on **Vercel**. **Deploy = merge PR to `main`** (Vercel auto-builds).
- Dev: `npx astro dev` (:4321). Build gate: `npx astro build`.
- Content in `src/content/` (retreats, teachers, testimonials, blog, settings). CMS at `/admin`.
- Leads: `/api/lead` → Telegram bot alert (+ MailerLite for newsletter). First-touch UTM attribution baked in.

## Brand facts
- Palette "Anjoy Night": night `#0D1117`, gold `#C9A96E`, gold-light `#E2C98A`, sage `#3D6B5E`,
  violet `#8B6F9E`, parchment `#F5F0E8`. Fonts: Cormorant Garamond / DM Sans / DM Mono. Mandala mark.
- **Moscow-based** (LocalBusiness). Retreats: Russia (Pereslavl-Zalessky) + abroad (Bali, Ibiza,
  Rishikesh, Tulum) + **Armenia centers planned: Lori + Gavar** (Ani has a house near Lake Sevan).
- Contacts: phone/WhatsApp **+7 915 159 3376**, Telegram **@ovakimianani**, Instagram **@anjoy_space**,
  email **hello@anjoy.space**.

## Analytics & search (LIVE)
- **Google Analytics 4:** `G-QNCQES8F55` — production-domain-gated (in `BaseLayout`).
- **Yandex Metrica:** counter `110564858` — production-gated.
- **Yandex Webmaster:** verified (`/yandex_4a9e925667ba8d95.html` + meta tag), region set to Russia,
  sitemap submitted.
- **Google Search Console:** ⏳ pending — add property, verify (GA auto-verify likely), submit
  `https://anjoy.space/sitemap-index.xml`.

## Shipped & live
- **SEO structured data:** Organization + **LocalBusiness** (Moscow address/phone/areaServed/knowsAbout),
  **TouristTrip + FAQPage** per retreat, **Person** per teacher, **AggregateRating + Review** from
  testimonials (validated — Rich Results Test: 9 valid items). Meta descriptions on all key pages.
  Sitemap excludes `/admin`, `/offers`.
- **NFC digital card:** `/card` (Save contact → `/anjoy.vcf`, Explore-retreats button, clickable logo).
  Print files in `marketing/business-card/` (front/back SVGs + PDFs + `PRINT-SPEC.md` + spec PDF).
- **Offer generator:** `/offers` (unlisted hub) + `/offers/<slug>` (1080² image, `?theme=&lang=&capture=`).
  `scripts/generate-offers.sh` → PNG/PDF into `marketing/retreat-offers/` (gitignored). PDF has a
  clickable Reserve button; PNG shows WhatsApp/Telegram so the CTA is actionable.
- **Retreat-center vision scenes** (animated SVG, reduced-motion-safe): Lori canyon, fantasized
  architecture concept, Gavar/Lake Sevan (churches, moon reflection, boat + SUP boards).
- **Floating WhatsApp/Telegram chat** buttons (bottom-left, brand-styled, prefilled greeting).
- **Mobile CTA:** right-edge collapsible "Book a retreat" (tap to expand, tap to book).
- Home fixes, retreat-card font bump, Lila dropdown-hang fix.

## Open / next (roughly by leverage)
1. **Google Search Console** verify + submit sitemap (quick).
2. **Yandex Business + Google Business Profile** listings (Moscow) — biggest local lever for
   "йога Москва / ретрит Москва". User action; needs address + reviews.
3. **English URLs + `hreflang`** — the big unlock for the "abroad"/English audience (site is
   currently client-side language toggle, single URL — Google can't rank a distinct EN page).
4. **`/contact` page** (map + NAP) — helps local SEO, gives a proper geographic page.
5. **Online booking / deposit** (YooKassa/CloudPayments or structured Telegram) — biggest revenue lever.
6. **Link-in-bio page** (like `/card`, UTM-tagged) — highest-leverage IG move.
7. Quick wins: "spots left" urgency, self-host fonts, image optimization (`astro:assets`).
8. **Real asana videos with Ani** + IG content — after Ani accepts. See `marketing/instagram-content-ideas.md`.

## Docs
- `marketing/instagram-content-ideas.md` — IG/content strategy backlog (living).
- `marketing/business-card/` — NFC card art + print spec.

## Conventions
- Unlisted internal pages (`/offers`, `/card` destination, `/invest` idea) = `noindex` + excluded
  from sitemap; reachable by URL only.
- Chat/DMs: keep in one thread; recommended = shared brand handle + WhatsApp Business (Ani's call).
