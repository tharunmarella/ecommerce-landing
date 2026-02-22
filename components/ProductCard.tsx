import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import SSRImage from '@/components/SSRImage';
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, saveForLater } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Adding to cart:', product);
    addToCart({ ...product, price: Number(product.price) });
  };

  const handleSaveForLater = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    saveForLater({ ...product, price: Number(product.price) });
  };

  return (
    <Link href={`/products/${product.id}`} passHref>
      <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-none bg-card/50 backdrop-blur-sm">
        <CardHeader className="p-0">
          <AspectRatio ratio={1 / 1} className="overflow-hidden rounded-t-lg bg-muted">
            <SSRImage
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-5">
          <CardTitle className="text-lg mb-1 line-clamp-1 font-semibold">{product.name}</CardTitle>
          <p className="text-xl font-bold text-primary mb-4">${product.price}</p>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 shadow-sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="shadow-sm hover:bg-primary hover:text-primary-foreground"
              onClick={handleSaveForLater}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;