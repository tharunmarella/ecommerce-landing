import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    const existing = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(200).json({ message: 'Already subscribed!' });
    }

    await prisma.newsletter.create({
      data: { email },
    });

    return res.status(201).json({ message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Newsletter error:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
