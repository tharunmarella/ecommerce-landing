import * as React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, Heart, ShoppingCart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AspectRatio } from "@/components/ui/aspect-ratio"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CartPage() {
  const { 
    cart, 
    savedItems, 
    removeFromCart, 
    updateQuantity, 
    saveForLater, 
    moveToCart, 
    removeFromSaved,
    cartTotal 
  } = useCart();

  const [loading, setLoading] = React.useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      console.log('Initiating checkout with cart:', cart);
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart }),
      });

      console.log('API response:', response);
      const session = await response.json();
      console.log('Stripe session received:', session);
      
      if (session.url) {
        window.location.assign(session.url);
      } else {
        throw new Error('No checkout URL received from server');
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Head>
        <title>Your Cart | LuxeStore</title>
      </Head>

      <Header />

      <main className="flex-grow container mx-auto py-12 px-4 md:px-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {cart.length === 0 ? (
              <div className="text-center py-12 border rounded-lg bg-muted/30">
                <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground">Your cart is empty</p>
                <Link href="/" passHref>
                  <Button className="mt-4">Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              <ScrollArea className="h-full max-h-[600px] pr-4">
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg bg-card shadow-sm group transition-all hover:border-primary/20">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                        <AspectRatio ratio={1 / 1}>
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                        </AspectRatio>
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between text-base font-medium">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="ml-4 font-bold">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 rounded-full hover:bg-background"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-medium w-6 text-center">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 rounded-full hover:bg-background"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex gap-4">
                            <button
                              type="button"
                              onClick={() => saveForLater(item)}
                              className="font-medium text-primary hover:underline flex items-center gap-1"
                            >
                              <Heart className="h-4 w-4" /> Save
                            </button>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="font-medium text-destructive hover:underline flex items-center gap-1"
                            >
                              <Trash2 className="h-4 w-4" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}

            {/* Saved Items Section */}
            {savedItems.length > 0 && (
              <div className="mt-16">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Saved for Later</h2>
                  <span className="bg-muted px-3 py-1 rounded-full text-sm font-medium">{savedItems.length} items</span>
                </div>
                <Separator className="mb-8" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {savedItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg bg-card shadow-sm hover:border-primary/20 transition-all">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                        <AspectRatio ratio={1 / 1}>
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </AspectRatio>
                      </div>
                      <div className="flex flex-1 flex-col">
                        <h3 className="font-medium line-clamp-1">{item.name}</h3>
                        <p className="text-sm font-bold text-primary mt-1">${item.price}</p>
                        <div className="flex flex-1 items-end justify-between mt-2">
                          <button
                            onClick={() => moveToCart(item)}
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            Move to Cart
                          </button>
                          <button
                            onClick={() => removeFromSaved(item.id)}
                            className="text-sm font-medium text-destructive hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border bg-card p-6 shadow-lg sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-semibold">${cartTotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Shipping</p>
                  <p className="font-semibold text-green-600">Free</p>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <p className="text-xl font-bold text-primary">${cartTotal.toFixed(2)}</p>
                </div>
                <Button 
                  className="w-full mt-6 shadow-md" 
                  size="lg" 
                  disabled={cart.length === 0 || loading}
                  onClick={handleCheckout}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Tax included. Shipping calculated at checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}