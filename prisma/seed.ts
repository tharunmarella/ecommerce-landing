import prisma from "../lib/prisma";
import * as bcrypt from 'bcrypt';

const products = [
  {
    name: "Classic T-Shirt",
    price: "19.99",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    stock: 120,
    sales: 0,
  },
  {
    name: "Premium Hoodie",
    price: "49.99",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    stock: 85,
    sales: 0,
  },
  {
    name: "Stylish Cap",
    price: "14.99",
    image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=800&q=80",
    stock: 200,
    sales: 0,
  },
  {
    name: "Leather Messenger Bag",
    price: "129.99",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    stock: 40,
    sales: 0,
  },
  {
    name: "Minimalist Watch",
    price: "199.99",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    stock: 30,
    sales: 0,
  },
  {
    name: "Denim Jacket",
    price: "89.99",
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=800&q=80",
    stock: 60,
    sales: 0,
  },
  {
    name: "Wireless Headphones",
    price: "249.99",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    stock: 55,
    sales: 0,
  },
  {
    name: "Aviator Sunglasses",
    price: "159.99",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    stock: 70,
    sales: 0,
  },
  {
    name: "Classic Leather Boots",
    price: "179.99",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
    stock: 45,
    sales: 0,
  },
  {
    name: "Wool Knit Sweater",
    price: "75.00",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    stock: 90,
    sales: 0,
  },
  {
    name: "Slim Fit Chinos",
    price: "55.00",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    stock: 110,
    sales: 0,
  },
  {
    name: "Designer Silk Scarf",
    price: "45.00",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80",
    stock: 75,
    sales: 0,
  },
  {
    name: "Canvas Sneakers",
    price: "65.00",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    stock: 130,
    sales: 0,
  },
  {
    name: "Vintage Backpack",
    price: "79.99",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    stock: 50,
    sales: 0,
  },
  {
    name: "Eco-friendly Water Bottle",
    price: "24.99",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    stock: 180,
    sales: 0,
  },
  {
    name: "Smartwatch",
    price: "299.99",
    image: "https://images.unsplash.com/photo-1544178240-471c1279717e?auto=format&fit=crop&w=800&q=80",
    stock: 25,
    sales: 0,
  },
  {
    name: "Bluetooth Speaker",
    price: "59.99",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
    stock: 95,
    sales: 0,
  },
  {
    name: "Gaming Mouse",
    price: "49.99",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
    stock: 140,
    sales: 0,
  },
  {
    name: "Laptop Sleeve",
    price: "34.99",
    image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=800&q=80",
    stock: 65,
    sales: 0,
  },
  {
    name: "Ceramic Coffee Mug",
    price: "12.99",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
    stock: 150,
    sales: 0,
  },
];

async function main() {
  console.log('Start seeding...')

  // Create admin user if it doesn't exist
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      password: hashedPassword,
    },
  });

  // Clear existing products
  await prisma.product.deleteMany();

  // Create products
  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        images: {
          create: [
            { url: product.image },
            { url: "https://via.placeholder.com/800?text=Image+2" },
            { url: "https://via.placeholder.com/800?text=Image+3" },
          ]
        }
      },
    });
    console.log(`Created product: ${createdProduct.name}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });