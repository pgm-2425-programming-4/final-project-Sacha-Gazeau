import { useEffect, useState } from "react";
import StatusBoard from "../components/StatusBoard";
import { TaskForm } from "../components/TaskForm";
import { API_URL, API_TOKEN } from "../constants/constants";
import { useQueryClient } from "@tanstack/react-query";
import TopBar from "../components/TopBar";
import { Outlet, useLocation } from "@tanstack/react-router";

export default function ProjectPage({ projectId }) {
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [notification, setNotification] = useState(null);
  const queryClient = useQueryClient();
  const location = useLocation();

  const params = /\/projects\/([^/]+)/.exec(location.pathname);
  const activeProject = params ? params[1].toUpperCase() : null;

  useEffect(() => {}, [projectId]);

  const handleCloseForm = () => setTaskToEdit(null);
  const handleAddTask = () => {
    setTaskToEdit({});
  };
  const handleSubmitTask = async (task) => {
    try {
      const taskId = task.documentId;
      const url = taskId ? `${API_URL}/tasks/${taskId}` : `${API_URL}/tasks`;
      const method = taskId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            title: task.title,
            description: task.description,
            task_types: task.task_types,
            state: task.state,
            project: task.project,
          },
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      setNotification({ type: "success", message: "✅ Taak opgeslagen!" });
    } catch (err) {
      console.error(err);
      setNotification({
        type: "error",
        message: "❌ Fout bij het opslaan",
      });
    } finally {
      handleCloseForm();
      queryClient.invalidateQueries(["tasks"]);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleDeleteTask = async (task) => {
    if (!task?.documentId) return;

    try {
      const res = await fetch(`${API_URL}/tasks/${task.documentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Fout bij het verwijderen van de taak: ${res.status} ${errorText}`
        );
      }

      setNotification({
        type: "success",
        message: "Taak succesvol verwijderd!",
      });
    } catch (err) {
      console.error("Error deleting task:", err);
      setNotification({
        type: "error",
        message: "Fout bij het verwijderen van de taak.",
      });
    } finally {
      handleCloseForm();
      queryClient.invalidateQueries(["tasks"]);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <>
      <header className="taskboard__header">
        <TopBar
          selectedLabel={selectedLabel}
          onLabelChange={setSelectedLabel}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddTask={handleAddTask}
          activeProject={activeProject}
        />
      </header>
      {/* Affiche StatusBoard seulement si on n'est pas sur /backlog */}
      {!location.pathname.endsWith("/backlog") && (
        <StatusBoard
          project={activeProject}
          selectedLabel={selectedLabel}
          searchTerm={searchTerm}
          onEditTask={setTaskToEdit}
        />
      )}
      {taskToEdit !== null && (
        <TaskForm
          task={taskToEdit}
          onClose={handleCloseForm}
          onSubmit={handleSubmitTask}
          onDelete={handleDeleteTask}
        />
      )}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <Outlet />
    </>
  );
}
