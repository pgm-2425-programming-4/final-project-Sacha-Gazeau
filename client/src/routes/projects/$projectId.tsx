import { Route } from "@tanstack/react-router";
import { rootRoute } from "../__root"; // Assurez-vous que le chemin d'importation est correct
import { ProjectPage } from "../../pages/ProjectPage";

export const projectRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/projects/$projectId",
  component: ProjectPage,
});
