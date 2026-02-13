const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  try {
    // Read products from JSON file
    const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../lib/products.json'), 'utf8'));
    
    console.log(`Seeding ${productsData.length} products...`);
    
    // Clear existing products
    await prisma.product.deleteMany();
    console.log('Cleared existing products');
    
    // Seed products
    for (const product of productsData) {
      await prisma.product.create({
        data: {
          name: product.name,
          price: product.price,
          image: product.image,
        },
      });
    }
    
    console.log(`Successfully seeded ${productsData.length} products`);
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });