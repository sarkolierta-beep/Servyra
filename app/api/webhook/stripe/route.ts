export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature');
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) return new Response('Webhook Stripe non configuré', { status: 503 });
  await req.text();
  return Response.json({ received: true, note: 'Vérification Stripe à finaliser avec le SDK et la base de données.' });
}