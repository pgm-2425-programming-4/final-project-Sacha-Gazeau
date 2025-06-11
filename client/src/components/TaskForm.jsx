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
    async function fetchData(endpoint, setter) {
      const res = await fetch(`${API_URL}/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      const json = await res.json();
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
      task_types: selectedTaskTypes.map((id) => ({ id })), // transforme en objets
      state: { id: Number(selectedState) },
      project: { id: Number(selectedProject) },
    });
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup__inner">
        <h2>Add New Task</h2>
        <form className="popup__container" onSubmit={handleSubmit}>
          <div className="popup__block">
            <div className="popup__content">
              <label className="popup__item">
                Title:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>

              <label className="popup__item">
                Task Types:
                <div className="popup__checkbox-group">
                  {taskTypes.map((type) => (
                    <label key={type.id} className="popup__checkbox-item">
                      <input
                        type="checkbox"
                        value={type.id}
                        checked={selectedTaskTypes.includes(type.id)}
                        onChange={(e) => {
                          const id = Number(e.target.value);
                          if (e.target.checked) {
                            setSelectedTaskTypes((prev) => [...prev, id]);
                          } else {
                            setSelectedTaskTypes((prev) =>
                              prev.filter((tid) => tid !== id)
                            );
                          }
                        }}
                      />
                      {type.name || "Unnamed"}
                    </label>
                  ))}
                </div>
              </label>
            </div>
            <div className="popup__content">
              <label className="popup__item">
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

              <label className="popup__item">
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
            </div>
          </div>
          <div className="popup__btn">
            <button type="submit" className="submit">
              Submit
            </button>
            <button type="button" className="close" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
