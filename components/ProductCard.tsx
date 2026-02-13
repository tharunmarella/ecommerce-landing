import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Eye } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <Card className="relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md cursor-pointer">
        <div className="aspect-[3/4] w-full overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay Actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full">
              <Eye className="h-5 w-5" />
              <span className="sr-only">View Details</span>
            </Button>
            <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Add to Cart</span>
            </Button>
          </div>
        </div>
        <CardHeader className="p-4">
          <CardTitle className="line-clamp-1 text-lg font-medium">{product.name}</CardTitle>
          <p className="text-sm text-muted-foreground">${product.price}</p>
        </CardHeader>
      </Card>
    </Link>
  );
}
