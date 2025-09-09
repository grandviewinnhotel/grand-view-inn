GRAND VIEW INN - Equinox-style Website (Client + Server)

How to run:
1) Start the API (port 3000)
   cd server
   npm install
   npm run dev

2) Start the frontend (port 5173)
   Open a NEW terminal
   cd client
   npm install
   set VITE_API_URL=http://localhost:3000   (Windows CMD)
   # or: $env:VITE_API_URL="http://localhost:3000" (PowerShell)
   # or: VITE_API_URL="http://localhost:3000" (macOS/Linux)
   npm run dev

Admin:
- Visit /login  (username: admin, password: 1234)
- Go to /admin to Confirm/Reject/Complete bookings and upload photos.

Booking flow:
- Payment options: "Call hotel to confirm" or "Pay at property".
- New bookings get status:
   - call_confirm      -> "Pending – Awaiting Phone Confirmation"
   - pay_at_property   -> "Reserved – Pay on Arrival"
- Update status in Admin dashboard via buttons.

Files:
- Bookings: server/data/bookings.json
- Uploaded photos: server/uploads