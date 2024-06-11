// pages/index.js
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

// import fs from 'fs';

import { Heading, Button, Html } from "@react-email/components";
import Image from 'next/image';
import UploadFile from './UploadFile';
import CustomAlert from './CustomAlert';
// import { application } from 'express';
import {upload} from '@vercel/blob/client';

export default function Home() {
  
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [link, setLink] = useState('1pPbrwo1T-8o7rdJQaOH1SYYbtG598ut6')
  const [message, setMessage] = useState('')
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [blob, setBlob] = useState(null);
  


  const [formData, setFormData] = useState({
    uploadDate: null,
    email: '',
    classification: 'سيرة',
    media: 'نص',
    comment: '',
    folderId: ''
  });



  useEffect(() => {
    const { url, folderId } = generate(formData.classification, formData.media);
    setLink(url);
    setFormData((prevState) => ({
      ...prevState,
      folderId: folderId
    }));
  }, [formData.classification, formData.media]);

  useEffect(() => {
    if (alertMessage || loading) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [alertMessage, loading]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const sizeLimit = 1000 * 1000 * 1024; // 10KB in bytes
  
    if (selectedFile.size > sizeLimit) {
      setAlertMessage('File size exceeds the 100MB limit.');
      setAlertType('error');
      setFile(null); // Reset the file input
    } else {
      setFile(selectedFile);
      setAlertMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (Object.values(formData).some(x => x === '')) {
      setAlertMessage('Please fill in all fields');
      setAlertType('error');
      return
    }

    setLoading('true')

    // Fetch call to send formData
    var currentdate = new Date(); 
    var datetime =  currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    //setFormData.uploadDate(datetime)
    let apiOK = true;
    const newFormData = formData;
    newFormData.uploadDate = datetime;
    console.log("Sending Data:", formData);
    const apiUrl = 'https://api.emailjs.com/api/v1.0/email/send'; // Replace with the actual API endpoint
    // const credentials = {service_id: process.env.NEXT_PUBLIC_serviceId,template_id:
    // process.env.NEXT_PUBLIC_templateID, user_id: process.env.NEXT_PUBLIC_userId, template_params: formData}
    const credentials = {service_id: 'service_93s6k34',template_id:
      'template_09d92fm', user_id: 'NqeQ0wa502xNx91Zq', template_params: formData}
    console.log("credentials"+JSON.stringify(credentials))
    /* commenting out Email send to try to fix deployment on external domain*/
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}` + response);
        }
        return response.text();

    })
    .then(text => {
      try {
            const data = JSON.parse(text);
            // setLoading(false)
            // setAlertMessage('Form submitted successfully!');
            // setAlertType('success');
            document.getElementById('response').textContent = data.response;
            // router.push(`/success?email=${encodeURIComponent(formData.email)}`);
        } catch (err) {
            // setLoading(false)
            // setAlertMessage('Form submitted successfully!');
            // setAlertType('success');
        }
    })
    .catch(error => {
        console.error('There was a problem with the POST request:', error);
        setLoading(false);
        setAlertMessage('There was a problem uploading the file: ' + error)
        setAlertType('error')
        apiOK = false;
    });
    /* end comment email out */

    setFormData({
      uploadDate: null,
      email: '',
      classification: 'سيرة',
      media: 'نص',
      comment: '',
      folderId: ''
    })
    window.open(link
    
    )
  }


  const handleSubmitOld = (e) => {
    const uploadOk = handleUploadInternaly();
    // const uploadOk = true;
    if (!uploadOk) {
      console.error('There was a problem with the file upload', error);
      return
    } else {
      console.log('file uploaded sucessfully!')
      // alert('file uploaded')
    }

    e.preventDefault(); // Prevent default form submission behavior

    if (Object.values(formData).some(x => x === '')) {
      setAlertMessage('Please fill in all fields');
      setAlertType('error');
      return
    }

    setLoading('true')

    // Fetch call to send formData
    var currentdate = new Date(); 
    var datetime =  currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    //setFormData.uploadDate(datetime)
    let apiOK = true;
    const newFormData = formData;
    newFormData.uploadDate = datetime;
    console.log("Sending Data:", formData);
    const apiUrl = 'https://api.emailjs.com/api/v1.0/email/send'; // Replace with the actual API endpoint
    // const credentials = {service_id: process.env.NEXT_PUBLIC_serviceId,template_id:
    // process.env.NEXT_PUBLIC_templateID, user_id: process.env.NEXT_PUBLIC_userId, template_params: formData}
    const credentials = {service_id: 'service_93s6k34',template_id:
      'template_09d92fm', user_id: 'NqeQ0wa502xNx91Zq', template_params: formData}
    console.log("credentials"+JSON.stringify(credentials))
    /* commenting out Email send to try to fix deployment on external domain*/
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}` + response);
        }
        return response.text();

    })
    .then(text => {
      try {
            const data = JSON.parse(text);
            // setLoading(false)
            // setAlertMessage('Form submitted successfully!');
            // setAlertType('success');
            document.getElementById('response').textContent = data.response;
            // router.push(`/success?email=${encodeURIComponent(formData.email)}`);
        } catch (err) {
            // setLoading(false)
            // setAlertMessage('Form submitted successfully!');
            // setAlertType('success');
        }
    })
    .catch(error => {
        console.error('There was a problem with the POST request:', error);
        setLoading(false);
        setAlertMessage('There was a problem uploading the file: ' + error)
        setAlertType('error')
        apiOK = false;
    });
    /* end comment email out */
    const sendBtn = document.getElementById("sendBtn");

    if (apiOK) {
      setFormData ( {
        uploadDate: null,
        email: formData.email,
        classification: 'سيرة',
        media: 'نص',
        comment: ''
      });
      
      setFile(null)
      fileInputRef.current.value = null;

      // window.open(link)
      // alert('email sent')
    }


    // sendBtn.setAttribute('disabled', 'true');
    

};

