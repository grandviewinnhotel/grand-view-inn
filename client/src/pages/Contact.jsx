import React from "react";
import ContactButtons from "../components/ContactButtons";

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">
        Contact Us
      </h1>
      <p className="text-lg text-gray-300 max-w-2xl mb-8">
        We’d love to hear from you! Reach us via WhatsApp, call, or email for
        bookings and inquiries.
      </p>

      {/* WhatsApp / Call / Email Buttons */}
      <ContactButtons />

      <div className="mt-8 text-gray-400">
        <p>📍 #61, 3rd Floor, CMR Road, 4th Cross, HRBR Layout,</p>
        <p>Kalyan Nagar, Above Shoba Central, Kammanahalli, Bangalore – 560043</p>
      </div>
    </div>
  );
}
