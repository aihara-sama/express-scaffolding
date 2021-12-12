import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import helmet from "helmet";
import { connect } from "mongoose";
import { routes } from "./routes";
import { globalErrorHandler } from "./controllers/error.controller";
import { catchAsync } from "./utils/catchAsync.util";
import { validator } from "./middlewares/validator.middleware";
import { AppError } from "./common/errors/app.error";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { errorLogger } from "./logs/loggers";

// Load env
dotenv.config();

// Express app
const app = express();

// Session store
const mongoStore = MongoStore.create({
  mongoUrl: process.env.DB_URI,
});

// Connect to database
connect(process.env.DB_URI)
  .then(() => {})
  .catch((err) => {
    errorLogger.error(err.message);
  });

// Keep a reference to the session store for a later use
app.set("mongoStore", mongoStore);

// Helmet adds security by setting various HTTP headers
app.use(helmet());

// Enable json parsing
app.use(express.json());

// Register session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: mongoStore,
  })
);

// Register routes
routes.map((route) =>
  app[route.method](
    route.path,
    validator(route.validationSchema),
    route.middlewares ? route.middlewares : [],
    catchAsync(route.handler)
  )
);

// Route not found handler
app.use("*", (req, res, next) => {
  next(
    new AppError(
      `Cannot ${req.method} ${req.path} on this server`,
      "No handler registered for this path",
      StatusCodes.NOT_FOUND,
      ReasonPhrases.NOT_FOUND
    )
  );
});

// Global error handler
app.use(globalErrorHandler);

export default app;
