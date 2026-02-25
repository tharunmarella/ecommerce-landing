import prisma from './lib/prisma.ts';

// A list of realistic product names. Feel free to edit/add more.
const realNames = [
  'Eco-friendly Bamboo Toothbrush',
  'Wireless Noise-Cancelling Headphones',
  'Organic Cold-Pressed Olive Oil',
  'Smart Home LED Light Strip',
  'Stainless Steel Water Bottle',
  'Portable Solar Power Bank',
  'Ergonomic Office Chair',
  'Bluetooth Fitness Tracker',
  'Premium Leather Wallet',
  'Adjustable Standing Desk',
  'Handcrafted Wooden Cutting Board',
  'Ultra‑Soft Microfiber Sheet Set',
  'Compact Air Purifier',
  'Digital Kitchen Scale',
  'Reusable Silicone Food Bags',
  'High‑Performance Gaming Mouse',
  'Eco‑Conscious Reusable Coffee Cup',
  'Smartphone Gimbal Stabilizer',
  'Luxury Scented Candle',
  'Professional DSLR Camera Lens',
];

async function main() {
  // Find all products that still have placeholder‑style names (e.g., start with "Premium Sample")
  const products = await prisma.product.findMany({
    where: { name: { startsWith: 'Premium Sample' } },
    select: { id: true, name: true },
  });

  if (products.length === 0) {
    console.log('No placeholder‑style products found to rename.');
    return;
  }

  console.log(`Renaming ${products.length} products to realistic names...`);

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const baseName = realNames[i % realNames.length];
    // Append the ID to guarantee uniqueness if the list cycles.
    const newName = `${baseName} #${p.id}`;
    await prisma.product.update({
      where: { id: p.id },
      data: { name: newName },
    });
    console.log(`Product ${p.id}: "${p.name}" → "${newName}"`);
  }

  console.log('All products have been given realistic names.');
}

main()
  .catch((e) => {
    console.error('Error during rename:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
