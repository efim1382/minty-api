import authRoutes from "controllers/auth/routes";
import express from "express";

const router = express.Router();

router.get("/get-csrf-token/", (req, res) => {
	res.json({ csrfToken: req.csrfToken() });
});

router.use("/auth", authRoutes);

export default router;