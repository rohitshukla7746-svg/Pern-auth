import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pool from "./lib/db.js";

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import cookieParser from "cookie-parser";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");


dotenv.config();

const e = express()

e.use(
  cors({
    // origin: process.env.CLIENT_URL, // 
      origin: "https://pern-auth-frontend.onrender.com", 
    credentials: true,
  })
);

e.use(express.json());
e.use(cookieParser());
const PORT = process.env.PORT

e.use("/api/auth", authRoutes )
e.use("/api/user", userRoutes )

e.listen(PORT, async () => {
  console.log(`🚀 Server running on ${PORT}`);

  try {
    await pool.query("SELECT 1");
    console.log("✅ DB connected");
  } catch (err) {
    console.error("❌ DB not connected", err);
  }
});


