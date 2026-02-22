import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import prisma from '../../lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductsPageProps {
  products: Product[];
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products }) => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center">Our Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-lg text-muted-foreground">
              Discover a wide range of high-quality products tailored to your needs.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await prisma.product.findMany();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
    revalidate: 60, // Re-generate page every 60 seconds
  };
};

export default ProductsPage;
