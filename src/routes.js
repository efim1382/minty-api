import express from "express";
import authRoutes from "controllers/auth/routes";
import accountsRoutes from "controllers/accounts/routes";
import walletsRoutes from "controllers/wallets/routes";
import currenciesRoutes from "controllers/currencies/routes";
import checkSession from "./middlewares/checkSession";

const router = express.Router();

router.get("/get-csrf-token/", (req, res) => {
	res.json({ csrfToken: req.csrfToken() });
});

router.use("/auth", authRoutes);
router.use("/accounts", checkSession, accountsRoutes);
router.use("/wallets", checkSession, walletsRoutes);
router.use("/currencies", checkSession, currenciesRoutes);

export default router;