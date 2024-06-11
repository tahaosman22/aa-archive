import { put } from '@vercel/blob';
 
export default async function handler(request, response) {
  const blob = await put(request.query.filename, request, {
    access: 'public',
  });
 
  return response.status(200).json(blob);
}
 
export const config = {
  api: {
    bodyParser: false,
  },
};



// import { createClient } from '@vercel/blob'
// import {put} from '@vercel/blob'
// import { NextResponse } from 'next/server';
// import formidable from 'formidable';





// export async function handler(req, res) {
//     // validate request method
//     if (req.method !== 'POST') {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//         return;
//       }
//       const form = formidable();

//       // get form data
//       form.parse(req, async (err, fields, files) => {
//         if (err) {
//           res.status(500).json({ error: 'Error parsing the files' });
//           return;
//         }



//         // upload file
//         const blob = await put(filename, request.body, {
//           access: 'public',
//         });
//       })


// }