import { useContext } from "react";
import StatusBoard from "../components/StatusBoard";
import { AppContext } from "../context/AppContext.jsx";

export default function ProjectPage() {
  const { selectedLabel, searchTerm, setTaskToEdit } = useContext(AppContext);

  return (
    <StatusBoard
      project={null} // ou activeProject si tu veux le passer, à gérer
      selectedLabel={selectedLabel}
      searchTerm={searchTerm}
      onEditTask={setTaskToEdit}
    />
  );
}
