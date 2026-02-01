---
name: Payment Integration
description: Stripe subscription and checkout implementation
tags: [stripe, payment, subscription, billing]
version: 1.0.0
---

# Payment Integration (Stripe)

## When to use
Use when implementing subscriptions, one-time payments, or customer billing portals.

## Checkout Session

```typescript
'use server';

import Stripe from 'stripe';

export async function createCheckout(priceId: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`
  });
  
  return { url: session.url };
}
```

## Webhook Handler

```typescript
// app/api/stripe/webhook/route.ts
export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  
  const event = stripe.webhooks.constructEvent(
    body, sig, process.env.STRIPE_WEBHOOK_SECRET!
  );
  
  if (event.type === 'checkout.session.completed') {
    // Update user subscription
  }
  
  return Response.json({ received: true });
}
```

## Customer Portal

```typescript
const session = await stripe.billingPortal.sessions.create({
  customer: customerId,
  return_url: `${process.env.NEXT_PUBLIC_URL}/settings`
});
```
