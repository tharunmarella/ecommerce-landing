import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/router';

export default function SuccessPage() {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();
  const recorded = useRef(false);

  // Record the order in the database once, then clear the cart.
  useEffect(() => {
    const { session_id } = router.query;
    if (!session_id || recorded.current) return;
    recorded.current = true;

    fetch('/api/record-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: session_id }),
    }).catch((err) => console.error('[success] record-order failed:', err));

    cart.forEach(item => removeFromCart(item.id));
  }, [router.query]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Head>
        <title>Payment Successful | LuxeStore</title>
      </Head>

      <Header />

      <main className="flex-grow container mx-auto py-24 px-4 text-center">
        <div className="max-w-md mx-auto">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your payment was successful and your order is being processed.
          </p>
          <Link href="/" passHref>
            <Button size="lg" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
