import { useState, useEffect } from "react";
import { API_URL, API_TOKEN } from "../constants/constants";

export function TaskForm({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [taskTypes, setTaskTypes] = useState([]);
  const [selectedTaskTypes, setSelectedTaskTypes] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  // fetch relations
  useEffect(() => {
    async function fetchData(endpoint, setter, label) {
      const res = await fetch(`${API_URL}/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      const json = await res.json();
      console.log(`${label}:`, json); // 👈 Ajoute ça
      setter(json.data);
    }

    fetchData("task-types", setTaskTypes, "Task Types");
    fetchData("states", setStates, "States");
    fetchData("projects", setProjects, "Projects");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      task_types: selectedTaskTypes,
      state: selectedState,
      project: selectedProject,
    });
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          {/* TITLE */}
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          {/* TASK TYPES MULTI-SELECT */}
          <label>
            Task Types:
            <select
              multiple
              value={selectedTaskTypes}
              onChange={(e) =>
                setSelectedTaskTypes(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
            >
              {taskTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name || "Unnamed"}
                </option>
              ))}
            </select>
          </label>

          {/* STATE */}
          <label>
            State:
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">-- Select a state --</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.title || "Untitled"}
                </option>
              ))}
            </select>
          </label>

          {/* PROJECT */}
          <label>
            Project:
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">-- Select a project --</option>
              {projects.map((proj) => (
                <option key={proj.id} value={proj.id}>
                  {proj.Name || "Unnamed"}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
