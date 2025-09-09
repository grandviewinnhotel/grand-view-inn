import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar(){
  const base = "px-3 py-2 rounded hover:bg-white/10 transition";
  const active = ({isActive}) => (isActive ? base + " bg-white/10" : base);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand1/70 backdrop-blur border-b border-gold/20">
      <div className="section py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold text-gold tracking-wide">GRAND VIEW INN</Link>
        <nav className="flex gap-2 text-sm">
          <NavLink to="/" className={active}>Home</NavLink>
          <NavLink to="/rooms" className={active}>Rooms</NavLink>
          <NavLink to="/booking" className={active}>Book</NavLink>
          <NavLink to="/gallery" className={active}>Gallery</NavLink>
          <NavLink to="/contact" className={active}>Contact</NavLink>
          <NavLink to="/login" className={active}>Admin</NavLink>
        </nav>
      </div>
    </header>
  );
}