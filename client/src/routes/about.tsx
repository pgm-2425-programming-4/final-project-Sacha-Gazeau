import { Route } from "@tanstack/react-router";
import { rootRoute } from './__root';
import { About } from "../pages/About";


export const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
