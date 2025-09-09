import React from "react";
export default function Footer(){
  return (
    <footer className="bg-brand1 border-t border-gold/20 text-gray-300">
      <div className="section py-8 text-center">
        <p>© {new Date().getFullYear()} Grand View Inn Hotel. All rights reserved.</p>
        <p className="mt-2 text-gold">#61, 3rd Floor, CMR Road, 4th Cross, HRBR Layout, Kalyan Nagar, Bangalore - 560043</p>
      </div>
    </footer>
  );
}