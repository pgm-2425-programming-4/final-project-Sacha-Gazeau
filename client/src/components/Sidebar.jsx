import { Link, useLocation } from "@tanstack/react-router";

export function Sidebar({ projects, onProjectSelect }) {
  const location = useLocation();

  return (
    <nav>
      <Link
        className={location.pathname === "/" ? "sidebar__item active" : "sidebar__item"}
        to="/"
      >
        Home
      </Link>

      <h2 className="sidebar__title">PROJECTS</h2>
      <ul className="sidebar__list">
        {projects.map((project) => {
          const isActive = location.pathname === `/projects/${project}`;
          return (
            <li key={project}>
              <Link
                className={"sidebar__item" + (isActive ? " active" : "")}
                to={`/projects/${project}`}
                onClick={() => onProjectSelect(project)}
              >
                {project}
              </Link>
            </li>
          );
        })}
      </ul>

      <h2 className="sidebar__title">INFO</h2>
      <Link
        className={location.pathname === "/about" ? "sidebar__item active" : "sidebar__item"}
        to="/about"
      >
        About
      </Link>
    </nav>
  );
}
