import prisma from './lib/prisma.ts';

async function main() {
  const products = await prisma.product.findMany({
    where: {
      image: ''
    },
    select: { id: true, name: true, image: true },
  });
  console.log('Products with empty image:', products);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
