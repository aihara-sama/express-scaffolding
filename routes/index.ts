import { Route } from "../common/interfaces/route.interface";
import { authRoutes } from "./auth.route";

export const routes: Route[] = [...authRoutes];
