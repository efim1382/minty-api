import express from "express";
import { Pool } from "pg";
import { dbConfig } from "./config";

const PORT = process.env.PORT || 3001;

const app = express();

const pool = new Pool(dbConfig);

app.get("/", (req, res) => {
	res.json({
		message: "Hello World",
	});
});

app.get("/test/get-all/", async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM test_table");
		res.json(result.rows);
	} catch (error) {
		res.status(500).send("Error fetching from test_table");
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
