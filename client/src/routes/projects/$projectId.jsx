import { createFileRoute } from "@tanstack/react-router";
import ProjectPage from "../../pages/ProjectPage";
import Layout from "../../pages/Layout";

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectPageWithParams,
  Layout,
});

function ProjectPageWithParams() {
  // Utilisez useParams pour obtenir les paramètres de l'URL
  const { projectId } = Route.useParams();

  return <ProjectPage projectId={projectId} />;
}
