import mongoose, { Document, Schema } from "mongoose";
import { OtpDto } from "../dtos/verify.dto";

export interface IOTP extends Document, OtpDto {}

const userSchema = new Schema<IOTP>(
  {
   email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
   },
   otp: {
    type: String,
    required: true,
   },
   isUsed: {
    type: Boolean,
    default: false,
   },
   expiration: {
    type: Date,
    required: true,
   }
  },
  {
    timestamps: true,
    collection: "otp",
  }
);

const Otp = mongoose.model<IOTP>("User", userSchema);

export default Otp;