const handleUploadInternaly = async () => {
  if (!file) {
    alert('Please select a file first.');
    return uploadOk;
  }
  setUploading(true);

  try {
    setAlertMessage('Requesting Access...')

      // Step 1: Get access token from API
      const tokenResponse = await fetch('/api/token', {
        method: 'GET',
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to get access token');
      }

      const data = await tokenResponse.json();
      const accessToken = data.accessToken;
      alert(accessToken);    
      console.log(accessToken);

      setAlertMessage('Creating Buffer');

      const response = await fetch(
        `/api/blob?filename=${file.name}`,
        {
          method: 'POST',
          body: file,
        },
      );

      const newBlob = (await response.json());
      console.log(newBlob);
      const url = newBlob.url;
      // const vercelResponse = await fetch(url);
      // const fileBuffer = await vercelResponse.buffer();

      setAlertMessage('Uploading to Drive');

      // google upload
      const metadata = {
        // name: originalFilename, // File name at Google Drive
        // mimeType: mimetype, // Mime type at Google Drive
        // parents: [folderId], // Folder ID at Google Drive
        // description: JSON.stringify(_fields)

        name: file.originalFilename, // File name at Google Drive
        mimeType: file.mimetype, // Mime type at Google Drive
        parents: [formData.folderId], // Folder ID at Google Drive
        description: JSON.stringify({    email: formData.email,
        classification: formData.classification,
        media: formData.media,
        description: formData.comment})
      };
  
      alert(JSON.stringify({
        fileUrl: url,
        fileName: file.name,
        mimeType: file.type,
        folderId: formData.folderId, // Replace with actual folder ID
        metadata: metadata,
        accessToken: accessToken
    }))
      const googleResponse = await fetch('api/google', {
        method: 'POST',
        headers: new Headers({
          'Authorization': 'Bearer ' + accessToken,
        }),
        body: JSON.stringify({
          fileUrl: url,
          fileName: file.name,
          mimeType: file.type,
          folderId: formData.folderId, // Replace with actual folder ID
          metadata: metadata,
          accessToken: accessToken,
      })
  })
      const jsonResponse = await googleResponse.json();
      if (!googleResponse.ok) {
        setAlertType('error')
        setAlertMessage('Failed to Upload to Drive');
        throw new Error('Failed to upload to drive');
      }
      console.log('File uploaded:', jsonResponse);
      console.log('to folder:'+formData.folderId)
      console.log(file.name)
      // Step 4: Delete file from Vercel Blob
      const deleteResponse = await fetch(`/api/delete?url=${url}`, {
        method: 'DELETE',
      });
      setLoading(false)
      setAlertType('success')
      setAlertMessage('File Uploaded Successfully');

      if (!deleteResponse.ok) {
        throw new Error('Failed to delete blob from Vercel Blob storage');
      }

  } catch (error) {
    console.error('Error uploading file:', error);

  }
};

const handleUpload = async () => {
  let uploadOk = false;

  if (!file) {
    alert('Please select a file first.');
    return uploadOk;
  }

  try{
  //   const newBlob = await upload(file.name, file, {
  //     access: 'public',
  //     handleUploadUrl: '/api/url'
  //   });
  //   setBlob(newBlob)

    // const response = await fetch('api/url', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({blob: newBlob})
    // })
    // const {signedUrl} = await response.json();

  console.log('------------------------------>'+signedUrl)
  const uploadFormData = new FormData();
  uploadFormData.append('file', file);
  uploadFormData.append('_fields', JSON.stringify(formData));
  // uploadFormData.append('signedUrl', signedUrl)

    setUploading(true);
    const response2 = await fetch('/api/upload', {
      method: 'POST',
      body: uploadFormData,
    });

    const result = await response2.json();
    if (result.success) {
      setMessage('File uploaded successfully!' + result);
      uploadOk = true;
    } else {
      setMessage('Error uploading file: ' + result.error);
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    setMessage('Error uploading file.');
  } finally {
    setUploading(false);
    return uploadOk;
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

function generate(string_1, string_2) {
  let url = '';
  let folderId = '';

  if (string_1 == 'سيرة' && string_2 == 'نص') {
    url = 'https://drive.google.com/drive/folders/1pPbrwo1T-8o7rdJQaOH1SYYbtG598ut6?usp=drive_link';
    folderId = '1pPbrwo1T-8o7rdJQaOH1SYYbtG598ut6';
  } else if (string_1 == 'سيرة' && string_2 == 'صورة') {
    url = 'https://drive.google.com/drive/folders/1lWgWMgVyPPAy-BDq6ndtmANgZ2tIvJdz?usp=drive_link';
    folderId = '1lWgWMgVyPPAy-BDq6ndtmANgZ2tIvJdz';
  } else if (string_1 == 'سيرة' && string_2 == 'صوت') {
    url = 'https://drive.google.com/drive/folders/1f-AS8-TFzzUH9oyxFmu4MdXiqO8JILsQ?usp=drive_link';
    folderId = '1f-AS8-TFzzUH9oyxFmu4MdXiqO8JILsQ';
  } else if (string_1 == 'سيرة' && string_2 == 'فيديو') {
    url = 'https://drive.google.com/drive/folders/15-4U9wMPNugW1u9LzBA6mk_OkG2W7WSX?usp=drive_link';
    folderId = '15-4U9wMPNugW1u9LzBA6mk_OkG2W7WSX';
  } else if (string_1 == 'سياسة' && string_2 == 'نص') {
    url = 'https://drive.google.com/drive/folders/1DU-icTFHD93_UlLt3oYaWRGVh5Z-3Ci7?usp=drive_link';
    folderId = '1DU-icTFHD93_UlLt3oYaWRGVh5Z-3Ci7';
  } else if (string_1 == 'سياسة' && string_2 == 'صورة') {
    url = 'https://drive.google.com/drive/folders/1-kGaFBsTudL6F_JBPDVhln2lAZst687B?usp=drive_link';
    folderId = '1-kGaFBsTudL6F_JBPDVhln2lAZst687B';
  } else if (string_1 == 'سياسة' && string_2 == 'صوت') {
    url = 'https://drive.google.com/drive/folders/1Ee2tumZJTM3CYppGAHzvhE4M08n2nscr?usp=drive_link';
    folderId = '1Ee2tumZJTM3CYppGAHzvhE4M08n2nscr';
  } else if (string_1 == 'سياسة' && string_2 == 'فيديو') {
    url = 'https://drive.google.com/drive/folders/1UPFu2aJtMZf3goe275ziKxzCzdgfSN7M?usp=drive_link';
    folderId = '1UPFu2aJtMZf3goe275ziKxzCzdgfSN7M';
  } else if (string_1 == 'مهني' && string_2 == 'نص') {
    url = 'https://drive.google.com/drive/folders/1bO-SiyULCyUMpz7SKxYzTltcAeYlXodQ?usp=drive_link';
    folderId = '1bO-SiyULCyUMpz7SKxYzTltcAeYlXodQ';
  } else if (string_1 == 'مهني' && string_2 == 'صورة') {
    url = 'https://drive.google.com/drive/folders/1c4zbsz6n7veiRJcrrIucNBg1ffXYFZlC?usp=drive_link';
    folderId = '1c4zbsz6n7veiRJcrrIucNBg1ffXYFZlC';
  } else if (string_1 == 'مهني' && string_2 == 'صوت') {
    url = 'https://drive.google.com/drive/folders/1HJ8wDDJtEEIrmiD-_D-XkfAxSgoqFjkn?usp=drive_link';
    folderId = '1HJ8wDDJtEEIrmiD-_D-XkfAxSgoqFjkn';
  } else if (string_1 == 'مهني' && string_2 == 'فيديو') {
    url = 'https://drive.google.com/drive/folders/1T8OmH25DMZB2pgMuKv-j-wkfQMVNMg-x?usp=drive_link';
    folderId = '1T8OmH25DMZB2pgMuKv-j-wkfQMVNMg-x';
  } else if (string_1 == 'عام' && string_2 == 'نص') {
    url = 'https://drive.google.com/drive/folders/1-idQwfPgNjmNfQoRiPoAbdhNX5A1cExz?usp=drive_link';
    folderId = '1-idQwfPgNjmNfQoRiPoAbdhNX5A1cExz';
  } else if (string_1 == 'عام' && string_2 == 'صورة') {
    url = 'https://drive.google.com/drive/folders/1q8ACZExlpGy4pF9RJT2aWx3CQQTjbdbu?usp=drive_link';
    folderId = '1q8ACZExlpGy4pF9RJT2aWx3CQQTjbdbu';
  } else if (string_1 == 'عام' && string_2 == 'صوت') {
    url = 'https://drive.google.com/drive/folders/1aIY1KRPTdQvBYgbHzSyqERby9Linm0aK?usp=drive_link';
    folderId = '1aIY1KRPTdQvBYgbHzSyqERby9Linm0aK';
  } else if (string_1 == 'عام' && string_2 == 'فيديو') {
    url = 'https://drive.google.com/drive/folders/1VBcPYsTWcVKRR0j66L4lFBRVRtFWDler?usp=drive_link';
    folderId = '1VBcPYsTWcVKRR0j66L4lFBRVRtFWDler';
  }

  return { url, folderId };
}

  return (

    <main className=" items-center   justify-end px-10 py-[10px] ">
      {/* <UploadFile/> */}
      {/* <CustomAlert message={alertMessage} type={alertType} onClose={() => setAlertMessage('')} loading={loading} /> */}
      
      <form 
        className="bg-white my-[10px] flex rounded-lg md:w-2/5 w-full font-latoRegular max-h-[97%]"
        onSubmit={handleSubmit}
        
      >
        
        {/* <div className='text-[50px]'>helo</div> */}

        <div className="flex-1 p-10 text-right text-gray-700">

          <div className='flex justify-end firstSection'>
              {/* Image */}
              <div className='bg-[#14B8A6] rounded py-1 p-[3px] w-1/4 h-fit mt-[0px]'>
                <img src='/images/MSA.png' className='bg-white bg-gradient-to-r from-[#14B8A6] to-white-100'></img>
              </div>
              <div className="justify-end w-full pb-4 ">
                <br></br>
                <h1 className="pb-2 text-3xl text-center font-latoBold">ذكرى ابو العافية</h1>
                <p className="text-lg text-center text-gray-500">
                  *يرجى تعبئة كل البيانات لتحميل المحتوى*
                </p>
                {/* <p className="text-sm text-center text-gray-500">NOTE: ON SUBMISSION ONLY UPLOAD ONE FILE TO THE DRIVE PER FORM SUBMISSION</p> */}
              </div>
          </div>
          {/* <img src='/images/MSA.jpg' className=' m-auto h-[50px]'></img> */}

          <div className="mt-4 ">
            <div className='flex justify-end firstSection'>
              <div className='small-boxes px-[10px] w-full  justify-end'>
                {/* Email input field */}
                <div className="pb-4">
                  <label htmlFor="email">Your email (البريد)</label>
                  <br></br>
                  <input                  
                    className="w-full p-2 text-right border-2 border-gray-500 rounded-md focus:border-teal-500 focus:ring-teal-500"
                    type="email"
                    id="email"
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* File upload field */}
    {/*
                <p></p>
                <div className="justify-end w-full pb-4 ">
                <label htmlFor="fileUpload">اختيار الملف</label>
                    <br></br>
                  <input 
                    type="file"
                    className="w-full p-2 pt-3 pl-3 text-left border-2 border-gray-500 rounded-md focus:border-teal-500 focus:ring-teal-500"
                    id="fileUpload"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    required
                  >
                  </input>

                </div>
     */}
                <p></p>
                {/* Classification input field */}
                  <div className="justify-end w-full pb-4 ">
                    <label htmlFor="dropdown1">التصنيف</label>
                    <br></br>
                    <select
                      className="w-full p-2 text-right border-2 border-gray-500 rounded-md focus:border-teal-500 focus:ring-teal-500"
                      id="dropdown1"
                      name='classification'
                      value={formData.classification}
                      onChange={handleChange}
                      required
                    >
                      <option>سيرة</option>
                      <option>سياسة</option>
                      <option>مهني</option>
                      <option>عام</option>
                    </select>
                  </div>
                  <p></p>

                  {/* Media input field */}
                  <div className="w-full pb-4 ">
                    <label htmlFor="dropdown2" className='whitespace-nowrap'>نوع الميديا</label>
                    <br></br>
                    <select
                      className="w-full p-2 text-right border-2 border-gray-500 rounded-md focus:border-teal-500 focus:ring-teal-500"
                      id="dropdown2"
                      name='media'
                      value={formData.media}
                      onChange={handleChange}
                      required
                    >
                      <option>نص</option>
                      <option>صورة</option>
                      <option>صوت</option>
                      <option>فيديو</option>
                    </select>
                  </div>
                  <p></p>

                  {/* eventDate input field */}
                  <div className="w-full pb-4 ">
                    <label htmlFor="dropdown2" className='whitespace-nowrap'>تاريخ المحتوى الجديد </label>
                    <br></br>
                    <input 
                      type="date"
                      className="w-full p-2 text-right border-2 border-gray-500 rounded-md focus:border-teal-500 focus:ring-teal-500"
                      id="dropdown2"
                      name='eventDate'
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                    >
                    </input>
                  </div>
                  <p></p>
              </div>
            </div>
            {/* Comment input field */}
            <div className="pb-5">
              <label htmlFor="textarea">التعليق</label>
              <br></br>
              <textarea
                className="border-2 border-gray-500 p-2 rounded-md w-full  focus:border-teal-500 focus:ring-teal-500 text-right h-[100px]"
                id="textarea"
                name='comment'
                value={formData.comment}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <p></p>
            <div className="justify-center w-3/4 m-auto">

              <button
                type="submit"
                className="px-2 py-2 text-lg text-white bg-teal-500 rounded-lg font-latoBold"
                id='sendBtn'
              >
                  (content upload) اضغط لإرسال المحتوى
              </button>
            </div>
            {/* <p className="mt-2 text-sm text-center text-gray-500">NOTE: ON SUBMISSION ONLY UPLOAD ONE FILE TO THE DRIVE PER FORM SUBMISSION</p> */}
          </div>
        </div>
        
      </form>
      <div id="response" className="mt-4 text-center"></div>
    </main>
  );
}

