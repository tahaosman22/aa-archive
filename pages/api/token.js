// pages/api/url.js

import { google } from 'googleapis';

export default async function handler(req, res) {
  console.log('Request method:', req.method); // Add this line

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` }); // Return JSON error
    return;
  }

  const CLIENT_ID = '280530405500-p5srectvnjlcivq54k45o4cqsabeu6vo.apps.googleusercontent.com';
  const CLIENT_SECRET = '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';
  const REFRESH_TOKEN = '1//04EtbxP2HTDjyCgYIARAAGAQSNwF-L9Ir24OFNrnCXtVQ9lGoSfb68tRpGUiogeEQ4uo3wSGu4LkwIo-mPLFXLMx8rXn6FFhwWGU';
  // const CLIENT_ID='1086536976756-83c0oslbt1t6kfun9ouk5c0fdbqcjdfp.apps.googleusercontent.com'
  // const CLIENT_SECRET='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'
  // const REFRESH_TOKEN='1//04ilSOs5_s3jkCgYIARAAGAQSNwF-L9IrtudRplfrGHt4ikoIpWNQ717_Qs3V2e3Ow8KPzznTAi98tQyWZMFLgLGgehEdvzq653g'
  // // const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

  const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);

  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });

  try {
    const { token } = await oauth2Client.getAccessToken();
    console.log('Access token:', token); // Add this line
    res.status(200).json({ accessToken: token });
  } catch (error) {
    console.error('Error getting access token:', error);
    res.status(500).json({ error: 'Error getting access token' });
  }
}
