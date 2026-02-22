export default async function handler(req, res) {
  const { PrismaClient } = require('@prisma/client')
  const prisma = new PrismaClient()

  try {
    const products = await prisma.product.findMany({
      select: { id: true, name: true, image: true }
    })
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' })
  } finally {
    await prisma.$disconnect()
  }
}
