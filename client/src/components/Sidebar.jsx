import { NavLink } from "react-router-dom";

export function Sidebar({ projects, onProjectSelect }) {
  return (
    <nav>
      <NavLink className="sidebar__item" to="/" end>
        Home
      </NavLink>
      <h2 className="sidebar__title">PROJECTS</h2>
      <ul className="sidebar__list">
        {projects.map((project) => (
          <li key={project} onClick={() => onProjectSelect(project)}>
            <NavLink
              className={({ isActive }) =>
                "sidebar__item" + (isActive ? " active" : "")
              }
              to={`/projects/${project}`}
            >
              {project}
            </NavLink>
          </li>
        ))}
      </ul>
      <h2 className="sidebar__title">INFO</h2>
      <NavLink className="sidebar__item" to="/about">
        About
      </NavLink>
    </nav>
  );
}
