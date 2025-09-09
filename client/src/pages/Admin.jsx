import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API = (typeof __API_URL__ !== "undefined" ? __API_URL__ : "http://localhost:3000");

export default function Admin(){
  const nav = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin")==="true";
  const [bookings, setBookings] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(()=>{
    if(!isAdmin){ nav("/login"); return; }
    refresh();
  },[]);

  const refresh = ()=> {
    fetch(`${API}/api/bookings`).then(r=>r.json()).then(setBookings).catch(()=>setBookings([]));
  };

  const onUpload = async (e)=>{
    const files = Array.from(e.target.files || []);
    if(files.length===0) return;
    const form = new FormData();
    files.forEach(f=> form.append("photos", f));
    setUploading(true);
    try{
      await fetch(`${API}/api/upload`, { method:"POST", body: form });
      alert("Uploaded!");
    } finally {
      setUploading(false);
    }
  };

  const setStatus = async (ref, status)=>{
    const res = await fetch(`${API}/api/bookings/${ref}`, { method:"PATCH", headers:{'Content-Type':'application/json'}, body: JSON.stringify({ status }) });
    if(res.ok) refresh();
  };

  return (
    <div className="section py-10 text-white">
      <h2 className="text-3xl font-bold text-gold mb-4">Admin Dashboard</h2>

      <div className="card p-4 mb-6">
        <h3 className="text-xl mb-2">Upload Gallery Photos</h3>
        <input type="file" multiple accept="image/*" onChange={onUpload} />
        {uploading && <p className="text-yellow-300 text-sm mt-2">Uploading...</p>}
      </div>

      <div className="card p-4">
        <h3 className="text-xl mb-4">Bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gold">
              <tr>
                <th className="p-2">Ref</th><th className="p-2">Name</th><th className="p-2">Phone</th><th className="p-2">Room</th><th className="p-2">Dates</th><th className="p-2">Guests</th><th className="p-2">Pay</th><th className="p-2">Status</th><th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b,i)=>(
                <tr key={i} className="border-t border-white/10">
                  <td className="p-2">{b.ref}</td>
                  <td className="p-2">{b.name}</td>
                  <td className="p-2">{b.phone}</td>
                  <td className="p-2">{b.roomType}{b.extraPerson ? " +1 extra" : ""}</td>
                  <td className="p-2">{b.checkIn} → {b.checkOut}</td>
                  <td className="p-2">{b.guests}</td>
                  <td className="p-2">{b.paymentMethod}</td>
                  <td className="p-2">{b.status}</td>
                  <td className="p-2 space-x-2">
                    <button onClick={()=>setStatus(b.ref,"Confirmed")} className="px-2 py-1 bg-green-500/80 rounded">Confirm</button>
                    <button onClick={()=>setStatus(b.ref,"Rejected")} className="px-2 py-1 bg-red-500/80 rounded">Reject</button>
                    <button onClick={()=>setStatus(b.ref,"Completed")} className="px-2 py-1 bg-blue-500/80 rounded">Complete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}