'use client';

import { useState } from 'react';

type Status = { state: 'idle' | 'sending' | 'done' | 'error'; message?: string };

const field = 'w-full rounded bg-light px-5 py-4 text-sm text-headline outline-none placeholder:text-body focus:ring-2 focus:ring-primary/30';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: 'sending' });
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      form.reset();
      setStatus({ state: 'done', message: 'Thanks! Your message has been sent. We’ve emailed you a confirmation and will be in touch soon.' });
    } else {
      setStatus({ state: 'error', message: data.error ?? 'Something went wrong. Please try again.' });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="name" required placeholder="Name" aria-label="Name" className={field} />
      <input name="email" type="email" required placeholder="Email" aria-label="Email" className={field} />
      <input name="phone" type="tel" placeholder="Phone" aria-label="Phone" className={field} />
      <textarea name="message" required rows={5} placeholder="Message" aria-label="Message" className={field} />
      {/* Honeypot: hidden from people, bots tend to fill it in */}
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button
        type="submit"
        disabled={status.state === 'sending'}
        className="w-full rounded-full bg-primary py-4 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        {status.state === 'sending' ? 'Sending…' : 'Send'}
      </button>
      {status.message && (
        <p role="status" className={`text-sm ${status.state === 'error' ? 'text-red-600' : 'text-primary'}`}>
          {status.message}
        </p>
      )}
    </form>
  );
}
