import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import SSRImage from './SSRImage';

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
      <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="p-0">
          <div className="aspect-square overflow-hidden rounded-t-lg bg-muted relative">
            <SSRImage
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
          <p className="text-2xl font-bold text-primary mb-4">${product.price}</p>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              size="sm"
              variant="outline"
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