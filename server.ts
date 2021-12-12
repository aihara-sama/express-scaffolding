import { errorLogger, infoLogger } from "./logs/loggers";
import app from "./app";

const server = app.listen(process.env.PORT, () => {
  infoLogger.info(`Listening on port: ${process.env.PORT}`);
});

process.on("uncaughtException", (err) => {
  errorLogger.error(err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err: Error) => {
  errorLogger.error(err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  process.exit(0);
});
process.on("SIGINT", () => {
  process.exit(0);
});

export default server;
