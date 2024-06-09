// pages/index.js
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Heading, Button, Html } from "@react-email/components";
import Image from 'next/image';
import UploadFile from './UploadFile';
import CustomAlert from './CustomAlert';



export default function Home() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [link, setLink] = useState('')
  const [message, setMessage] = useState('')
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();


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
    const sizeLimit = 1000 * 1024; // 10KB in bytes
  
    if (selectedFile.size > sizeLimit) {
      setAlertMessage('File size exceeds the 1000KB limit.');
      setAlertType('error');
      setFile(null); // Reset the file input
    } else {
      setFile(selectedFile);
      setAlertMessage('');
    }
  };

  const handleSubmit = (e) => {
    const uploadOk = handleUpload();
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
    const credentials = {service_id: process.env.NEXT_PUBLIC_serviceId,template_id:
    process.env.NEXT_PUBLIC_templateID, user_id: process.env.NEXT_PUBLIC_userId, template_params: formData}
    console.log("credentials"+JSON.stringify(credentials))
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.text();

    })
    .then(text => {
      try {
            const data = JSON.parse(text);
            setLoading(false)
            setAlertMessage('Form submitted successfully!');
            setAlertType('success');
            document.getElementById('response').textContent = data.response;
            // router.push(`/success?email=${encodeURIComponent(formData.email)}`);
        } catch (err) {
            setLoading(false)
            setAlertMessage('Form submitted successfully!');
            setAlertType('success');
        }
    })
    .catch(error => {
        console.error('There was a problem with the POST request:', error);
        setLoading(false);
        setAlertMessage('There was a problem uploading the file')
        setAlertType('error')
        apiOK = false;
    });

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

const handleUpload = async () => {
  let uploadOk = false;

  if (!file) {
    alert('Please select a file first.');
    return uploadOk;
  }

  const uploadFormData = new FormData();
  uploadFormData.append('file', file);
  uploadFormData.append('_fields', JSON.stringify(formData));
  try {
    setUploading(true);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: uploadFormData,
    });

    const result = await response.json();
    if (result.success) {
      setMessage('File uploaded successfully! File ID: ' + result.data.id);
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
      <CustomAlert message={alertMessage} type={alertType} onClose={() => setAlertMessage('')} loading={loading} />
      
      <form 
        className="bg-white my-[10px] flex rounded-lg md:w-2/5 w-full font-latoRegular max-h-[97%]"
        onSubmit={handleSubmit}
        
      >
        
        {/* <div className='text-[50px]'>helo</div> */}
        <div className="flex-1 p-10 text-right text-gray-700">
          <h1 className="pb-2 text-3xl text-center font-latoBold">ذكرى ابو العافية</h1>
          <p className="text-lg text-center text-gray-500">
              *يرجى تعبئة كل البيانات  للانتقال لصفحة تحميل المحتوى*
          </p>
        <div className='flex fileUpload'>
        <input 
          type="file"
          className="w-full p-2 pt-3 pl-3 text-right border-2 border-gray-500 focus:border-teal-500 focus:ring-teal-500"
          id="dropdown2"
          ref={fileInputRef}
          onChange={handleFileChange}
          required
        >
          </input>
          <div className='bg-[#14B8A6] rounded p-[0px] h-[100px] w-[150px] '>
                <img src='/images/MSA.png' className='bg-white bg-gradient-to-l from-[#14B8A6] to-white-100 w-full h-full'></img>

              </div>
        </div>
          {/* <img src='/images/MSA.jpg' className=' m-auto h-[50px]'></img> */}

          <div className="mt-6 ">
            <div className='flex justify-end firstSection'>
              <div className='small-boxes px-[10px] w-4/6  justify-end'>

                {/* Email input field */}
                <div className="pb-4">
                  <label htmlFor="email">Email address (البريد)</label>
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
            <button
              type="submit"
              className="w-full py-3 text-lg text-white bg-teal-500 rounded-lg font-latoBold"
              id='sendBtn'
            >
               (Google Drive) اضغط للانتقال إلى صفحة إرسال المحتوى
            </button>
          </div>
        </div>
      </form>
      <div id="response" className="mt-4 text-center"></div>
    </main>
  );
}
