import prisma from './lib/prisma.ts';

async function main() {
  // Find all products whose name starts with "Placeholder Product"
  const placeholders = await prisma.product.findMany({
    where: { name: { startsWith: 'Placeholder Product' } },
    select: { id: true, name: true },
  });

  if (placeholders.length === 0) {
    console.log('No placeholder products found.');
    return;
  }

  console.log(`Found ${placeholders.length} placeholder products. Updating names...`);

  for (const p of placeholders) {
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
