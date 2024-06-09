// pages/success.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Success() {
  const router = useRouter();
  const { email, dropdown1, dropdown2, textarea } = router.query;
  const [formData, setFormData] = useState({ email: '', dropdown1: '', dropdown2: '', textarea: '' });
  const url2 = generate(dropdown1, dropdown2);

  useEffect(() => {
    if (router.query) {
      setFormData({
        email: router.query.email || '',
        dropdown1: router.query.dropdown1 || '',
        dropdown2: router.query.dropdown2 || '',
        textarea: router.query.textarea || '',
      });
    }
  }, [router.query]);

  // Function to compare strings and assign URL
  function generate(string_1, string_2) {
    let url = '';

    if (string_2 == 'سيرة' && string_2 == 'نص') {
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
    <div>
      <h1>Form Submitted Successfully!</h1>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Dropdown 1:</strong> {formData.dropdown1}</p>
      <p><strong>Dropdown 2:</strong> {formData.dropdown2}</p>
      <p><strong>Text Area:</strong> {formData.textarea}</p>
      <button onClick={() => router.push('/')}>Go back to the form</button>
      <p></p>
      <button onClick={() => router.push(url2)}>Click to upload the {dropdown2} for the {dropdown1} ..</button>
    </div>
  );



}
