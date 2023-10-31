import express from "express";
import cors from "cors";
import session from "express-session";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import csurf from "csurf";
import cookieParser from "cookie-parser";
import connectPgSimple from "connect-pg-simple";
import { pool } from "database";
import routes from "./routes";

const PORT = process.env.PORT || 3001;

const PgStore = connectPgSimple(session);
const app = express();

app.use(cors({
	origin: "http://localhost:3000",
	credentials: true,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(session({
	store: new PgStore({
		pool,
		tableName: "session",
	}),

	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: false,

	cookie: {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
	},
}));

app.use(rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
}));

app.use(csurf({
	cookie: false,

	value: (req) => {
		return req.headers["csrf-token"];
	},
}));

// app.use((req, res, next) => {
// 	setTimeout(() => next(), 2000);
// });

app.use((error, req, res, next) => {
	if (error.code === "EBADCSRFTOKEN") {
		return res.status(403).json({
			message: "Invalid CSRF token",
			code: "invalid_csrf_token",
		});
	}

	next(error);
});

app.use("/api", routes);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
