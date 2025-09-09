import React, { useEffect, useState } from "react";
const API = (typeof __API_URL__ !== "undefined" ? __API_URL__ : "http://localhost:3000");

export default function Gallery(){
  const [images, setImages] = useState([]);
  useEffect(()=>{ fetch(`${API}/api/gallery`).then(r=>r.json()).then(setImages).catch(()=>setImages([])); },[]);
  return (
    <div className="section py-12 text-white">
      <h2 className="text-3xl font-bold text-gold mb-6">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src,i)=>(
          <img key={i} src={`${API}${src}`} alt={"img-"+i} className="rounded-lg shadow object-cover w-full h-48"/>
        ))}
      </div>
    </div>
  );
}