import authRoutes from "controllers/auth/routes";
import express from "express";

const router = express.Router();

router.use("/auth", authRoutes);

export default router;