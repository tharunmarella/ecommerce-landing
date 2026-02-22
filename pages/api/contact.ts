import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await prisma.contact.create({
      data: { name, email, subject, message },
    });

    return res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact error:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
