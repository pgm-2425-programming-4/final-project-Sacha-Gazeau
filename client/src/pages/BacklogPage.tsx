import { useParams } from "@tanstack/react-router";

export function BacklogPage() {
  const { projectId } = useParams({ from: "/projects/$projectId/backlog" });

  return (
    <div>
      <h1>Backlog for Project ID: {projectId}</h1>
    </div>
  );
}
