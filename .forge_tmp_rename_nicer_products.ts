import prisma from './lib/prisma.ts';

async function main() {
  // Find all products whose name starts with "Demo Product"
  const demoProducts = await prisma.product.findMany({
    where: { name: { startsWith: 'Demo Product' } },
    select: { id: true, name: true },
  });

  if (demoProducts.length === 0) {
    console.log('No demo products found to rename.');
    return;
  }

  console.log(`Found ${demoProducts.length} demo products. Renaming to nicer names...`);

  for (const p of demoProducts) {
    const newName = `Premium Sample ${p.id}`;
    await prisma.product.update({
      where: { id: p.id },
      data: { name: newName },
    });
    console.log(`Updated product ${p.id}: "${p.name}" -> "${newName}"`);
  }

  console.log('Nice rename complete.');
}

main()
  .catch(e => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
