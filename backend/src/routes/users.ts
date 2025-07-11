import { Router } from "express";
import { createUser, getUserById, getUsers } from "../handlers/users";

const router = Router();

router.get("/", getUsers);

router.post("/create", createUser);

router.get("/:id", getUserById);

export default router;
