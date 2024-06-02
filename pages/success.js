// pages/success.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Success() {
  const router = useRouter();
  const { email, dropdown1, dropdown2, textarea } = router.query;
  const [formData, setFormData] = useState({ email: '', dropdown1: '', dropdown2: '', textarea: '' });

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

  return (
    <div>
      <h1>Form Submitted Successfully!</h1>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Dropdown 1:</strong> {formData.dropdown1}</p>
      <p><strong>Dropdown 2:</strong> {formData.dropdown2}</p>
      <p><strong>Text Area:</strong> {formData.textarea}</p>
      <button onClick={() => router.push('/')}>Go back to the form</button>
    </div>
  );
}
