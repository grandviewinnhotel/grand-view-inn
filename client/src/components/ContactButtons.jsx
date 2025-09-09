import React from "react";

const ContactButtons = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-6">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917348802777?text=Hello%20Grand%20View%20Inn,%20I%20want%20to%20confirm%20my%20booking."
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg hover:bg-green-600 transition"
      >
        📱 Chat on WhatsApp
      </a>

      {/* Call Button */}
      <a
        href="tel:+917348802777"
        className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 transition"
      >
        ☎️ Call Us
      </a>

      {/* Email Button */}
      <a
        href="mailto:grandviewinnhotel.com@gmail.com?subject=Room%20Booking&body=Hello,%20I%20want%20to%20book%20a%20room."
        className="px-6 py-3 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition"
      >
        📧 Email Us
      </a>
    </div>
  );
};

export default ContactButtons;
