import { Router } from "express";
import { verifyUser } from "../handlers/verify";

const router = Router();

router.get("/", verifyUser);

export default router;
