import { Router } from "express";
import { createUser, getUserById, getUsers, updateDarkModeSetting, updatePassword } from "../handlers/usersHandler";

const router = Router();

router.get("/", getUsers);

router.post("/create", createUser);

router.get("/:id", getUserById);

router.patch("/:id", updateDarkModeSetting);

router.patch("/update-password/:id", updatePassword);

export default router;
