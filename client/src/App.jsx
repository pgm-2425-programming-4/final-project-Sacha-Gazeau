import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import StatusBoard from "./components/StatusBoard";
import { PaginatedBacklog } from "./components/PaginatedBacklog";
import TopBar from "./components/TopBar";
import { TaskForm } from "./components/TaskForm";
import { API_URL, API_TOKEN } from "./constants/constants";
import { useQueryClient } from "@tanstack/react-query";
import { Home } from "./components/Home";
import { About } from "./components/About";

export default function App() {
  const [activeProject, setActiveProject] = useState("PGM3");
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showBacklog, setShowBacklog] = useState(false);
  const queryClient = useQueryClient();

  const handleAddTask = () => {
    setTaskToEdit({});
  };

  const handleCloseForm = () => {
    setTaskToEdit(null);
  };

  const handleSubmitTask = async (task) => {
    const taskId = task.id;
    const method = taskId ? "PUT" : "POST";
    const url = taskId ? `${API_URL}/tasks/${taskId}` : `${API_URL}/tasks`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            title: task.title,
            task_types: task.task_types,
            state: task.state,
            project: task.project,
          },
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Failed to ${taskId ? "update" : "create"} task: ${res.status} ${errorText}`
        );
      }

      await res.json();
      setNotification({ type: "success", message: "✅ Tâche enregistrée !" });
    } catch {
      setNotification({
        type: "error",
        message: "❌ Erreur lors de l'enregistrement",
      });
    } finally {
      handleCloseForm();
      queryClient.invalidateQueries(["tasks"]);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <Router>
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
            onViewBacklog={() => setShowBacklog((prev) => !prev)}
          />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/projects/:id"
            element={
              showBacklog ? (
                <PaginatedBacklog
                  activeProject={activeProject}
                  onEditTask={setTaskToEdit}
                />
              ) : (
                <StatusBoard
                  project={activeProject}
                  selectedLabel={selectedLabel}
                  searchTerm={searchTerm}
                  onEditTask={setTaskToEdit}
                />
              )
            }
          />
          <Route
            path="/projects/:id/backlog"
            element={
              <PaginatedBacklog
                activeProject={activeProject}
                onEditTask={setTaskToEdit}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      {taskToEdit !== null && (
        <TaskForm
          task={taskToEdit}
          onClose={handleCloseForm}
          onSubmit={handleSubmitTask}
        />
      )}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </Router>
  );
}
