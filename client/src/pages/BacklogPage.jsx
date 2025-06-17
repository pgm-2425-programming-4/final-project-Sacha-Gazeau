import { PaginatedBacklog } from "../components/PaginatedBacklog";
import { useOutletContext } from "@tanstack/react-router";

export default function BacklogPage() {
  const { activeProject, setTaskToEdit } = useOutletContext();

  return (
    <PaginatedBacklog
      activeProject={activeProject}
      onEditTask={setTaskToEdit}
    />
  );
}
