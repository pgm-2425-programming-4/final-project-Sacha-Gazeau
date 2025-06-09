export default function Sidebar({ projects, activeProject, onProjectSelect }) {
  return (
    <div className="sidebar">
      <h4 className="sidebar__title">PROJECTS</h4>
      <ul className="sidebar__list">
        {projects.map((project) => {
          let className = "sidebar__item";
          if (project === activeProject) {
            className += " active";
          }

          return (
            <li
              key={project}
              className={className}
              onClick={() => onProjectSelect(project)}
            >
              {project}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
