import { NextFunction, Request, Response } from "express";
import { AppError } from "../common/errors/app.error";

export const catchAsync =
  (cb) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.resolve(cb(req, res, next));
    } catch (error) {
      return next(error);
    }
  };
