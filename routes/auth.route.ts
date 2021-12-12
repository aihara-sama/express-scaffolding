import { HttpMethods } from "../common/enums/http-methods.enum";
import { Route } from "../common/interfaces/route.interface";
import { login, logout, register } from "../controllers/auth.controller";
import { isNotAuth } from "../middlewares/is-not-auth.middleware";
import { isAuth } from "../middlewares/is-auth.middleware";
import { loginSchema, registerSchema } from "../validation/auth.validation";

export const authRoutes: Route[] = [
  {
    path: "/auth/register",
    method: HttpMethods.Post,
    handler: register,
    validationSchema: registerSchema,
    middlewares: [isNotAuth],
  },
  {
    path: "/auth/login",
    method: HttpMethods.Post,
    handler: login,
    validationSchema: loginSchema,
    middlewares: [isNotAuth],
  },
  {
    path: "/auth/logout",
    method: HttpMethods.All,
    handler: logout,
    middlewares: [isAuth],
  },
];
