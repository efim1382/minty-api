import express from "express";
import cors from "cors";
import routes from "./routes";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
