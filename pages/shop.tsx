import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import prisma from '@/lib/prisma';
import { GetStaticProps } from 'next';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ShopPageProps {
  products: Product[];
}

export default function ShopPage({ products }: ShopPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Head>
        <title>Shop | LuxeStore</title>
        <meta name="description" content="Browse our collection of premium products" />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Shop</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of premium products. Each item is carefully selected for quality and style.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">No products available at the moment.</p>
            <p className="text-muted-foreground">Please check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      props: {
        products: JSON.parse(JSON.stringify(products))
      },
      revalidate: 60
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: []
      },
      revalidate: 60
    };
  }
};