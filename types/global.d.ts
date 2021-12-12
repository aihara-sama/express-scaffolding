import { IUser } from "../common/interfaces/user.interface";

declare module "express-session" {
  interface SessionData {
    user: IUser;
  }
}
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    DB_URI: string;
    PORT: string;
    SESSION_SECRET: string;
  }
}
