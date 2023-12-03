import express from "express";
import { getCurrencies } from "./index";

const router = express.Router();

router.get("/", getCurrencies);

export default router;
