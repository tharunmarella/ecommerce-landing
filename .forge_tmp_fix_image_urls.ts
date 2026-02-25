import prisma from './lib/prisma.ts';

// A small set of reliable Unsplash image URLs to use as replacements
const replacementUrls = [
  'https://images.unsplash.com/photo-1602524202745-5c5c5c5c5c5c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581291519195-ef11498d1cf5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80',
];

async function main() {
  const products = await prisma.product.findMany({
    select: { id: true, image: true },
  });

  let replaceIndex = 0;
  for (const p of products) {
    const url = p.image?.trim();
    if (!url) continue;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) continue; // valid URL, skip
    } catch (_) {
      // fetch failed, treat as invalid
    }
    // Invalid URL – replace with a good Unsplash URL
    const newUrl = replacementUrls[replaceIndex % replacementUrls.length];
    replaceIndex++;
    await prisma.product.update({
      where: { id: p.id },
      data: { image: newUrl },
    });
    console.log(`Updated product ${p.id} with new image URL`);
  }
}

main()
  .catch((e) => {
    console.error('Error updating images:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
