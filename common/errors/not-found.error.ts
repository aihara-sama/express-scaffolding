import { AppError } from "./app.error";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export class NotFoundError extends AppError {
  constructor(record: string = "Record", details: string = "") {
    const message = `${record} not found`;
    const statusCode = StatusCodes.NOT_FOUND;
    const reasonPhrase = ReasonPhrases.NOT_FOUND;

    super(message, details, statusCode, reasonPhrase);
  }
}
