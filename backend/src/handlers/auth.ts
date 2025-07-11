import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

export async function authLogin(request: Request, response: Response) {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return response.status(404).send({ message: "User does not exist." });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return response.status(400).send({ message: "Invalid password." });
    }

    if (!user.isVerified) {
      return response.status(200).send({message: "Please verify your account before logging in. Thank you."});
    }

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      settings: {
        darkMode: user.settings.darkMode,
      }
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "4h",
    });

    response.status(200).json({ token });
  } catch (error) {
    console.error(error);
    response.send({ message: error });
  }
}
