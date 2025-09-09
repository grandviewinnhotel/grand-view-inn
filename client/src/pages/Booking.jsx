import React, { useState } from "react";

const API = (typeof __API_URL__ !== "undefined" ? __API_URL__ : "http://localhost:3000");

export default function Booking(){
  const [form, setForm] = useState({
    name:"", phone:"", email:"",
    roomType:"Deluxe", checkIn:"", checkOut:"",
    guests:1, extraPerson:false, notes:"", paymentMethod:"call_confirm"
  });
  const [status, setStatus] = useState(null);
  const [ref, setRef] = useState(null);

  const onChange = (e)=>{
    const {name, value, type, checked} = e.target;
    setForm(prev => ({...prev, [name]: type==="checkbox" ? checked : value}));
  };

  const submit = async (e)=>{
    e.preventDefault();
    setStatus("Submitting...");
    try{
      const res = await fetch(`${API}/api/bookings`, {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if(res.ok){
        setRef(data.ref);
        setStatus(data.message || "Booking created!");
      } else {
        setStatus("Error: " + (data.message || "Failed"));
      }
    }catch(err){
      setStatus("Network error");
    }
  };

  const totalExtra = form.extraPerson ? 600 : 0;

  return (
    <div className="section py-12 text-white">
      <h2 className="text-3xl font-bold text-gold mb-6">Book Your Stay</h2>
      <form onSubmit={submit} className="card p-6 grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input className="p-3 rounded bg-white/10" placeholder="Full Name" name="name" value={form.name} onChange={onChange} required/>
          <input className="p-3 rounded bg-white/10" placeholder="Phone" name="phone" value={form.phone} onChange={onChange} required/>
        </div>
        <input className="p-3 rounded bg-white/10" placeholder="Email (optional)" name="email" value={form.email} onChange={onChange}/>
        <div className="grid md:grid-cols-3 gap-4">
          <select className="p-3 rounded bg-white/10" name="roomType" value={form.roomType} onChange={onChange}>
            <option>Deluxe</option><option>Executive</option><option>Suite</option>
          </select>
          <input type="date" className="p-3 rounded bg-white/10" name="checkIn" value={form.checkIn} onChange={onChange} required/>
          <input type="date" className="p-3 rounded bg-white/10" name="checkOut" value={form.checkOut} onChange={onChange} required/>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <input type="number" min="1" className="p-3 rounded bg-white/10" placeholder="Guests" name="guests" value={form.guests} onChange={onChange}/>
          <label className="flex items-center gap-2 p-3 rounded bg-white/10">
            <input type="checkbox" name="extraPerson" checked={form.extraPerson} onChange={onChange}/>
            Add Extra Person (+₹600)
          </label>
          <div className="p-3 rounded bg-white/10">Extra Total: ₹{totalExtra}</div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="p-3 rounded bg-white/10 flex items-center gap-3">
            <input type="radio" name="paymentMethod" value="call_confirm" checked={form.paymentMethod==="call_confirm"} onChange={onChange}/>
            Call hotel to confirm (we will call you)
          </label>
          <label className="p-3 rounded bg-white/10 flex items-center gap-3">
            <input type="radio" name="paymentMethod" value="pay_at_property" checked={form.paymentMethod==="pay_at_property"} onChange={onChange}/>
            Pay at property (reserve now, pay on arrival)
          </label>
        </div>

        <textarea rows="3" className="p-3 rounded bg-white/10" placeholder="Notes" name="notes" value={form.notes} onChange={onChange}/>
        <button className="bg-gold hover:bg-yellow-400 text-black font-semibold py-3 rounded">Confirm Booking</button>
        {status && <div className="text-sm text-gold">Status: {status}{ref ? ` | Ref: ${ref}` : ""}</div>}
      </form>

      <div className="mt-6 text-gray-300">
        <p>Need help? Call us anytime: <span className="text-gold">+91-XXXXXXXXXX</span></p>
      </div>
    </div>
  );
}