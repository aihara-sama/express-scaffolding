import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../common/errors/not-authorized.error";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    return next(new NotAuthorizedError());
  }
  next();
};
