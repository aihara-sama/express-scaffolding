import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../common/errors/bad-request.error";
import { NotAuthorizedError } from "../common/errors/not-authorized.error";

export const isNotAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    return next(
      new BadRequestError(
        "You must be logged out",
        "connect.sid cookie header should not be present"
      )
    );
  }
  next();
};
