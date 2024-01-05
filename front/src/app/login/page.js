'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {

    const isUserSignedUp = true;
    if (!isUserSignedUp) {
      router.push('/signup');
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:8003/users/users/auth', { email, password });
      console.log(response.data);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // alert('mail esvel pass buru bn ');
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
