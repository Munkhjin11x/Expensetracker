'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Step() {
  const [currency_type, setCurrency] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem('data');
    console.log(storedEmail);
    setEmail(storedEmail);
  }, []);

  const handle = async () => {
    const response = await axios.put('http://localhost:8003/users/user', { currency_type, email });
    console.log(response.data);
  }

  return (
    <div>
      <ul className="steps w-[500px]">
        <li className="step step-primary">Currency</li>
        <li className="step">Balance</li>
        <li className="step">Finish</li>
      </ul>
      <select value={currency_type || email} onChange={(e) => setCurrency(e.target.value)}>
        <option>MNT</option>
        <option>USD</option>
      </select>
      <button onClick={handle}>tap</button>
    </div>
  );
}
