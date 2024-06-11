import { google } from 'googleapis';
import fetch from 'node-fetch';
import FormData from 'form-data';
import formidable from 'formidable';
import { del } from '@vercel/blob';

// import fs from 'fs';


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    return;
  }

//   console.log(JSON.parse(req.body))

//   const form = formidable({ multiples: false });


//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//         // res.status(500).json({ error: 'Error parsing form data' });
//         console.error('---------------------->'+err)

//         return;
//       }

//       const { fileUrl, fileName, mimeType, folderId, metadata, accessToken } = fields;
//       console.log('---------------------->'+fields)
//     })

  const { fileUrl, fileName, mimeType, folderId, metadata, accessToken, blob } = JSON.parse(req.body);
  console.log('---------------------->'+accessToken)
  console.log('---------------------->'+fileName)
  

  try {

    // Fetch the file from the Vercel Blob URL
    const response = await fetch(fileUrl);
    const fileBuffer = await response.buffer();

    // Upload the file to Google Drive
    let {newFolderId} = folderId;
    if(newFolderId==null) {
      newFolderId = '1pPbrwo1T-8o7rdJQaOH1SYYbtG598ut6'
    }
    console.log('----------------->description')
    console.log(metadata.description)
    const fileMetadata = {
    //   name: fileName,
      name: fileName,
      mimeType: mimeType,
      parents: [newFolderId],
      description: metadata.description,
    };

    // const media = {
    //   mimeType: mimeType,
    //   body: Buffer.from(fileBuffer),
    // };

    // const driveResponse = await drive.files.create({
    //   resource: fileMetadata,
    //   media: media,
    //   fields: 'id',
    // });
    // const fileStream = fs.createReadStream('C:/Users/defpr/Programs/wizz-archive/test.txt');

    const fileform = new FormData();
    fileform.append('metadata', JSON.stringify(fileMetadata), { contentType: 'application/json' });
    fileform.append('file', Buffer.from(fileBuffer));
    // fileform.append('file', fileStream);

    const driveResponse = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: new Headers({
          'Authorization': 'Bearer ' + accessToken,
        }),
        body: fileform,
    });


      // delete file from vercelblob store
    //   console.log(json.par)
    //   const url = new URL(fileUrl);
    //   const blobKey = url.pathname.substring(1); // Remove leading '/'
    //   console.log('<------------------->'+blobKey)
    //   await del(blobKey);
    res.status(200).json({ success: true, data: driveResponse.data });
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    res.status(500).json({ error: 'Error uploading to Google Drive' });
  }
}
