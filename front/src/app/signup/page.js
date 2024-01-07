'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8003/users', { name, email, password });
      console.log(response.data);
      router.push('/login');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('ali hediin burtgedsen email bn.');
      } else {
        console.error('Signup error:', error);
        setError('aldaa');
      }
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;

