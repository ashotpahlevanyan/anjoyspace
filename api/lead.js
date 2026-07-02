/**
 * Lead intake — replaces the old Netlify Forms flow (which silently dropped
 * every submission once the site moved to Vercel).
 *
 * Accepts POST from the contact, newsletter and corporate forms and fans the
 * lead out to whichever sinks are configured via env vars:
 *   - Telegram  → instant inquiry alert to your phone
 *       TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 *   - MailerLite → adds newsletter signups to your list for nurture/automation
 *       MAILERLITE_API_KEY  (optional: MAILERLITE_GROUP_ID)
 *
 * If NOTHING is configured it returns 501 so the form shows a real error
 * instead of a fake "you're in" — no more lost leads.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = parseBody(req.body);

  // Honeypot: if the hidden field is filled, it's a bot. Accept silently so the
  // bot thinks it succeeded, but do nothing.
  if (body['bot-field']) return res.status(200).json({ ok: true });

  const form = String(body['form-name'] || body.form || 'contact').toLowerCase();
  const email = String(body.email || '').trim();
  const name = String(body.name || '').trim();
  const message = String(body.message || '').trim();
  const company = String(body.company || '').trim();
  const teamSize = String(body['team-size'] || '').trim();
  const source = String(body.source || '').trim();
  const utm = String(body.utm || '').trim();
  const referrer = String(body.referrer || '').trim();

  if (!isEmail(email)) {
    return res.status(400).json({ ok: false, error: 'A valid email address is required.' });
  }

  const sinks = [];
  // Newsletter + lead-magnet signups join the mailing list; others are inquiries.
  if (form === 'newsletter' || form === 'lead-magnet') sinks.push(addToMailerLite({ email, name }));
  sinks.push(notifyTelegram(form, { email, name, message, company, teamSize, source, utm, referrer }));

  const results = await Promise.all(sinks);
  const configured = results.some((r) => r.configured);
  const delivered = results.some((r) => r.configured && r.ok);

  if (!configured) {
    return res
      .status(501)
      .json({ ok: false, error: 'Lead delivery is not configured yet.' });
  }
  if (!delivered) {
    return res.status(502).json({ ok: false, error: 'Could not deliver the lead. Please email hello@anjoy.space.' });
  }
  return res.status(200).json({ ok: true });
}

function parseBody(raw) {
  if (!raw) return {};
  if (typeof raw === 'object') return raw;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return Object.fromEntries(new URLSearchParams(raw));
    }
  }
  return {};
}

function isEmail(v) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
}

async function notifyTelegram(form, data) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { configured: false, ok: false };

  const lines = [
    `🌿 *New ${escapeMd(form)} lead — anjoy.space*`,
    data.name && `*Name:* ${escapeMd(data.name)}`,
    `*Email:* ${escapeMd(data.email)}`,
    data.company && `*Company:* ${escapeMd(data.company)}`,
    data.teamSize && `*Team size:* ${escapeMd(data.teamSize)}`,
    data.message && `*Message:* ${escapeMd(data.message)}`,
    data.source && `*Source:* ${escapeMd(data.source)}`,
    data.utm && `*Campaign:* ${escapeMd(data.utm)}`,
    data.referrer && `*Referrer:* ${escapeMd(data.referrer)}`,
  ].filter(Boolean);

  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: lines.join('\n'), parse_mode: 'Markdown' }),
    });
    return { configured: true, ok: r.ok };
  } catch {
    return { configured: true, ok: false };
  }
}

async function addToMailerLite({ email, name }) {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) return { configured: false, ok: false };

  const payload = { email };
  if (name) payload.fields = { name };
  if (process.env.MAILERLITE_GROUP_ID) payload.groups = [process.env.MAILERLITE_GROUP_ID];

  try {
    const r = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });
    // MailerLite returns 200/201 on success (or when already subscribed).
    return { configured: true, ok: r.ok };
  } catch {
    return { configured: true, ok: false };
  }
}

function escapeMd(s) {
  return String(s).replace(/([_*`\[])/g, '\\$1');
}
