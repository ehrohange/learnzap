import { Request, Response } from "express-serve-static-core";
import { CreateUserDto, UpdatePasswordDto } from "../dtos/user.dto";
import User from "../models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../utils/mailer";

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
    return response.status(500).json({ message: "Error fetching users." });
  }
}

export async function getUserById(request: Request, response: Response) {
  try {
    const user = await User.findById(request.params.id);
    if (!user) {
      return response.status(404).json({ message: "User does not exist." });
    }
    return response.status(200).json(user);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Error finding user." });
  }
}

export async function createUser(
  request: Request<{}, {}, CreateUserDto>,
  response: Response
) {
  const { name, email, password, settings } = request.body;
  const darkMode = settings?.darkMode;

  try {
    const existing = await User.findOne({ email });

    if (existing) {
      return response.status(400).json({
        message:
          "User with this email address already exists. Please try a different email address.",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    console.log("Sending email to: ", email);

    const verificationLink = `http://localhost:3000/api/verify?token=${verificationToken}`;

    await sendEmail(
      email,
      "Verify your account",
      `<p>Click <a href="${verificationLink}">here</a> to verify your account.</p>`
    );

    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
      settings: {
        darkMode: darkMode,
      },
    });

    return response.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return response.status(500).json({ message: "Error creating user." });
  }
}

export async function updateDarkModeSetting(
  request: Request,
  response: Response
) {
  try {
    const user = await User.findById(request.params.id);
    if (!user) {
      return response.status(404).json({ message: "User does not exist." });
    }
    const darkModeSetting = user.settings.darkMode;
    user.settings.darkMode = !darkModeSetting;

    await user.save();

    return response
      .status(200)
      .json({ message: "Theme successfully updated!" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Error updating theme." });
  }
}

export async function updatePassword(
  request: Request<{id: string}, {}, UpdatePasswordDto>,
  response: Response
) {
  try {
    const { password, newPassword } = request.body;

    const user = await User.findById(request.params.id);

    if (!user) {
      return response.status(404).json({ message: "User not found." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return response
        .status(400)
        .json({
          message:
            "Entered old password does not match the existing one. Please try again.",
        });
    }

    if (password === newPassword) {
      return response
        .status(400)
        .json({ message: "Old password cannot be the same as new password." });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return response
      .status(200)
      .json({ message: "Password has been updated successfully!" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Error updating password." });
  }
}
