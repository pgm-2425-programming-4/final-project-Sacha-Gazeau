import { useParams } from "@tanstack/react-router";

export function ProjectPage() {
  const { projectId } = useParams({ from: "/projects/$projectId" });

  return (
    <div>
      <h1>Project Board for Project ID: {projectId}</h1>
    </div>
  );
}
