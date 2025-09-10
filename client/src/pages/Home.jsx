import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/rooms?populate=*`)
      .then((res) => res.json())
      .then((data) => setRooms(data.data))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  return (
    <div className="bg-[#0b1033] min-h-screen text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Rooms</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => {
          const attrs = room.attributes;
          const imgUrl =
            attrs.room_images && attrs.room_images.length > 0
              ? `${API_URL}${attrs.room_images[0].url}`
              : "https://via.placeholder.com/400x300?text=No+Image";

          return (
            <div
              key={room.id}
              className="bg-[#1a1f4c] rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              {/* Room Image */}
              <img
                src={imgUrl}
                alt={attrs.room_name}
                className="h-56 w-full object-cover"
              />

              {/* Room Info */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-semibold mb-3">
                  {attrs.room_name}
                </h2>
                <p className="text-gray-300 mb-4">{attrs.room_description}</p>

                <div className="mt-auto">
                  <p className="text-yellow-400 font-bold">
                    Price: ₹{attrs.room_price}+tax
                  </p>
                  <p>Capacity: {attrs.room_capacity} guests</p>
                  <p className="text-sm text-gray-400">
                    Amenities: {attrs.room_amenities}
                  </p>
                  <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-xl transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
