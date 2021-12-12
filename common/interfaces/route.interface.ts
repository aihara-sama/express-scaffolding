import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { HttpMethods } from "../enums/http-methods.enum";

export interface Route {
  path: string;
  method: HttpMethods;
  middlewares?: Array<
    (req: Request, res: Response, next: NextFunction) => Promise<void> | any
  >;
  validationSchema?: Joi.ObjectSchema;
  handler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> | any;
}
