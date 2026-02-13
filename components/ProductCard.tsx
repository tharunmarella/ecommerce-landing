import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
        <Card className="w-[300px] cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>${product.price}</CardDescription>
          </CardHeader>
          <CardContent>
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
            <p>Some description about {product.name}.</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">View Details</Button>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>${product.price}</DialogDescription>
        </DialogHeader>
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover my-4" />
        <p>This is a more detailed description for {product.name}. It highlights its features, benefits, and other important information that a customer might want to know before making a purchase.</p>
        <Button className="w-full mt-4">Add to Cart</Button>
      </DialogContent>
    </Dialog>
  );
}