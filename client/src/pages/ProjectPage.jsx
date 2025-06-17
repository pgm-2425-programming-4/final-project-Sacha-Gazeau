import { useEffect, useState } from "react";
import StatusBoard from "../components/StatusBoard";

export default function ProjectPage({ projectId }) {
  const [selectedLabel] = useState("All");
  const [searchTerm] = useState("");

  useEffect(() => {
  }, [projectId]);

  return (
    <StatusBoard
      project={projectId}
      selectedLabel={selectedLabel}
      searchTerm={searchTerm}
      onEditTask={() => {}}
    />
  );
}
