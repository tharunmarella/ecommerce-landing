import prisma from './lib/prisma.ts';

async function main() {
  // Find all products with an empty image field
  const products = await prisma.product.findMany({
    where: { image: '' },
    select: { id: true, name: true },
  });

  if (products.length === 0) {
    console.log('No products with empty image found.');
    return;
  }

  console.log(`Found ${products.length} products with empty image. Renaming them...`);

  for (const p of products) {
    const newName = `Demo Product ${p.id}`;
    await prisma.product.update({
      where: { id: p.id },
      data: { name: newName },
    });
    console.log(`Updated product ${p.id}: "${p.name}" -> "${newName}"`);
  }

  console.log('Rename complete.');
}

main()
  .catch(e => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
