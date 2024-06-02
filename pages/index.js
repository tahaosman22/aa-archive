// pages/index.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [email, setEmail] = useState('');
  const [dropdown1, setDropdown1] = useState('');
  const [dropdown2, setDropdown2] = useState('');
  const [textarea, setTextarea] = useState('');
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Redirect to the success page with form data as query parameters
    router.push({
      pathname: '/success',
      query: { email, dropdown1, dropdown2, textarea },
    });
  };

  return (
    <div>
      <h1>Simple Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dropdown1">Dropdown 1:</label>
          <select
            id="dropdown1"
            value={dropdown1}
            onChange={(e) => setDropdown1(e.target.value)}
            required
          >
            <option value="" disabled>Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div>
          <label htmlFor="dropdown2">Dropdown 2:</label>
          <select
            id="dropdown2"
            value={dropdown2}
            onChange={(e) => setDropdown2(e.target.value)}
            required
          >
            <option value="" disabled>Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div>
          <label htmlFor="textarea">Text Area:</label>
          <textarea
            id="textarea"
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
