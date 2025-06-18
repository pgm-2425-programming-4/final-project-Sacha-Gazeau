import { useParams } from "@tanstack/react-router";
import { PaginatedBacklog } from "../components/PaginatedBacklog";

export default function BacklogPage() {
  const { projectId } = useParams({ from: "/projects/$projectId/backlog" });
  console.log("Project ID:", projectId); // Ajoutez ce log pour vérifier le projectId

  return <PaginatedBacklog projectId={projectId} />;
}
