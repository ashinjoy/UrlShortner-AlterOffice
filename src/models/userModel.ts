import mongoose, { Schema } from "mongoose";
import { IUser } from "../interface/userInterface";

const userSchema = new Schema<IUser>(
  {
    uname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    google_id: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model<IUser>("user", userSchema);
