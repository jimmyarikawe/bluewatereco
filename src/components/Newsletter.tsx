'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Arrow, Container, Eyebrow } from './ui';

type Status = { state: 'idle' | 'sending' | 'done' | 'error'; message?: string };

export default function Newsletter() {
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: 'sending' });
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: new FormData(form).get('email') }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      form.reset();
      setStatus({ state: 'done', message: 'Thanks for subscribing!' });
    } else {
      setStatus({ state: 'error', message: data.error ?? 'Something went wrong. Please try again.' });
    }
  }

  return (
    <section className="relative overflow-hidden bg-light py-24">
      <Image src="/images/newsletter-bg.png" alt="" width={1270} height={1186} className="pointer-events-none absolute -right-40 top-0 h-full w-auto opacity-70" />
      <Image src="/images/deco-3.png" alt="" width={79} height={102} className="pointer-events-none absolute left-[10%] top-24 hidden md:block" />
      <Image src="/images/deco-7.png" alt="" width={20} height={20} className="pointer-events-none absolute right-[10%] top-12" />
      <Image src="/images/deco-5.png" alt="" width={15} height={15} className="pointer-events-none absolute bottom-24 left-0" />

      <Container className="relative text-center">
        <Eyebrow pill>Newsletter Subscribe</Eyebrow>
        <h2 className="mx-auto mb-10 max-w-xl text-3xl sm:text-4xl">Subscribe Our Newsletter To Get More Update</h2>
        <form onSubmit={onSubmit} className="mx-auto flex max-w-xl flex-col gap-3 rounded-[2rem] bg-white p-2 shadow-sm sm:flex-row sm:rounded-full">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="Enter Your Email Address"
            className="min-w-0 flex-1 rounded-full px-6 py-3 text-sm text-headline outline-none placeholder:font-bold placeholder:text-body/80"
          />
          <button
            type="submit"
            disabled={status.state === 'sending'}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-60"
          >
            {status.state === 'sending' ? 'Subscribing…' : 'Subscribe Now'}
            <Arrow />
          </button>
        </form>
        {status.message && (
          <p role="status" className={`mt-4 text-sm ${status.state === 'error' ? 'text-red-600' : 'text-primary'}`}>
            {status.message}
          </p>
        )}
      </Container>
    </section>
  );
}
