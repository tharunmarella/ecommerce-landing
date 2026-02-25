import prisma from './lib/prisma.ts';

async function main() {
  const products = await prisma.product.findMany({
    select: { id: true, name: true, image: true },
  });

  const invalid: {id: number; name: string; image: string; status: number | string}[] = [];

  for (const p of products) {
    const url = p.image?.trim();
    if (!url) continue; // skip empty
    try {
      const res = await fetch(url, { method: 'GET' });
      if (!res.ok) {
        invalid.push({ id: p.id, name: p.name, image: url, status: res.status });
      }
    } catch (e: any) {
      invalid.push({ id: p.id, name: p.name, image: url, status: e.message });
    }
  }

  console.log('Invalid image URLs:', invalid);
}

main().catch(e => { console.error(e); process.exit(1); });
