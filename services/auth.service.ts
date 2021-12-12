import { BadRequestError } from "../common/errors/bad-request.error";
import { IRegisterUserDto } from "../dto/auth/register-user.dto";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";

export async function getUserByCredsOrThrow(email: string, password: string) {
  const user = await UserModel.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new BadRequestError("Incorrect email and / or password");
  }
  const userJSON = user.toJSON();
  delete userJSON.password;
  return userJSON;
}

export async function createUser(registerUserDto: IRegisterUserDto) {
  const userExists = await UserModel.exists({
    email: registerUserDto.email,
  });

  if (userExists) {
    throw new BadRequestError("User with this email already exists");
  }

  const user = await UserModel.create(registerUserDto);
  const userJSON = user.toJSON();
  delete userJSON.password;

  return userJSON;
}
