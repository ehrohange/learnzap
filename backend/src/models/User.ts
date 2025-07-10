import mongoose, { Document, Schema } from "mongoose";
import { CreateUserDto } from "../dtos/CreateUser.dto";

export interface IUser extends Document, CreateUserDto {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema, "users");

export default User;
