import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const amount = Number(body.amount);
  const description = String(body.description || 'Service SERVYRA');
  const requestId = String(body.requestId || '');

  if (!Number.isInteger(amount) || amount < 100) {
    return NextResponse.json({ error: 'Montant invalide. Utilise un montant en centimes, minimum 1 €.' }, { status: 400 });
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Paiement non configuré : ajoute STRIPE_SECRET_KEY dans Netlify.', setup: true }, { status: 503 });
  }

  const commission = Math.round(amount * 0.10);
  const params = new URLSearchParams();
  params.set('mode', 'payment');
  params.set('success_url', `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?payment=success`);
  params.set('cancel_url', `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?payment=cancelled`);
  params.set('line_items[0][price_data][currency]', 'eur');
  params.set('line_items[0][price_data][product_data][name]', description);
  params.set('line_items[0][price_data][unit_amount]', String(amount));
  params.set('line_items[0][quantity]', '1');
  params.set('metadata[request_id]', requestId);
  params.set('metadata[servyra_commission_cents]', String(commission));

  const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
    cache: 'no-store',
  });

  const data = await response.json();
  if (!response.ok) {
    return NextResponse.json({ error: data?.error?.message || 'Erreur Stripe.' }, { status: 502 });
  }

  return NextResponse.json({ checkoutUrl: data.url, sessionId: data.id, commissionCents: commission });
}