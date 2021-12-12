import { model } from "mongoose";
import { IUser } from "../common/interfaces/user.interface";
import { UserSchema } from "../schemas/user.schema";

export const UserModel = model<IUser>("User", UserSchema);
