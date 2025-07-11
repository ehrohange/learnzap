import bcrypt from "bcryptjs";
import { Router } from "express";
import { authLogin } from "../handlers/auth";

const router = Router();

router.post("/login", authLogin);

export default router;
