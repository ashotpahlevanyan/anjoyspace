import { useState } from 'react';

type Status = 'idle' | 'sending' | 'done' | 'error';

/** Newsletter signup — posts to the /api/lead serverless function. */
export default function NewsletterForm() {
  const [status, setStatus] = useState<Status>('idle');

  const submit = async (form: HTMLFormElement) => {
    setStatus('sending');
    const data = Object.fromEntries(new FormData(form) as unknown as Iterable<[string, string]>);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('done');
      form.reset();
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <form
      className="newsletter-form"
      name="newsletter"
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        submit(e.currentTarget);
      }}
    >
      <input type="hidden" name="form-name" value="newsletter" />
      <input type="email" name="email" placeholder="Your email — for retreat announcements" required />
      {status === 'done' ? (
        <button type="button" style={{ background: 'var(--sage)', color: 'var(--parchment)' }}>
          ✓ You're in
        </button>
      ) : status === 'error' ? (
        <button type="submit" style={{ background: 'var(--gold)', color: 'var(--night)' }}>
          Error — try again
        </button>
      ) : (
        <>
          <button type="submit" data-lang="ru" disabled={status === 'sending'}>
            {status === 'sending' ? 'Отправляем…' : 'Оставаться рядом'}
          </button>
          <button type="submit" data-lang="en" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Stay close'}
          </button>
        </>
      )}
    </form>
  );
}
