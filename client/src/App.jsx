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
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleAddTask = () => {
    setTaskToEdit({});
  };

  const handleCloseForm = () => {
    setTaskToEdit(null);
  };

  const handleSubmitTask = async (task) => {
    const method = task.id ? "PUT" : "POST";
    const url = task.id ? `${API_URL}/tasks/${task.id}` : `${API_URL}/tasks`;

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

      if (!res.ok)
        throw new Error(`Failed to ${task.id ? "update" : "create"} task`);
      const data = await res.json();
      console.log(`✅ Task ${task.id ? "updated" : "created"}:`, data);
    } catch (err) {
      console.error("❌ Error submitting task:", err);
    } finally {
      handleCloseForm();
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
    </>
  );
}
