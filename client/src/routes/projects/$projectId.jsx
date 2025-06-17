// routes/projects/$projectId.tsx
import ProjectPage from "../../pages/ProjectPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectPage,
});
