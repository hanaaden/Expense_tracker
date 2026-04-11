import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const pool = new Pool({
    connectionString : connectionString,
    ssl :{
         rejectUnauthorized : false
    }
})

const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log("Connected to the database successfully.");
        client.release();
    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
}

export { pool, connectDB };