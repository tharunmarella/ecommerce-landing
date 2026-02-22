import { Button } from './ui/button';
import Link from 'next/link';
import SSRImage from './SSRImage';

export default function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
      {/* Background Image (Placeholder) */}
      <div className="absolute inset-0 z-0">
        <SSRImage
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Discover Your Next Favorite Look
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Discover the latest trends in fashion and accessories. Quality pieces designed to make you stand out.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" passHref>
            <Button size="lg" className="text-lg px-8 py-6 bg-white text-black hover:bg-gray-200">
              Shop Now
            </Button>
          </Link>
          <Link href="/shop" passHref>
            <Button size="lg" className="text-lg px-8 py-6 bg-white text-black hover:bg-gray-200">
              View Collections
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
