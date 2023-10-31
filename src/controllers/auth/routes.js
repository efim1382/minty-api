import express from "express";
import { register, login, getCsrfToken, logout } from "./index";

const router = express.Router();

router.post("/register/", register);
router.post("/login/", login);
router.post("/logout/", logout);

export default router;
