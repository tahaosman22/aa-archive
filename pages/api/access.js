import { createClient } from '@vercel/blob'


export async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
      }
    
      const {blob} = req.body;

      try {

        const blobClient = createClient({
            token: process.env.VERCEL_BLOB_TOKEN,
        });

        const signedUrl = await blobClient.getSignedUrl({
            blobName: blob.name,
            access: 'public',
            expiresIn: '1h',
        });
        res.status(200).json({signedUrl});
      } catch (error) {
        console.error('Error generating signed URL: ', error);
        res.status(500).json({error: 'Error generating signed URL'});
      }
}