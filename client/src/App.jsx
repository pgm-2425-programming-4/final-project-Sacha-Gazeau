import { useState } from "react";
import Sidebar from "./components/Sidebar";
import StatusBoard from "./components/StatusBoard";
import { PaginatedBacklog } from "./components/PaginatedBacklog";
import TopBar from "./components/TopBar";
import { TaskForm } from "./components/TaskForm";
import { API_URL, API_TOKEN } from "./constants/constants";

export default function App() {
  const [activeProject, setActiveProject] = useState("PGM3");
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null); // null = fermé

  // Ouvrir le formulaire pour ajouter une tâche
  const handleAddTask = () => {
    setTaskToEdit({}); // objet vide = ajout
  };

  // Fermer le formulaire
  const handleCloseForm = () => {
    setTaskToEdit(null);
  };

  // Soumettre tâche (ajout ou modification plus tard)
  const handleSubmitTask = async (task) => {
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            title: task.title,
            task_types: {
              connect: task.task_types.map((t) => ({
                id: typeof t === "object" ? t.id : t,
              })),
            },
            state: {
              connect: [
                {
                  id:
                    typeof task.state === "object" ? task.state.id : task.state,
                },
              ],
            },
            project: {
              connect: [
                {
                  id:
                    typeof task.project === "object"
                      ? task.project.id
                      : task.project,
                },
              ],
            },
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to create task");
      const data = await res.json();
      console.log("✅ Task created:", data);
    } catch (err) {
      console.error("❌ Error submitting task:", err);
    } finally {
      setTaskToEdit(null); // Fermer le formulaire
    }
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
            onEditTask={(task) => setTaskToEdit(task)} // ✅ édition
          />
        </div>
      </main>

      {taskToEdit && (
        <TaskForm
          task={taskToEdit} // null = ajout | objet = édition
          onClose={handleCloseForm}
          onSubmit={handleSubmitTask}
        />
      )}
    </>
  );
}
