import { del } from '@vercel/blob';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  if (request.method !== 'DELETE') {
    return new Response(JSON.stringify({ error: `Method ${request.method} Not Allowed` }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const { searchParams } = new URL(request.url);
  const urlToDelete = searchParams.get('url');

  if (!urlToDelete) {
    return new Response(JSON.stringify({ error: 'URL to delete is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    // Extract the blob key from the URL
    // const url = new URL(urlToDelete);
    // const blobKey = url.pathname.substring(1); // Remove leading '/'
    const url = new URL('https://igzdhz9a9etww4ru.public.blob.vercel-storage.com/3.2-JkPWloB1MlBI13FPMfC6gTU9aAItcu.PNG')
    // await del(url, {token: 'vercel_blob_rw_iGZDHZ9A9EtWw4rU_rjOxzjW6DfGIWrIILFhSL7CAIn9RsQ'});
    console.log('Delete Response: ')


    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error deleting blob:', error);
    return new Response(JSON.stringify({ error: 'Error deleting blob' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
