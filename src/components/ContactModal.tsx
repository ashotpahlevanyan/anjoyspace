import { useEffect, useState } from 'react';

/**
 * In-browser contact modal. Opens when any element with [data-contact] is
 * clicked (nav CTA, hero buttons, CTA band), and posts to the /api/lead
 * serverless function.
 */
export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const triggers = Array.from(document.querySelectorAll('[data-contact]'));
    const onClick = (e: Event) => {
      e.preventDefault();
      setOpen(true);
    };
    triggers.forEach((el) => el.addEventListener('click', onClick));
    return () => triggers.forEach((el) => el.removeEventListener('click', onClick));
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  const submit = async (form: HTMLFormElement) => {
    setSending(true);
    const data = Object.fromEntries(new FormData(form) as unknown as Iterable<[string, string]>);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSubmitted(true);
      setTimeout(close, 3000);
    } catch {
      const ru = (document.documentElement.getAttribute('lang') || 'ru') === 'ru';
      alert(
        ru
          ? 'Что-то пошло не так. Напишите нам напрямую: hello@anjoy.space.'
          : 'Something went wrong. Please email hello@anjoy.space directly.',
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`contact-modal${open ? ' open' : ''}`} onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="contact-modal-inner">
        <button className="contact-modal-close" aria-label="Close" onClick={close}>
          ✕
        </button>
        {submitted ? (
          <div className="cform-success">
            <span data-lang="ru">Спасибо! Мы свяжемся с вами в течение 24 часов.</span>
            <span data-lang="en">Thank you! We'll be in touch within 24 hours.</span>
          </div>
        ) : (
          <>
            <h3 data-lang="ru">Напишите нам</h3>
            <h3 data-lang="en">Get in touch</h3>
            <p data-lang="ru">
              Расскажите о себе — мы ответим в течение 24 часов и поможем выбрать подходящий ретрит.
            </p>
            <p data-lang="en">
              Tell us about yourself — we'll reply within 24 hours and help find the right retreat for you.
            </p>
            <form
              className="cform"
              name="contact"
              method="POST"
              onSubmit={(e) => {
                e.preventDefault();
                submit(e.currentTarget);
              }}
            >
              <input type="hidden" name="form-name" value="contact" />
              <p hidden aria-hidden="true">
                <label>
                  Don't fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>
              <input type="text" name="name" aria-label="Ваше имя" placeholder="Ваше имя" data-ph-ru="Ваше имя" data-ph-en="Your name" required />
              <input type="email" name="email" aria-label="Ваш email" placeholder="Ваш email" data-ph-ru="Ваш email" data-ph-en="Your email" required />
              <textarea
                name="message"
                rows={4}
                aria-label="Сообщение"
                placeholder="Какой ретрит вам интересен, или просто поздоровайтесь..."
                data-ph-ru="Какой ретрит вам интересен, или просто поздоровайтесь..."
                data-ph-en="Which retreat interests you, or just say hello..."
              />
              <button type="submit" data-lang="ru" disabled={sending}>
                {sending ? 'Отправляем…' : 'Отправить'}
              </button>
              <button type="submit" data-lang="en" disabled={sending}>
                {sending ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
