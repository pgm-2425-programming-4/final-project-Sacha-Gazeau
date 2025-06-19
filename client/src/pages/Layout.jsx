import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components/Sidebar";
export default function Layout() {

  const params = /\/projects\/([^/]+)/.exec(location.pathname);
  const activeProject = params ? params[1].toUpperCase() : null;
  return (
    <>
      <aside className="sidebar">
        <Sidebar projects={["PGM3", "PGM4"]} activeProject={activeProject} />
      </aside>

      <main className="taskboard">
        {/* Passer les états et setters via context à Outlet */}
        <Outlet
        />
      </main>
    </>
  );
}
