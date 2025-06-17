import { useOutletContext } from "@tanstack/react-router";
import { StatusColumn } from "./StatusColumn";

export default function StatusBoard({ project, onEditTask }) {
  const { selectedLabel, searchTerm } = useOutletContext();
  const statuses = ["To do", "In progress", "Ready for review", "Done"];

  return (
    <div className="taskboard__columns">
      {statuses.map((status) => (
        <StatusColumn
          key={status}
          status={status}
          project={project}
          selectedLabel={selectedLabel}
          searchTerm={searchTerm}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
}
