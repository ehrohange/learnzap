import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { users } from "../../routes/auth/auth";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function authLogin(request: Request, response: Response) {
  const { email, password } = request.body;

  try {
    const user = users.find((user) => user.email === email);

    if (!user) {
      return response.status(404).send({ message: "User does not exist." });
    } else {
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return response.status(400).send({ message: "Invalid password." });
      } else {
        const token = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "4h",
          }
        );

        response.status(200).json({ token });
      }
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    response.send({ message: error });
  }
}
