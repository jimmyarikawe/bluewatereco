import { NextResponse } from 'next/server';
import { site } from '@/lib/site';

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? '').trim();
  const email = String(body?.email ?? '').trim();
  const phone = String(body?.phone ?? '').trim();
  const message = String(body?.message ?? '').trim();

  // Honeypot filled in: pretend it worked
  if (body?.company) return NextResponse.json({ ok: true });

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please fill in your name, a valid email and a message.' }, { status: 400 });
  }
  if (name.length > 200 || message.length > 5000 || phone.length > 50) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[contact] RESEND_API_KEY not set, message not emailed:', { name, email, phone, message });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: 'The contact form is not configured yet. Please email us directly.' }, { status: 503 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? `Bluewater Eco Website <noreply@bluewatereco.com>`,
      to: process.env.CONTACT_TO ?? site.email,
      reply_to: email,
      subject: `New website enquiry from ${name}`,
      html: `<p><b>Name:</b> ${escape(name)}<br><b>Email:</b> ${escape(email)}<br><b>Phone:</b> ${escape(phone || '-')}</p><p>${escape(message).replace(/\n/g, '<br>')}</p>`,
    }),
  });

  if (!res.ok) {
    console.error('[contact] Resend error', res.status, await res.text());
    return NextResponse.json({ error: 'Could not send your message. Please email us directly.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
