export function Sidebar({ projects, onProjectSelect }) {
  return (
    <nav>
      <a className="sidebar__item" to="/" end>
        Home
      </a>
      <h2 className="sidebar__title">PROJECTS</h2>
      <ul className="sidebar__list">
        {projects.map((project) => (
          <li key={project} onClick={() => onProjectSelect(project)}>
            <a
              className={({ isActive }) =>
                "sidebar__item" + (isActive ? " active" : "")
              }
              to={`/projects/${project}`}
            >
              {project}
            </a>
          </li>
        ))}
      </ul>
      <h2 className="sidebar__title">INFO</h2>
      <a className="sidebar__item" to="/about">
        About
      </a>
    </nav>
  );
}
