// // import pkg from "pg";
// // import dotenv from "dotenv";
// // const { Pool } = pkg;

// // dotenv.config();

// // const pool = new Pool({
// //   host: process.env.DB_HOST,
// //   port: Number(process.env.DB_PORT),
// //   database: process.env.DB_NAME,
// //   user: process.env.DB_USER,
// //   password: String(process.env.DB_PASSWORD),
// //   ssl: {
// //     rejectUnauthorized: false
// //   },
// // });

// // export default pool;

// import pkg from "pg";
// import dotenv from "dotenv";
// const { Pool } = pkg;

// dotenv.config();

// const pool = new Pool({
//   // host: process.env.DB_HOST,
//   // port: Number(process.env.DB_PORT),
//   // database: process.env.DB_NAME,
//   // user: process.env.DB_USER,
//   // password: String(process.env.DB_PASSWORD)
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   },
// });

// pool.connect()
//   .then(() => console.log("✅ DB connected successfully"))
//   .catch((err) => console.error("❌ DB not connected", err));

// export default pool;


// import pkg from "pg";
// import dotenv from "dotenv";
// const { Pool } = pkg;

// dotenv.config();

// const pool = new Pool({
//   // Host corrected to aws-1 as per your Supabase screenshot
//   user: 'postgres.zeytmkdagscytedatotk',
//   host: 'aws-1-ap-south-1.pooler.supabase.com',
//   database: 'postgres',
//   password: 'jjhh-kkhh-7746',
//   port: 5432, 
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// export default pool;



import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // ← this fixes SELF_SIGNED_CERT error
  }
});

export default pool;