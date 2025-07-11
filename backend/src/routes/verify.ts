import { Router } from "express";
import { verifyUser } from "../handlers/verifyHandler";

const router = Router();

router.get("/", verifyUser);

export default router;
