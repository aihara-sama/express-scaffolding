import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NODE_ENV } from "../common/enums/environment.enum";
import { AppError } from "../common/errors/app.error";
import { errorLogger } from "../logs/loggers";

export const globalErrorHandler = (
  err: AppError & { timestamp: Date },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  err.reasonPhrase = err.reasonPhrase || ReasonPhrases.INTERNAL_SERVER_ERROR;

  const error = { ...err };
  error.message = err.message;
  error.stack = err.stack;
  error.timestamp = new Date();

  const responseError =
    process.env.NODE_ENV === NODE_ENV.Development
      ? error
      : error.isOperational
      ? {
          reasonPhrase: error.reasonPhrase,
          statuscode: error.statusCode,
          message: error.message,
        }
      : { reasonPhrase: error.reasonPhrase, statuscode: error.statusCode };

  error.statusCode === StatusCodes.INTERNAL_SERVER_ERROR &&
    errorLogger.error(error.stack);

  res.status(error.statusCode).json(responseError);
};
