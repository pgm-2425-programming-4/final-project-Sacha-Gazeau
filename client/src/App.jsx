import { useState } from "react";
import Sidebar from "./components/Sidebar";
import StatusBoard from "./components/StatusBoard";
import { PaginatedBacklog } from "./components/PaginatedBacklog";
import TopBar from "./components/TopBar";
import { TaskForm } from "./components/TaskForm"; // Importez le composant TaskForm

export default function App() {
  const [activeProject, setActiveProject] = useState("PGM3");
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleAddTask = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmitTask = (task) => {
    console.log("New Task:", task);
    // Ajoutez ici la logique pour envoyer la nouvelle tâche à votre API
  };

  const handleViewBacklog = () => {
    console.log("View backlog clicked");
    // Plus tard : afficher/masquer PaginatedBacklog avec un toggle
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
      {showForm && (
        <TaskForm onClose={handleCloseForm} onSubmit={handleSubmitTask} />
      )}
    </>
  );
}
