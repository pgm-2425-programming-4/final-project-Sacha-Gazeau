// routes/projects/$projectId.tsx
import Project from "../../pages/ProjectPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/$projectId")({
  component: Project,
});
