import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

const DATA = path.join(__dirname, "data", "bookings.json");
const UPLOADS = path.join(__dirname, "uploads");
if(!fs.existsSync(DATA)) fs.writeFileSync(DATA, "[]");
if(!fs.existsSync(UPLOADS)) fs.mkdirSync(UPLOADS, { recursive: true });

// Serve uploads statically
app.use("/uploads", express.static(UPLOADS));

// Helpers
const load = () => JSON.parse(fs.readFileSync(DATA, "utf-8"));
const save = (arr) => fs.writeFileSync(DATA, JSON.stringify(arr, null, 2));

// Bookings APIs
app.get("/api/bookings", (req,res)=>{
  const list = load();
  res.json(list.sort((a,b)=> (b.createdAt||0)-(a.createdAt||0)));
});

app.post("/api/bookings", (req,res)=>{
  const b = req.body || {};
  if(!b.name || !b.phone || !b.checkIn || !b.checkOut){
    return res.status(400).json({ message: "Missing required fields" });
  }
  const status = b.paymentMethod === "pay_at_property"
    ? "Reserved – Pay on Arrival"
    : "Pending – Awaiting Phone Confirmation";
  const newBooking = { ...b, ref: "GVI-"+nanoid(6), status, createdAt: Date.now() };
  const list = load();
  list.push(newBooking);
  save(list);
  res.json({ ok:true, ref: newBooking.ref, message: status });
});

app.patch("/api/bookings/:ref", (req,res)=>{
  const { ref } = req.params;
  const { status } = req.body || {};
  const list = load();
  const idx = list.findIndex(b=> b.ref === ref);
  if(idx === -1) return res.status(404).json({ message: "Not found" });
  if(status) list[idx].status = status;
  save(list);
  res.json({ ok:true });
});

// Gallery APIs
app.get("/api/gallery", (req,res)=>{
  const files = fs.readdirSync(UPLOADS).filter(f=>!f.startsWith("."));
  res.json(files.map(f=> `/uploads/${f}`));
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, nanoid(10)+ext);
  }
});
const upload = multer({ storage });

app.post("/api/upload", upload.array("photos", 20), (req,res)=>{
  res.json({ ok:true, count: (req.files||[]).length });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log("API running on http://localhost:"+PORT));