import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

console.log("Initializing database connection with the following settings:", {
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
});

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,

	ssl: {
		rejectUnauthorized: false,
	},
});

export const query = (text, params) => pool.query(text, params);
