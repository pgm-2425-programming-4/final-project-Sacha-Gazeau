import { Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { TaskForm } from "../components/TaskForm";

export default function Layout() {
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [notification, setNotification] = useState(null);

  return (
    <>
      <aside className="sidebar">
        <Sidebar projects={["PGM3", "PGM4"]} />
      </aside>

      <main className="taskboard">
        <header className="taskboard__header">
          <TopBar
            selectedLabel={selectedLabel}
            onLabelChange={setSelectedLabel}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddTask={() => setTaskToEdit({})}
          />
        </header>

        <Outlet
          context={{
            selectedLabel,
            searchTerm,
            taskToEdit,
            setTaskToEdit,
            setSelectedLabel,
            setSearchTerm,
            setNotification,
          }}
        />
      </main>

      {taskToEdit !== null && (
        <TaskForm
          task={taskToEdit}
          onClose={() => setTaskToEdit(null)}
          // ajoute onSubmit, onDelete ici
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
