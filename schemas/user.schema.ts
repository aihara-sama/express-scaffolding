import { hashSync } from "bcrypt";
import { Schema } from "mongoose";
import { IUser } from "../common/interfaces/user.interface";
import isEmail from "validator/lib/isEmail";

export const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      validate: [isEmail, "Email is invalid"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [1, "first name is too short"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [1, "Last name is too short"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [7, "Password is too short"],
      set: (v: string): string => hashSync(v, 10),
    },
  },
  { versionKey: false }
);
