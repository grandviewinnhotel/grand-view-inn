import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";

const heroImages = [
  "/images/hero-deluxe.jpg",
  "/images/hero-executive.jpg",
  "/images/hero-suite.jpg",
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  arrows: false,
};

export default function Home() {
  return (
    <main className="text-white">
      {/* Hero Slider Section */}
      <section className="relative h-[82vh] overflow-hidden">
        <Slider {...sliderSettings}>
          {heroImages.map((src, i) => (
            <div key={i} className="w-full h-[82vh] relative">
              <img
                src={src}
                alt={"Hero " + i}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-6xl font-extrabold text-gold text-center px-4"
                >
                  Your Stay, Our Care
                </motion.h1>
              </div>
            </div>
          ))}
        </Slider>
        <a
          href="/booking"
          className="absolute bottom-8 right-8 bg-gold text-black font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-400 transition"
        >
          Book Now
        </a>
      </section>

      {/* About Section */}
      <section className="py-14 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">
          Experience Comfort & Elegance
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          In the heart of Kalyan Nagar, Bangalore — Deluxe, Executive & Suite
          rooms with warm hospitality, seamless check-in and curated amenities.
        </p>
      </section>

      {/* Hotel Photo + Contact Info Section */}
      <section className="py-14 text-center bg-[#0a0f2c]">
        <h2 className="text-3xl md:text-4xl font-bold text-gold mb-6">
          Get in Touch
        </h2>

        {/* Hotel Image */}
        <div className="max-w-4xl mx-auto mb-6">
          <img
            src="/images/hotel-front.jpg" // 👉 replace with your actual hotel image
            alt="Grand View Inn Hotel"
            className="w-full rounded-2xl shadow-lg object-cover"
          />
        </div>

        {/* Contact Details */}
        <p className="text-lg text-gray-300">
          📞 +91 7348802777
        </p>
        <p className="text-lg text-gray-300">
          📧 grandviewinnhotel.com@gmail.com
        </p>
      </section>
    </main>
  );
}
