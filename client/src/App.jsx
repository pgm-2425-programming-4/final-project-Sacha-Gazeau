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
    <div className="app-layout">
      <Sidebar
        projects={["PGM3", "PGM4"]}
        activeProject={activeProject}
        onProjectSelect={setActiveProject}
      />

      <div className="main-content">
        <TopBar
          selectedLabel={selectedLabel}
          onLabelChange={setSelectedLabel}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddTask={handleAddTask}
          onViewBacklog={handleViewBacklog}
        />

        <StatusBoard
          project={activeProject}
          selectedLabel={selectedLabel}
          searchTerm={searchTerm}
        />

        {/* <PaginatedBacklog project={activeProject} /> */}
      </div>
    </div>
  );
}
