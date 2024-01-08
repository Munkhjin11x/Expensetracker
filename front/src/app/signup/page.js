'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Geld from '../../../public/img/geld.png'

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const pageSwitcher = () => {
    router.push("/login")
  }

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      const response = await axios.post('http://localhost:8003/users', { name, email, password });
      localStorage.setItem('data', JSON.stringify({ email }))
      console.log(response.data);
      router.push('/step');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Email already exists.');
      } else {
        console.error('Signup error:', error);
        setError('An error occurred during signup.');
      }
    }
  };

  return (
    <div className='flex'>
      <div className='h-screen w-1/2' >
        <div className='fixed top-[40%] left-[15%]'>
          <img src={Geld.src} />
          <p>Create Geld account</p>
          <p>Sign up below to create your Wallet account</p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className='flex flex-col'>
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
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button onClick={handleSignup}>Signup</button>
          <div className='flex gap-3'>
            <p>Already have account?</p>
            <p onClick={pageSwitcher} className='text-blue-600 cursor-pointer'>Login</p>
          </div>
        </div>

      </div>
      <div className='h-screen w-1/2 bg-blue-600'></div>

    </div>

  );
};

export default Signup;

