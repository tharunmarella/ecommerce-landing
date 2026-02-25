import type { NextApiRequest, NextApiResponse } from 'next';
import * as formidable from 'formidable';
import * as fs from 'fs';
import * as path from 'path';

type Fields = formidable.Fields;
type Files = formidable.Files;

// Disable Next.js default body parser so formidable can handle multipart
export const config = {
  api: {
    bodyParser: false,
  },
};

/** Ensure the uploads directory exists */
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/** Parse the incoming multipart request with formidable */
function parseForm(req: NextApiRequest): Promise<{ fields: Fields; files: Files }> {
  return new Promise((resolve, reject) => {
    const form = formidable.formidable({
      uploadDir: uploadsDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5 MB limit
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { files } = await parseForm(req);

    // formidable v3 returns arrays; grab the first file under the "image" field
    const fileField = files['image'];
    const file = Array.isArray(fileField) ? fileField[0] : fileField;

    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Build a unique filename: timestamp + original extension
    const ext = path.extname(file.originalFilename ?? file.newFilename ?? '.jpg');
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const destPath = path.join(uploadsDir, uniqueName);

    // Rename the temp file to our unique name inside uploads/
    fs.renameSync(file.filepath, destPath);

    // Return the public URL path (served by Next.js static file serving)
    const publicUrl = `/uploads/${uniqueName}`;
    return res.status(200).json({ url: publicUrl });
  } catch (error: any) {
    console.error('[merchant/upload]', error);
    return res.status(500).json({ error: 'Upload failed', detail: error.message });
  }
}
