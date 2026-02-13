import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

const products = [
  {
    name: "Stylish T-Shirt",
    price: "19.99",
    image: "https://picsum.photos/seed/product1/180/180"
  },
  {
    name: "Comfortable Jeans",
    price: "29.99",
    image: "https://picsum.photos/seed/product2/180/180"
  },
  {
    name: "Classic Sneakers",
    price: "39.99",
    image: "https://picsum.photos/seed/product3/180/180"
  },
  {
    name: "Leather Jacket",
    price: "89.99",
    image: "https://picsum.photos/seed/product4/180/180"
  }
]

async function main() {
  console.log('Start seeding...')
  
  // Clear existing products
  await prisma.product.deleteMany()
  
  // Create products
  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: product,
    })
    console.log(`Created product: ${createdProduct.name}`)
  }
  
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })