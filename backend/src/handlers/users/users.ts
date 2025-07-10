import { Request, Response } from "express-serve-static-core";
import { CreateUserDto } from "../../dtos/CreateUser.dto";
import User from "../../models/User";
import bcrypt from "bcryptjs";

export async function getUsers(request: Request, response: Response) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    if (!users) {
      return response
        .status(404)
        .json({ message: "There is no data in the collection." });
    }
    return response.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return response.status(400).json({ message: "Error fetching users." });
  }
}

export async function getUserById(request: Request, response: Response) {
  try {
    const user = await User.findById(request.params.id);
    if (!user) {
      return response.status(404).json({message: "User does not exist."});
    }
    return response.status(200).json(user);
  } catch (error) {
    
  }
}

export async function createUser(
  request: Request<{}, {}, CreateUserDto>,
  response: Response
) {
  const { name, email, password } = request.body;

  try {
    const existing = await User.findOne({ email });

    if (existing) {
      return response
        .status(400)
        .json({
          message:
            "User with this email address already exists. Please try a different email address.",
        });
    }

    const hashedPassword = bcrypt.hashSync(String(password), 10);

    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
    });
    return response.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return response.status(400).json({ message: "Error creating user." });
  }
}