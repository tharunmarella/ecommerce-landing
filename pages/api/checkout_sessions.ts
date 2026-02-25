import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover', // Using latest stable version
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      console.log('API /api/checkout_sessions hit.');
      const { items } = req.body;
      console.log('Items received in API:', items);

      // Create Checkout Sessions from body params.
      // Embed cart items in metadata so the success page can record the order.
      const session = await stripe.checkout.sessions.create({
        line_items: items.map((item: any) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: Math.round(Number(item.price) * 100), // Stripe expects cents
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
        metadata: {
          // Stripe metadata values must be strings; store cart as JSON.
          cartItems: JSON.stringify(
            items.map((item: any) => ({
              id: item.id,
              quantity: item.quantity,
              price: Number(item.price),
            }))
          ),
        },
      });
      console.log('Stripe session created:', session);

      res.status(200).json({ id: session.id, url: session.url });
    } catch (err: any) {
      console.error('Stripe API error:', err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}