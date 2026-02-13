import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
    <Dialog key={product.id}>
      <DialogTrigger asChild>
        <Card className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md cursor-pointer">
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
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-4 py-4 md:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
                <DialogDescription className="text-xl font-semibold text-primary mt-2">
                  ${product.price}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p>
                  Experience the quality and craftsmanship of our {product.name}. 
                  Designed for modern living, this piece combines style with functionality.
                </p>
                <ul className="list-disc pl-4 space-y-1 mt-2">
                  <li>Premium materials</li>
                  <li>Ethically sourced</li>
                  <li>Durable construction</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Button className="flex-1" size="lg">
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                Save for Later
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
