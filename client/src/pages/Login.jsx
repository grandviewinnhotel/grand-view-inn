import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login(){
  const [username,setUsername]=useState(""); const [password,setPassword]=useState("");
  const nav = useNavigate();
  const submit=(e)=>{ e.preventDefault();
    if(username==="admin" && password==="1234"){ localStorage.setItem("isAdmin","true"); nav("/admin"); }
    else alert("Invalid credentials");
  };
  return (
    <div className="section py-24 text-white flex justify-center">
      <form onSubmit={submit} className="card p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gold mb-6">Admin Login</h2>
        <input className="w-full p-3 mb-3 rounded bg-white/10" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input type="password" className="w-full p-3 mb-4 rounded bg-white/10" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-gold hover:bg-yellow-400 text-black font-semibold py-3 rounded">Login</button>
      </form>
    </div>
  );
}