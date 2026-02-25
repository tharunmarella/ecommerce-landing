import prisma from './lib/prisma.ts';

async function main() {
  const products = await prisma.product.findMany({
    select: { id: true, image: true },
  });

  for (const p of products) {
    const url = p.image?.trim();
    if (!url) continue;
    let ok = false;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      ok = res.ok;
    } catch (_) {
      ok = false;
    }
    if (!ok) {
      // Use Unsplash source with a deterministic seed based on product id
      const newUrl = `https://source.unsplash.com/800x600?sig=${p.id}`;
      await prisma.product.update({
        where: { id: p.id },
        data: { image: newUrl },
      });
      console.log(`Replaced image for product ${p.id} with ${newUrl}`);
    }
  }
}

main()
  .catch((e) => {
    console.error('Error fixing images:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
