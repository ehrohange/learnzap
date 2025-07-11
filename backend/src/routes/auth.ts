import bcrypt from "bcryptjs";
import { Router } from "express";
import { authLogin } from "../handlers/authHandler";

const router = Router();

router.post("/login", authLogin);

export default router;
