import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../common/errors/bad-request.error";
import Joi from "joi";

export const validator = (schema?: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!schema) {
      return next();
    }
    const { error } = schema.validate(req.body);
    if (error) return next(new BadRequestError(error.message));

    return next();
  };
};
