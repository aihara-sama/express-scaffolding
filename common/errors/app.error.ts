import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class AppError extends Error {
  message: string;
  details: string;
  isOperational: boolean;
  statusCode: StatusCodes;
  reasonPhrase: ReasonPhrases;

  constructor(
    message: string,
    details: string,
    statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
    reasonPhrase: ReasonPhrases = ReasonPhrases.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.message = message;
    this.details = details;
    this.isOperational = true;
    this.statusCode = statusCode;
    this.reasonPhrase = reasonPhrase;
  }
}
