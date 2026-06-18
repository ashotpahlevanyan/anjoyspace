# Anjoy Space

Yoga-retreat site. **Astro + React (islands) + SCSS + TypeScript**, content managed
through **Sveltia CMS** (a Decap/Netlify-CMS-compatible visual editor), deployed on Netlify.

The site is statically generated and bilingual (RU / EN) with a live language toggle.

## Commands

```bash
npm install        # install dependencies (Node 20+)
npm run dev        # local dev server → http://localhost:4321
npm run build      # static build → dist/
npm run preview    # preview the production build
```

## Project structure

```
src/
  components/        Reusable pieces
    SiteNav.tsx, ContactModal.tsx, NewsletterForm.tsx   ← interactive React islands
    Hero/cards/Footer/Mandala/... (.astro)              ← static, zero-JS presentational
    T.astro                                             ← bilingual {ru,en} text helper
  layouts/BaseLayout.astro     <head>, fonts, theme vars, nav, footer, reveal
  pages/                       Routes
    index.astro                Home
    retreats/[slug].astro      Retreat detail pages (one per CMS entry)
    teachers/index.astro, teachers/[slug].astro
    retreat-center/, corporate/, 404.astro
  content/                     CMS-managed content (type-checked by src/content.config.ts)
    retreats/*.md, past-retreats/*.md, gallery/*.md, testimonials/*.md, teachers/*.md
    settings/{site,theme}.json
    pages/{home,teachers}.json
  styles/                      SCSS partials, tokens come from the CMS theme
  lib/                         i18n, theme, accent helpers
public/
  admin/                       Sveltia CMS (index.html + config.yml)
  assets/                      favicon, _redirects, images/uploads (CMS media)
```

## Editing content (the CMS)

Content lives in `src/content/`. Editors change it through the CMS at **`/admin/`** — every
save commits to the git repo and Netlify rebuilds automatically.

### Run the CMS locally (no login needed)

```bash
npm run dev          # terminal 1 — serves the site + /admin
npx decap-server     # terminal 2 — local git backend proxy
```

Then open **http://localhost:4321/admin/**. `local_backend: true` in
`public/admin/config.yml` makes the CMS read/write your working copy directly.

### Common tasks

- **Add a new retreat page** → CMS → *Retreats* → *New Retreat*. Filling it in and saving
  creates `src/content/retreats/<slug>.md`, which generates a full page at
  `/retreats/<slug>/` and a card on the home page. (Set *Draft* to hide it.)
- **Add a teacher** → *Teachers* → *New Teacher*. Generates `/teachers/<slug>/` and a card.
  Each bilingual field has side-by-side RU / EN inputs.
- **Edit colors / theme** → *Settings* → *Theme & Colors*. Pick colors per token and set the
  active scheme; the whole site re-themes on the next build.
- **Site info / footer** → *Settings* → *Site Info*. **Page copy** → *Page Copy*.

## Theming

Color and font tokens live in `src/content/settings/theme.json`. At build time
`src/lib/theme.ts` turns the active scheme into `:root { --token: value }` CSS variables that
`BaseLayout` injects, so all SCSS uses `var(--gold)` etc. Add a scheme to the `schemes` list
and point `active` at it to switch palettes site-wide. Per-teacher accent colors are handled
separately in `src/lib/accents.ts`.

## Deployment (Netlify)

`netlify.toml` builds with `npm run build` and publishes `dist/`. The contact and newsletter
forms use **Netlify Forms** — hidden detection forms are emitted on every page (see
`src/components/NetlifyForms.astro`).

### One-time setup for the CMS in production

The git-based CMS needs a connected git host and login:

1. Push this repo to GitHub and connect it to a Netlify site.
2. In Netlify: **Identity** → enable it; under **Services → Git Gateway**, enable it.
3. Invite editors via **Identity → Invite users**. They log in at `https://<site>/admin/`.

(Alternatively, switch `public/admin/config.yml` `backend` to Sveltia's GitHub backend.)

## Notes

- The original hand-written HTML is kept in `untitled/` for reference (git-ignored). Once
  you're happy with parity it can be deleted.
- Bilingual content is modeled as `{ ru, en }` objects and rendered twice with `data-lang`;
  CSS shows the active language. The toggle persists in `localStorage`.
