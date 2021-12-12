import { AppError } from "./app.error";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export class InternalServerError extends AppError {
  constructor() {
    const message = "Something went very wrong";
    const details = "There wan an unknown error on the server";
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    const reasonPhrase = ReasonPhrases.INTERNAL_SERVER_ERROR;

    super(message, details, statusCode, reasonPhrase);
  }
}
