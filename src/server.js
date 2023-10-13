import express from "express";
import { query } from "./database";

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/", (req, res) => {
	res.json({
		message: "Hello World",
	});
});

app.get("/test-db/", async (req, res) => {
	console.log("Received request to /test-db/");

	try {
		const result = await query("SELECT NOW() as now");
		console.log("Database query successful:", result.rows[0]);
		res.json(result.rows[0]);
	} catch (err) {
		console.error("Error during database query:", err);
		res.status(500).json({ error: err.message });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
