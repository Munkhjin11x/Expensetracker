'use client'
import  { useState } from 'react';
import axios from 'axios';
const hi = async ()=>{
  console.log(await axios.get("http://localhost:8003/users"));
}
hi()

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8003/users', { email, password });
      console.log(response.data); 
    } catch (error) {
      console.error('Login error:', error);
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

export default Login;
