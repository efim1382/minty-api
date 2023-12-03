import express from "express";
import { getUserAccounts, createAccount } from "./index";

const router = express.Router();

router.get("/", getUserAccounts);
router.post("/create/", createAccount);

export default router;
