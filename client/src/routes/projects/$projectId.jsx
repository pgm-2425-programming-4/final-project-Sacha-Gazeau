import { useParams } from "@tanstack/react-router";
import ProjectPage from "../../pages/ProjectPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/$projectId")({
  component: () => {
    const { projectId } = useParams({ from: "/projects/$projectId" }); // Correct
    return <ProjectPage projectId={projectId} />;
  },
});
