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
    <div className="topbar">
      <select
        className="topbar__select"
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
        className="topbar__search"
        placeholder="Search by title or description"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <button className="topbar__button" onClick={onAddTask}>
        Add new task
      </button>

      <button className="topbar__button" onClick={onViewBacklog}>
        View backlog
      </button>
    </div>
  );
}
