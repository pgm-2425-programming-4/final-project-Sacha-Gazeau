import { Link } from "@tanstack/react-router";

export function Sidebar({ projects, onProjectSelect }) {
  return (
    <nav>
      <Link className="sidebar__item" to="/">
        Home
      </Link>
      <h2 className="sidebar__title">PROJECTS</h2>
      <ul className="sidebar__list">
        {projects.map((project) => (
          <li key={project} onClick={() => onProjectSelect(project)}>
            <Link
              className={({ isActive }) =>
                "sidebar__item" + (isActive ? " active" : "")
              }
              to={`/projects/${project}`}
            >
              {project}
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="sidebar__title">INFO</h2>
      <Link className="sidebar__item" to="/about">
        About
      </Link>
    </nav>
  );
}
