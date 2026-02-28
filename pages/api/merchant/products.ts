import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();

  // Authentication check
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    // Verify token and get user from localStorage (client-side sends user info in header)
    // For simplicity, we'll check if the user object is passed in a custom header
    const userHeader = req.headers['x-user'];
    if (!userHeader) {
      return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }

    let user;
    try {
      user = typeof userHeader === 'string' ? JSON.parse(userHeader) : userHeader;
    } catch {
      return res.status(401).json({ error: 'Unauthorized: Invalid user data' });
    }

    if (!user || !user.email) {
      return res.status(401).json({ error: 'Unauthorized: Invalid user' });
    }
    // GET /api/merchant/products — list all products
    if (req.method === 'GET') {
      const products = await prisma.product.findMany({
        orderBy: { sales: 'desc' },
      });
      return res.status(200).json(products);
    }

    // POST /api/merchant/products — create a new product
    if (req.method === 'POST') {
      const { name, price, image, stock, sales } = req.body;
      if (!name || price === undefined) {
        return res.status(400).json({ error: 'name and price are required' });
      }
      const product = await prisma.product.create({
        data: {
          name: String(name),
          price: parseFloat(String(price)),
          image: String(image || ''),
          stock: parseInt(String(stock ?? 0), 10),
          sales: parseInt(String(sales ?? 0), 10),
        },
      });
      return res.status(201).json(product);
    }

    // PUT /api/merchant/products — update an existing product
    if (req.method === 'PUT') {
      const { id, name, price, image, stock, sales } = req.body;
      if (!id) {
        return res.status(400).json({ error: 'id is required' });
      }
      const product = await prisma.product.update({
        where: { id: parseInt(String(id), 10) },
        data: {
          ...(name !== undefined && { name: String(name) }),
          ...(price !== undefined && { price: parseFloat(String(price)) }),
          ...(image !== undefined && { image: String(image) }),
          ...(stock !== undefined && { stock: parseInt(String(stock), 10) }),
          ...(sales !== undefined && { sales: parseInt(String(sales), 10) }),
        },
      });
      return res.status(200).json(product);
    }

    // DELETE /api/merchant/products?id=<id> — delete a product
    if (req.method === 'DELETE') {
      const id = req.query.id;
      if (!id) {
        return res.status(400).json({ error: 'id query param is required' });
      }
      await prisma.product.delete({
        where: { id: parseInt(String(id), 10) },
      });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('[merchant/products]', error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
