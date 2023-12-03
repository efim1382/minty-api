import express from "express";
import { getWallets } from "./index";

const router = express.Router();

router.get("/", getWallets);

export default router;
