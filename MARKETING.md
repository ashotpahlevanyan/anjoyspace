# Marketing & Analytics

## The funnel

```
Instagram / Telegram / Google
        ↓
Blog (/blog/, organic)  +  Lead magnet (/free/)
        ↓
Email captured via /api/lead  →  Telegram alert (Anjoy.Space group) + mailing list
        ↓
Nurture (email / Telegram)  →  retreat booking
```

## Where leads go

Every form (contact, newsletter, corporate, lead magnet) POSTs to the `/api/lead`
serverless function, which:

- sends an instant alert to the **Anjoy.Space Telegram group**, and
- adds newsletter + lead-magnet emails to the **mailing list** (MailerLite, once
  `MAILERLITE_API_KEY` is set on Vercel).

The Telegram alert shows: name, email, form type, **source** (e.g. `nidra-guide`),
**campaign** (from UTM tags), and **referrer** — so every lead is attributable.

## UTM link conventions

Tag every campaign link so traffic and leads are traceable. Format:

```
https://anjoy.space/free/?utm_source=SOURCE&utm_medium=MEDIUM&utm_campaign=CAMPAIGN
```

- `utm_source` — where it's posted: `instagram`, `telegram`, `youtube`, `newsletter`
- `utm_medium` — the type: `bio`, `story`, `post`, `reel`, `dm`, `ad`
- `utm_campaign` — the push: `nidra-guide`, `spring-retreat`, `launch`

Examples:

```
Instagram bio link → https://anjoy.space/free/?utm_source=instagram&utm_medium=bio&utm_campaign=nidra-guide
Telegram post      → https://anjoy.space/blog/?utm_source=telegram&utm_medium=post&utm_campaign=launch
```

The first UTM values a visitor arrives with are remembered for their session and
attached to any lead they submit (shown as **Campaign** in the Telegram alert).

## Analytics

**Vercel Web Analytics** is wired in (`@vercel/analytics`). Enable it once in the
Vercel dashboard: project → **Analytics** tab → **Enable**. Then you'll see page
views, top pages, traffic sources, and referrers — including how many people reach
`/free/` and `/blog/`.

## On-site entry points to the lead magnet

`/free/` is linked from: the site footer (every page), the home newsletter CTA, and
every blog post. Also add it to your Instagram and Telegram **bios** (with UTM tags)
— that's where most of the traffic will come from.
