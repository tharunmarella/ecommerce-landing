import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import productsData from '@/lib/productsData'

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface Props {
  product: Product;
}

export default function ProductPage({ product }: Props) {
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Head>
        <title>{product.name} | LuxeStore</title>
        <meta name="description" content={`Buy ${product.name} at LuxeStore.`} />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-muted relative">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
              <p className="text-2xl font-semibold text-primary mt-4">
                ${product.price}
              </p>
              
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Experience the quality and craftsmanship of our {product.name}. 
                  Designed for modern living, this piece combines style with functionality.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Premium materials</li>
                  <li>Ethically sourced</li>
                  <li>Durable construction</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button className="flex-1" size="lg">
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                Save for Later
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await prisma.product.findMany();
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id as string) }
  });

  return {
    props: {
      product,
    },
  };
};