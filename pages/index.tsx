import * as React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';
import prisma from '@/lib/prisma';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

export default function Home({ products }: { products: Array<{ id: number; name: string; price: number; image: string }> }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Head>
        <title>LuxeStore | Premium Fashion & Accessories</title>
        <meta name="description" content="Discover the latest trends in fashion and accessories at LuxeStore." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        <Hero />

        <section className="py-20 px-4 md:px-8 container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Featured Collection</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Handpicked items just for you. Explore our latest arrivals and find your perfect style.
            </p>
            <Separator className="w-24 mx-auto mt-8 bg-primary h-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={{...product, price: Number(product.price)}} />
            ))}
          </div>
        </section>

        {/* Additional Section: Why Choose Us */}
        <section className="bg-muted/50 py-24 px-4 md:px-8 border-y">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose LuxeStore?</h2>
              <p className="text-muted-foreground">We pride ourselves on providing the best experience for our customers.</p>
            </div>
            
            <Accordion type="single" collapsible className="w-full bg-background rounded-xl p-6 shadow-sm border">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">🚚 Free & Fast Shipping</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Enjoy complimentary shipping on all orders over $50. We partner with top-tier carriers to ensure your premium purchases arrive safely and swiftly at your doorstep within 3-5 business days.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">🛡️ Secure & Encrypted Payments</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Your security is our top priority. We use industry-standard SSL encryption and partner with trusted payment processors like Stripe to ensure your financial information is always protected.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">↩️ Hassle-Free 30-Day Returns</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Not completely satisfied with your purchase? No problem. We offer a straightforward 30-day return policy. Simply contact our support team, and we'll help you with a full refund or exchange.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold">✨ Premium Quality Guaranteed</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Every item in our collection undergoes a rigorous quality check. We source only the finest materials and work with artisans who share our commitment to excellence and style.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const products = await prisma.product.findMany();
  return { 
    props: { 
      products: JSON.parse(JSON.stringify(products)) 
    },
    revalidate: 60
  };
}