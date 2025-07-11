import mongoose, { Document, Schema } from "mongoose";
import { CreateUserDto } from "../dtos/user.dto";

export interface IUser extends Document, CreateUserDto {
  isVerified: boolean;
  verificationToken: string;
  createdAt: Date;
  updatedAt: Date;
  settings: {
    darkMode: boolean;
  };
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
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: false,
      unique: true,
    },
    settings: {
      darkMode: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
