// pages/index.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Heading, Button, Html } from "@react-email/components";
import Image from 'next/image';



export default function Home() {
  const [email, setEmail] = useState('');
  const [dropdown1, setDropdown1] = useState('سيرة');
  const [dropdown2, setDropdown2] = useState('نص');
  const [textarea, setTextarea] = useState('');
  const router = useRouter();

  const [formData, setFormData] = useState({
    uploadDate: null,
    email: '',
    classification: 'سيرة',
    media: 'نص',
    comment: ''
  });

  const [link, setLink] = useState('')

  useEffect(() => {
    setLink(
      generate(formData.classification, formData.media)
    )
  }, [formData.classification, formData.media])

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Redirect to the success page with form data as query parameters
  //   router.push({
  //     pathname: '/success',
  //     query: { email, dropdown1, dropdown2, textarea },
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (Object.values(formData).some(x => x === '')) {
        alert('Please enter all credentials');
    } else {
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
        const credentials = {service_id: 'service_93s6k34',template_id: 'template_09d92fm',user_id: 'NqeQ0wa502xNx91Zq', template_params: formData}
        console.log("credentials"+JSON.stringify(credentials))
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => {
            if (response.ok) {
                //alert('information sent successfully')
            return response.json();

            }
            throw new Error('Network response was not ok.');
        })
        .then(responseData => {
            console.log('Response from server:', responseData);
            console.log("response:"+responseData['response'])
            document.getElementById('answer').innerHTML = responseData['response'];
            // Handle the response data here
        })
        .catch(error => {
            console.error('There was a problem with the POST request:', error);
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
          window.open(link)
        }

        // sendBtn.setAttribute('disabled', 'true');
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

  if (string_1 == 'سيرة' && string_2 == 'نص') {
      url = 'https://drive.google.com/drive/folders/1pPbrwo1T-8o7rdJQaOH1SYYbtG598ut6?usp=drive_link';
  } else if (string_1 == 'سيرة' && string_2 == 'صورة') {
      url = 'https://drive.google.com/drive/folders/1lWgWMgVyPPAy-BDq6ndtmANgZ2tIvJdz?usp=drive_link';
  } else if (string_1 == 'سيرة' && string_2 == 'صوت') {
      url = 'https://drive.google.com/drive/folders/1f-AS8-TFzzUH9oyxFmu4MdXiqO8JILsQ?usp=drive_link';
  } else if (string_1 == 'سيرة' && string_2 == 'فيديو') {
      url = 'https://drive.google.com/drive/folders/15-4U9wMPNugW1u9LzBA6mk_OkG2W7WSX?usp=drive_link';
  }
  if (string_2 == 'سياسة' && string_2 == 'نص') {
    url = 'https://drive.google.com/drive/folders/1DU-icTFHD93_UlLt3oYaWRGVh5Z-3Ci7?usp=drive_link';
  } else if (string_1 == 'سياسة' && string_2 == 'صورة') {
      url = 'https://drive.google.com/drive/folders/1-kGaFBsTudL6F_JBPDVhln2lAZst687B?usp=drive_link';
  } else if (string_1 == 'سياسة' && string_2 == 'صوت') {
      url = 'https://drive.google.com/drive/folders/1Ee2tumZJTM3CYppGAHzvhE4M08n2nscr?usp=drive_link';
  } else if (string_1 == 'سياسة' && string_2 == 'فيديو') {
      url = 'https://drive.google.com/drive/folders/1UPFu2aJtMZf3goe275ziKxzCzdgfSN7M?usp=drive_link';
  }
  if (string_2 == 'مهني' && string_2 == 'نص') {
  url = 'https://drive.google.com/drive/folders/1bO-SiyULCyUMpz7SKxYzTltcAeYlXodQ?usp=drive_link';
  } else if (string_1 == 'مهني' && string_2 == 'صورة') {
      url = 'https://drive.google.com/drive/folders/1c4zbsz6n7veiRJcrrIucNBg1ffXYFZlC?usp=drive_link';
  } else if (string_1 == 'مهني' && string_2 == 'صوت') {
      url = 'https://drive.google.com/drive/folders/1HJ8wDDJtEEIrmiD-_D-XkfAxSgoqFjkn?usp=drive_link';
  } else if (string_1 == 'مهني' && string_2 == 'فيديو') {
      url = 'https://drive.google.com/drive/folders/1T8OmH25DMZB2pgMuKv-j-wkfQMVNMg-x?usp=drive_link';
  }
  if (string_2 == 'عام' && string_2 == 'نص') {
    url = 'https://drive.google.com/drive/folders/1-idQwfPgNjmNfQoRiPoAbdhNX5A1cExz?usp=drive_link';
  } else if (string_1 == 'عام' && string_2 == 'صورة') {
    url = 'https://drive.google.com/drive/folders/1q8ACZExlpGy4pF9RJT2aWx3CQQTjbdbu?usp=drive_link';
  } else if (string_1 == 'عام' && string_2 == 'صوت') {
    url = 'https://drive.google.com/drive/folders/1aIY1KRPTdQvBYgbHzSyqERby9Linm0aK?usp=drive_link';
  } else if (string_1 == 'عام' && string_2 == 'فيديو') {
    url = 'https://drive.google.com/drive/folders/1VBcPYsTWcVKRR0j66L4lFBRVRtFWDler?usp=drive_link';
  }

  return url;
}

  return (

    <main className=" items-center   justify-end px-10 py-[10px] md:h-screen">
      
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
          {/* <img src='/images/MSA.jpg' className=' m-auto h-[50px]'></img> */}

          <div className="mt-6 ">
            <div className='flex justify-between firstSection'>
                           {/* Image */}
              {/* <img src='/images/MSA.jpg' className='w-2/5 '></img> */}
              <div className='bg-[#14B8A6] rounded p-[5px] w-2/5 h-fit mt-[30px]'>
                <img src='/images/MSA.png' className='bg-white bg-gradient-to-r from-[#14B8A6] to-white-100'></img>

              </div>
              <div className='small-boxes px-[10px] w-3/6  justify-end'>
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
                {/* <div className='dropdown flex justify-end flex-col gap-[0px]'> */}

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
                  {/* <div className='w-full bg-black h-[80px]'></div> */}

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
                  {/* <div className='w-full bg-black h-[80px]'></div> */}

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
                {/* </div> */}
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
      {/* <form>
        <div>
        <p></p>

          <Heading as="h1" style={{ fontFamily: 'sans-serif' }}>
            Hello, Universe!
          </Heading>
          <Button
            href="https://spacejelly.dev"
            style={{ fontFamily: 'sans-serif' , background: "blueviolet", color: "white", padding: "12px 20px" }}
          >
            Visit Space Jelly
          </Button>

        </div>
      </form> */}
    </main>
  );
}
