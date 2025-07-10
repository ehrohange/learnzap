import bcrypt from "bcryptjs";
import { Router } from "express";
import { authLogin } from "../../handlers/auth/auth";

export const users = [
    {
        id: 1,
        name: "Jorge Angelo M. Pangilinan",
        email: "jorgeangelopangilinan@gmail.com",
        password: bcrypt.hashSync("password123", 10),
    }
];

const router = Router();

router.post('/login', authLogin);


export default router;