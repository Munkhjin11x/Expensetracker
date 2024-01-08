"use client";
import Geld from '../../../public/img/geld.png'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const pageSwitcher = () =>{
    router.push("/signup")
  }
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8003/users/auth", {
        email,
        password,
      });
      if (response.data === "ok") {
        router.push("/dashboard");
      } else {
        console.log("Login failed:", response.data);
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className='flex'>

  
    <div className='h-screen w-1/2 '>
      <div className='fixed top-[40%] left-[15%] '>
      <img src={Geld.src}/>
      <h2>Welcome Back</h2>
      <p>Welcome back , Please enter your details</p>
      <div className='flex flex-col'>
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
      </div>
    
      <button onClick={handleLogin}>Login</button>
      <div className='flex gap-3'>
      <p>Don't have account?</p>
      <p className=' text-blue-600 cursor-pointer' onClick={pageSwitcher}>Sign up</p>
      </div>
      </div>
   
    </div>
    <div className='h-screen w-1/2 bg-blue-600'></div>
    </div>

  );
};

export default LoginPage;
