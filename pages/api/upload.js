import { google } from 'googleapis';
import formidable from 'formidable';
import FormData from 'form-data';
import fetch from 'node-fetch'
import fs from 'fs';

function jsonToCommaSeparatedString(jsonObject) {
    const rep =  Object.entries(jsonObject)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ').replace(/\\/g, '');
    return rep;
  }

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getAccessToken() {
    // const { CLIENT_ID, CLIENT_SECERET, REFRESH_TOKEN } = process.env;
    const CLIENT_ID = '280530405500-p5srectvnjlcivq54k45o4cqsabeu6vo.apps.googleusercontent.com';
    const CLIENT_SECERET = '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';
    const REFRESH_TOKEN = '1//04EtbxP2HTDjyCgYIARAAGAQSNwF-L9Ir24OFNrnCXtVQ9lGoSfb68tRpGUiogeEQ4uo3wSGu4LkwIo-mPLFXLMx8rXn6FFhwWGU';
    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECERET
    );

  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });

  const { credentials } = await oauth2Client.refreshAccessToken();
  return credentials.access_token;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const form = formidable();


  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing the files' });
      return;
    }

    const file = files.file;
    console.log('Parsed file object:', file);

    //reformat fields
    let _fields = fields._fields;
    _fields = jsonToCommaSeparatedString(_fields);

    //------------------EDIT THIS ONCE PERMISSION GRANTED
    //------------------EDIT THIS ONCE PERMISSION GRANTED
    //------------------EDIT THIS ONCE PERMISSION GRANTED
    //------------------EDIT THIS ONCE PERMISSION GRANTED
    //------------------EDIT THIS ONCE PERMISSION GRANTED
    let {folderId} = JSON.parse(fields._fields);
    if(folderId==null) {
      folderId = process.env.DEFAULT_FOLDER_ID;
    }
    console.log("---------------------------------->"+folderId)
    //folderId = '1SWHPQTO-1XdrRhiA0Xc2eOnE2wiDQ7i3' //test folder id (remove)

    console.log("Parsed Form Data"+fields);
    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const filepath = file[0].filepath
    const { originalFilename, mimetype } = file[0];
    console.log('++++++++++++++++++++++++++++++++++++');
    console.log(originalFilename);

    if (!filepath || !originalFilename || !mimetype) {
      res.status(400).json({ error: 'Invalid file upload' });
      return;
    }

    try {
      const accessToken = await getAccessToken();
      console.log(accessToken)

    const drive_url = "https://www.googleapis.com/drive/v3/files";
    let drive_request = {
        method: "GET",
        headers: new Headers({
            Authorization: "Bearer "+accessToken
        })
    }
    fetch(drive_url, drive_request).then( response => {
        return(response.json());
    }).then( list =>  {
        console.log("Found a file called "+list.files[0].name);
    })


    //file upload v2
    const metadata = {
        name: originalFilename, // File name at Google Drive
        mimeType: mimetype, // Mime type at Google Drive
        parents: [folderId], // Folder ID at Google Drive
        description: JSON.stringify(_fields)
      };
      const fileStream = fs.createReadStream(filepath);
      const fileform = new FormData();
      fileform.append('metadata', JSON.stringify(metadata), { contentType: 'application/json' });
      fileform.append('file', fileStream);

  
    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken,
      }),
      body: fileform,
    });
    const jsonResponse = await response.json();
    console.log('File uploaded:', jsonResponse);


      res.status(200).json({ success: true, data: response.data });
    } catch (error) {
      console.error('Error uploading to Google Drive:', error);
      res.status(500).json({ error: 'Error uploading file to Google Drive' });
    } finally {
      if (filepath) {
        fs.unlink(filepath, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
    }
  });
}
