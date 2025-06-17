// pages/ProjectPage.jsx
import StatusBoard from "../components/StatusBoard";
import { useAppContext } from "../context/AppContext";

export default function ProjectPage() {
  const { selectedLabel, searchTerm, activeProject, setTaskToEdit } =
    useAppContext();

  return (
    <StatusBoard
      project={activeProject}
      selectedLabel={selectedLabel}
      searchTerm={searchTerm}
      onEditTask={setTaskToEdit}
    />
  );
}
