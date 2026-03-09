import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10,
  idleTimeoutMillis: 30000,
});

client.on("error", (err) => {
  console.error("Unexpected error on idle database client:", err.message);
});

export default client;
