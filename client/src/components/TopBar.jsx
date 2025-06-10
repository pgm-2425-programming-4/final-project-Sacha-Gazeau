export default function Topbar({
  selectedLabel,
  onLabelChange,
  searchTerm,
  onSearchChange,
  onAddTask,
  onViewBacklog,
}) {
  const labels = ["All", "Front-end", "Back-end", "Infra", "Documentation"];

  return (
    <>
      <div className="taskboard__filters">
        <select
          className="taskboard__select"
          value={selectedLabel}
          onChange={(e) => onLabelChange(e.target.value)}
        >
          {labels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="taskboard__search"
          placeholder="Search title or description"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="taskboard__actions">
        <button className="btn btn--add" onClick={onAddTask}>
          Add new task
        </button>
        <button className="btn btn--backlog" onClick={onViewBacklog}>
          View backlog
        </button>
      </div>
    </>
  );
}
