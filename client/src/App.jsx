import { useState } from "react";
import Sidebar from "./components/Sidebar";
import StatusBoard from "./components/StatusBoard";
import { PaginatedBacklog } from "./components/PaginatedBacklog";
import TopBar from "./components/TopBar";
import { TaskForm } from "./components/TaskForm";
import { API_URL, API_TOKEN } from "./constants/constants";
import { useQueryClient } from "@tanstack/react-query";

export default function App() {
  const [activeProject, setActiveProject] = useState("PGM3");
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [notification, setNotification] = useState(null);
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

    console.log(`Submitting ${method} request to URL: ${url}`);

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

      const data = await res.json();
      console.log(`✅ Task ${taskId ? "updated" : "created"}:`, data);

      // ✅ Notification succès
      setNotification({ type: "success", message: "✅ Tâche enregistrée !" });
    } catch (err) {
      console.error("❌ Error submitting task:", err);

      // ❌ Notification erreur
      setNotification({
        type: "error",
        message: "❌ Erreur lors de l'enregistrement",
      });
    } finally {
      handleCloseForm();
      queryClient.invalidateQueries(["tasks"]);

      // ⏱️ Cache la notif après 3 secondes
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleViewBacklog = () => {
    console.log("View backlog clicked");
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
            onEditTask={setTaskToEdit}
          />
        </div>
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
    </>
  );
}
