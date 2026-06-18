import { useEffect, useState } from 'react';

/** Encode form data the way Netlify Forms expects. */
function encode(form: HTMLFormElement): string {
  return new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
}

/**
 * In-browser contact modal. Opens when any element with [data-contact] is
 * clicked (nav CTA, hero buttons, CTA band), and posts to Netlify Forms.
 */
export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(form),
      });
      setSubmitted(true);
      setTimeout(close, 3000);
    } catch {
      alert('Something went wrong. Please email hello@anjoy.space directly.');
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
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={(e) => {
                e.preventDefault();
                submit(e.currentTarget);
              }}
            >
              <input type="hidden" name="form-name" value="contact" />
              <p hidden>
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>
              <input type="text" name="name" placeholder="Your name" required />
              <input type="email" name="email" placeholder="Your email" required />
              <textarea name="message" rows={4} placeholder="Which retreat interests you, or just say hello..." />
              <button type="submit" data-lang="ru">
                Отправить
              </button>
              <button type="submit" data-lang="en">
                Send Message
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
