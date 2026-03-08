import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  // host: process.env.DB_HOST,
  // port: Number(process.env.DB_PORT),
  // database: process.env.DB_NAME,
  // user: process.env.DB_USER,
  // password: String(process.env.DB_PASSWORD)
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
});

pool.connect()
  .then(() => console.log("✅ DB connected successfully"))
  .catch((err) => console.error("❌ DB not connected", err));

export default pool;