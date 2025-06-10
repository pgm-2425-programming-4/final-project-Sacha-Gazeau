import { useState } from "react";
import Sidebar from "./components/Sidebar";
import StatusBoard from "./components/StatusBoard";
import { PaginatedBacklog } from "./components/PaginatedBacklog";
import TopBar from "./components/TopBar";

export default function App() {
  const [activeProject, setActiveProject] = useState("PGM3");
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddTask = () => {
    console.log("Add task clicked");
    // Later: open form
  };

  const handleViewBacklog = () => {
    console.log("View backlog clicked");
    // Later: show/hide PaginatedBacklog with a toggle
  };

  return (
    <>
      <aside className="sidebar">
        <Sidebar
          projects={["PGM3", "PGM4"]}
          activeProject={activeProject}
          onProjectSelect={setActiveProject}
        />
      </aside>
      <main className="taskboard">
        <header className="taskboard__header">
          <TopBar
            selectedLabel={selectedLabel}
            onLabelChange={setSelectedLabel}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddTask={handleAddTask}
            onViewBacklog={handleViewBacklog}
          />
        </header>
        <div className="taskboard__columns">
          <StatusBoard
            project={activeProject}
            selectedLabel={selectedLabel}
            searchTerm={searchTerm}
          />
        </div>
      </main>
    </>
  );
}
