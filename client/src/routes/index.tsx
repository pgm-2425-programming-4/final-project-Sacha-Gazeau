import { Route } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { Home } from "../pages/Home.tsx";

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
