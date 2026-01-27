import { Pool } from "pg";
import  dotenv  from "dotenv";
dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});
const client = await pool.connect();


export default client;