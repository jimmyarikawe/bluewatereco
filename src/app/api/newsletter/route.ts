import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = String(body?.email ?? '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  // The WordPress site used Mailchimp; key looks like "xxxx-us21" (the suffix is the data centre)
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_AUDIENCE_ID;
  if (!apiKey || !listId) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[newsletter] Mailchimp not configured, subscriber not saved:', email);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: 'Newsletter sign-up is not available right now.' }, { status: 503 });
  }

  const dc = apiKey.split('-')[1];
  const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`, {
    method: 'POST',
    headers: { Authorization: `Basic ${Buffer.from(`any:${apiKey}`).toString('base64')}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_address: email, status: 'subscribed' }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    if (data.title === 'Member Exists') return NextResponse.json({ ok: true });
    console.error('[newsletter] Mailchimp error', res.status, data);
    return NextResponse.json({ error: 'Could not subscribe you. Please try again later.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
