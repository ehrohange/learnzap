import { Router } from "express";
import { createUser, getUserById, getUsers, updateDarkModeSetting } from "../handlers/users";

const router = Router();

router.get("/", getUsers);

router.post("/create", createUser);

router.get("/:id", getUserById);

router.patch("/:id", updateDarkModeSetting);

export default router;
