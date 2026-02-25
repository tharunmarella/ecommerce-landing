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
      const newUrl = `https://picsum.photos/seed/${p.id}/800/600`;
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
