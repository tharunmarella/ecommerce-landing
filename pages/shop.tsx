import * as React from 'react';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import prisma from '@/lib/prisma';
import { GetStaticProps } from 'next';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { X } from 'lucide-react';

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
  const router = useRouter();
  const { search } = router.query;
  const searchQuery = typeof search === 'string' ? search : '';

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    
    const term = searchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(term)
    );
  }, [products, searchQuery]);

  const clearSearch = () => {
    const { search: _, ...query } = router.query;
    router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Head>
        <title>{searchQuery ? `Search results for "${searchQuery}"` : 'Shop'} | LuxeStore</title>
        <meta name="description" content="Browse our collection of premium products" />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Shop</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                {searchQuery ? `Search Results` : 'Shop'}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {searchQuery 
                  ? `Showing results for "${searchQuery}"`
                  : "Discover our curated collection of premium products. Each item is carefully selected for quality and style."
                }
              </p>
            </div>
            
            {searchQuery && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearSearch}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear Search
              </Button>
            )}
          </div>
          <Separator className="my-8" />
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              {searchQuery 
                ? `No products found matching "${searchQuery}"`
                : "No products available at the moment."
              }
            </p>
            <Button variant="link" onClick={clearSearch}>
              {searchQuery ? "View all products" : "Please check back later!"}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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