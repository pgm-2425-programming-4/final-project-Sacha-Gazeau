import { StatusColumn } from "./StatusColumn";

export default function StatusBoard({ project, selectedLabel, searchTerm }) {
  const statuses = ["To-do", "In progress", "Ready for review", "Done"];

  return (
    <>
      {statuses.map((status) => (
        <StatusColumn
          key={status}
          status={status}
          project={project}
          selectedLabel={selectedLabel}
          searchTerm={searchTerm}
        />
      ))}
    </>
  );
}
