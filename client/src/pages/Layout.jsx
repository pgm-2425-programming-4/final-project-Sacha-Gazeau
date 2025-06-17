import { Outlet, useLocation } from "@tanstack/react-router";
import { useContext } from "react";
import { Sidebar } from "../components/Sidebar";
import Topbar from "../components/TopBar";
import TaskForm from "../components/TaskForm";
import { API_URL, API_TOKEN } from "../constants/constants";
import { useQueryClient } from "@tanstack/react-query";
import { AppProvider, AppContext } from "../context/AppContext.jsx";

function LayoutContent() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const {
    selectedLabel,
    setSelectedLabel,
    searchTerm,
    setSearchTerm,
    taskToEdit,
    setTaskToEdit,
    notification,
    setNotification,
  } = useContext(AppContext);

  const params = /\/projects\/([^/]+)/.exec(location.pathname);
  const activeProject = params ? params[1].toUpperCase() : null;

  const handleCloseForm = () => setTaskToEdit(null);

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

  const handleAddTask = () => setTaskToEdit({});

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
      <aside className="sidebar">
        <Sidebar projects={["PGM3", "PGM4"]} onProjectSelect={() => {}} />
      </aside>

      <main className="taskboard">
        <header className="taskboard__header">
          <Topbar
            selectedLabel={selectedLabel}
            onLabelChange={setSelectedLabel}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddTask={handleAddTask}
            activeProject={activeProject}
          />
        </header>

        <Outlet
          context={{ activeProject, selectedLabel, searchTerm, setTaskToEdit }}
        />
      </main>

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
    </>
  );
}

export default function Layout() {
  return (
    <AppProvider>
      <LayoutContent />
    </AppProvider>
  );
}
