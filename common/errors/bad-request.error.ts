import { AppError } from "./app.error";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export class BadRequestError extends AppError {
  constructor(message: string, details: string = "") {
    const statusCode = StatusCodes.BAD_REQUEST;
    const reasonPhrase = ReasonPhrases.BAD_REQUEST;

    super(message, details, statusCode, reasonPhrase);
  }
}
