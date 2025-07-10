import { Router } from "express";
import { createUser, getUserById, getUsers } from "../../handlers/users/users";

const router = Router();

router.get("/", getUsers);

router.post("/create", createUser);

router.get("/:id", getUserById);

router.put("/:id", )
export default router;
