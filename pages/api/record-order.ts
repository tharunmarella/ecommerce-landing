import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20' as any,
});

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId } = req.body as { sessionId?: string };

  if (!sessionId) {
    return res.status(400).json({ error: 'Missing sessionId' });
  }

  try {
    // Retrieve the Stripe session to verify payment and get metadata.
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.status(402).json({ error: 'Payment not completed' });
    }

    // Idempotency: if we already recorded this order, return it.
    const existing = await prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
    });
    if (existing) {
      return res.status(200).json({ orderId: existing.id, alreadyRecorded: true });
    }

    // Parse cart items from Stripe session metadata.
    const rawItems = session.metadata?.cartItems;
    if (!rawItems) {
      return res.status(400).json({ error: 'No cart items found in session metadata' });
    }

    const cartItems: Array<{ id: number; quantity: number; price: number }> =
      JSON.parse(rawItems);

    // Calculate total from the verified Stripe amount (in cents → dollars).
    const total = (session.amount_total ?? 0) / 100;

    // Create the order and its items in a single transaction.
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          stripeSessionId: sessionId,
          total,
          items: {
            create: cartItems.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });

      // Increment the sales counter on each product.
      for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.id },
          data: { sales: { increment: item.quantity } },
        });
      }

      return newOrder;
    });

    return res.status(201).json({ orderId: order.id });
  } catch (err: any) {
    console.error('[record-order]', err);
    return res.status(500).json({ error: err.message ?? 'Internal server error' });
  }
}
