import prisma from './lib/prisma.ts';

async function main(){
  const allProducts = await prisma.product.findMany({
    select: { id: true, name: true, image: true }
  });
  const emptyImages = allProducts.filter(p => !p.image);
  console.log('Products with empty image:', emptyImages);
}

main().catch(e=>{console.error(e); process.exit(1);});
