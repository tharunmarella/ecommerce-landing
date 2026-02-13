import Head from 'next/head'
import Header from '../components/Header'
import productsData from '../lib/products.json'
import ProductCard from '../components/ProductCard'

export default function Home({ products }: { products: Array<{ id: number; name: string; price: string; image: string }> }) {
  return (
    <div>
      <Head>
        <title>E-commerce Landing</title>
        <meta name="description" content="E-commerce landing page" />
      </Head>
      <Header />
      <main className="p-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our Store</h1>

        <div className="flex gap-4 flex-wrap justify-center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const products = productsData;
  return { props: { products } }
}
