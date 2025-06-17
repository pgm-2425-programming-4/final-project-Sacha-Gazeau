import { Route } from "@tanstack/react-router";
import { projectRoute } from "./$projectId";
import { BacklogPage } from "../../pages/BacklogPage";

export const backlogRoute = new Route({
  getParentRoute: () => projectRoute,
  path: "/backlog",
  component: BacklogPage,
});
