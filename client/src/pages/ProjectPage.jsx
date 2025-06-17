// pages/ProjectPage.jsx
import { useState } from "react";
import StatusBoard from "../components/StatusBoard";

export default function ProjectPage() {
  const [selectedLabel] = useState("All");
  const [searchTerm] = useState("");

  const params = /\/projects\/([^/]+)/.exec(window.location.pathname);
  const activeProject = params ? params[1].toUpperCase() : null;

  return (
    <StatusBoard
      project={activeProject}
      selectedLabel={selectedLabel}
      searchTerm={searchTerm}
      onEditTask={() => {}} // Passer une fonction vide si nécessaire
    />
  );
}
