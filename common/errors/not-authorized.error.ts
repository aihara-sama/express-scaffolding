import { AppError } from "./app.error";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export class NotAuthorizedError extends AppError {
  constructor() {
    const message = `You must log in first`;
    const details = "connect.sid cookie header is not present or has expired";
    const statusCode = StatusCodes.UNAUTHORIZED;
    const reasonPhrase = ReasonPhrases.UNAUTHORIZED;

    super(message, details, statusCode, reasonPhrase);
  }
}
