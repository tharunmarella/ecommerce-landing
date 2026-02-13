import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import productsData from '../lib/products.json'

export default function Home({ products }: { products: Array<{ id: number; name: string; price: string; image: string }> }) {
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

        <section className="py-16 px-4 md:px-8 container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Collection</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked items just for you. Explore our latest arrivals and find your perfect style.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Additional Section: Why Choose Us */}
        <section className="bg-muted py-16 px-4 md:px-8">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Why Choose LuxeStore?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-background rounded-lg shadow-sm">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p className="text-muted-foreground">On all orders over $50. Fast and reliable delivery to your doorstep.</p>
              </div>
              <div className="p-6 bg-background rounded-lg shadow-sm">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
                <p className="text-muted-foreground">Your transactions are safe with our encrypted payment processing.</p>
              </div>
              <div className="p-6 bg-background rounded-lg shadow-sm">
                <div className="text-4xl mb-4">↩️</div>
                <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                <p className="text-muted-foreground">Not satisfied? Return within 30 days for a full refund. No questions asked.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const products = productsData;
  return { props: { products } }
}
