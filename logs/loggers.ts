import { createLogger, transports, format } from "winston";
const { combine, timestamp, printf } = format;

const dirname = __dirname;
const customFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] [${level}]: ${message}`;
});

export const errorLogger = createLogger({
  format: combine(timestamp(), customFormat),
  transports: [
    new transports.File({
      filename: "errors.log",
      dirname,
    }),
    new transports.Console(),
  ],
});
export const infoLogger = createLogger({
  format: combine(timestamp(), customFormat),
  transports: [
    new transports.File({
      filename: "info.log",
      dirname,
    }),
    new transports.Console(),
  ],
});
