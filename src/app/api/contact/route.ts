import { NextResponse } from 'next/server';
import { site } from '@/lib/site';

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// Best-effort per-IP limit (per server instance) so the form can't be used to mass-send confirmations
const recent = new Map<string, number[]>();
function rateLimited(ip: string, max = 3, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < windowMs);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > max;
}

function enquiryEmail({ name, email, phone, message }: Record<string, string>) {
  return `
    <h2>New website enquiry</h2>
    <p><b>Name:</b> ${escape(name)}<br><b>Email:</b> <a href="mailto:${escape(email)}">${escape(email)}</a><br><b>Phone:</b> ${escape(phone || '-')}</p>
    <p>${escape(message).replace(/\n/g, '<br>')}</p>
    <p style="color:#6e7a84;font-size:12px">Reply to this email to respond to ${escape(name)} directly.</p>`;
}

// Deliberately doesn't echo the visitor's message, so the form can't relay arbitrary text to arbitrary inboxes
function confirmationEmail(name: string) {
  const phones = site.phones.join(', ');
  return `
    <div style="font-family:Arial,sans-serif;color:#1f1f1f;line-height:1.6;max-width:560px">
      <p>Hi ${escape(name)},</p>
      <p>Thanks for contacting ${site.name}. We’ve received your message and a member of our team will get back to you shortly.</p>
      <p>If your enquiry is urgent, you can call us on ${phones}.</p>
      <p>Kind regards,<br>The ${site.name} team</p>
      <hr style="border:none;border-top:1px solid #eee">
      <p style="color:#6e7a84;font-size:12px">${site.legalName} · ${site.address}<br><a href="${site.url}">${site.url.replace('https://', '')}</a></p>
    </div>`;
}

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
  if (name.length > 100 || message.length > 5000 || phone.length > 50 || email.length > 200) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('cf-connecting-ip') || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many messages. Please try again later or email us directly.' }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[contact] RESEND_API_KEY not set, message not emailed:', { name, email, phone, message });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: 'The contact form is not configured yet. Please email us directly.' }, { status: 503 });
  }

  const from = process.env.CONTACT_FROM ?? `${site.name} <noreply@bluewatereco.com>`;
  const inbox = process.env.CONTACT_TO ?? site.email;

  // One batch call: the enquiry to our inbox, and a confirmation to the sender
  const res = await fetch('https://api.resend.com/emails/batch', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([
      {
        from,
        to: inbox,
        reply_to: email,
        subject: `New website enquiry from ${name}`,
        html: enquiryEmail({ name, email, phone, message }),
      },
      {
        from,
        to: email,
        reply_to: inbox,
        subject: `We’ve received your message – ${site.name}`,
        html: confirmationEmail(name),
      },
    ]),
  });

  if (!res.ok) {
    console.error('[contact] Resend error', res.status, await res.text());
    return NextResponse.json({ error: 'Could not send your message. Please email us directly.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
