import { useState } from 'react';

function encode(form: HTMLFormElement): string {
  return new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
}

type Status = 'idle' | 'done' | 'error';

/** Newsletter signup that posts to Netlify Forms (form name="newsletter"). */
export default function NewsletterForm() {
  const [status, setStatus] = useState<Status>('idle');

  const submit = async (form: HTMLFormElement) => {
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(form),
      });
      setStatus('done');
      form.reset();
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <form
      className="newsletter-form"
      name="newsletter"
      method="POST"
      data-netlify="true"
      onSubmit={(e) => {
        e.preventDefault();
        submit(e.currentTarget);
      }}
    >
      <input type="hidden" name="form-name" value="newsletter" />
      <input type="email" name="email" placeholder="Your email — for retreat announcements" required />
      {status === 'done' ? (
        <button type="submit" style={{ background: 'var(--sage)', color: 'var(--parchment)' }}>
          ✓ You're in
        </button>
      ) : status === 'error' ? (
        <button type="submit">Error — try again</button>
      ) : (
        <>
          <button type="submit" data-lang="ru">
            Оставаться рядом
          </button>
          <button type="submit" data-lang="en">
            Stay close
          </button>
        </>
      )}
    </form>
  );
}
