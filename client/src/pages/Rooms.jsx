import React from "react";
import Slider from "react-slick";

const rooms = [
  { name: "Deluxe Room", priceAC: "₹1800+tax", priceNonAC: "₹1600+tax", images: ["/images/deluxe1.jpg","/images/deluxe2.jpg","/images/bathroom1.jpg"] },
  { name: "Executive Room", priceAC: "₹2200+tax", priceNonAC: "₹1800+tax", images: ["/images/executive1.jpg","/images/executive2.jpg","/images/executive-bath.jpg"] },
  { name: "Suite Room", priceAC: "₹3200+tax", priceNonAC: "₹2600+tax", images: ["/images/suite1.jpg","/images/suite2.jpg","/images/suite-bath.jpg"] },
];
const sliderSettings = { dots:true, infinite:true, speed:600, slidesToShow:1, slidesToScroll:1, arrows:true };

export default function Rooms(){
  return (
    <section className="section py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gold mb-8 text-center">Our Rooms</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {rooms.map((room, i) => (
          <div key={i} className="card p-4">
            <h3 className="text-2xl text-gold mb-2">{room.name}</h3>
            <Slider {...sliderSettings}>
              {room.images.map((img, idx) => (
                <img key={idx} src={img} alt={room.name+" "+idx} className="w-full h-56 object-cover rounded-xl"/>
              ))}
            </Slider>
            <p className="mt-4 text-gray-300">AC: <span className="text-gold">{room.priceAC}</span></p>
            <p className="text-gray-300">Non-AC: <span className="text-gold">{room.priceNonAC}</span></p>
            <a href="/booking" className="mt-4 inline-block w-full text-center bg-gold hover:bg-yellow-400 text-black font-semibold py-2 rounded">Book Now</a>
          </div>
        ))}
      </div>
    </section>
  );
}