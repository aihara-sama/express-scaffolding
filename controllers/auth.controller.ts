import { NextFunction, Request, Response } from "express";
import { InternalServerError } from "../common/errors/internal.error";
import { ILoginUserDto } from "../dto/auth/login.dto";
import { createUser, getUserByCredsOrThrow } from "../services/auth.service";
import { StatusCodes } from "http-status-codes";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await createUser(req.body);

  res.status(StatusCodes.CREATED).json({
    user,
  });
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password }: ILoginUserDto = req.body;
  const user = await getUserByCredsOrThrow(email, password);
  req.session.user = user;

  res.json({
    user,
  });
}

export function logout(req: Request, res: Response, next: NextFunction) {
  req.session.destroy((err) => {
    if (err) {
      next(new InternalServerError());
    }
    res.clearCookie("connect.sid");
    res.json({
      messsage: "You have successfully logged out",
    });
  });
}
