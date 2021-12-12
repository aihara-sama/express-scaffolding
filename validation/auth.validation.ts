import Joi from "joi";
import { IUser } from "../common/interfaces/user.interface";

export const registerSchema = Joi.object<IUser>({
  firstName: Joi.string().required().label("First name"),
  lastName: Joi.string().required().label("Last name"),
  email: Joi.string().required().email().label("Email"),
  password: Joi.string().required().min(7).label("Password"),
});

export const loginSchema = Joi.object<Record<"email" | "password", IUser>>({
  email: Joi.string().required().email().label("Email"),
  password: Joi.string().required().label("Password"),
});
