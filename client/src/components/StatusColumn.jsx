import { useQuery } from "@tanstack/react-query";
import { API_URL, API_TOKEN } from "../constants/constants";

export function StatusColumn({ status, project, selectedLabel, searchTerm }) {
  const fetchTasks = async () => {
    const url = `${API_URL}/tasks?filters[project][$eq]=${encodeURIComponent(
      project
    )}&populate=*`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Fetch failed:", res.status, errorText);
      throw new Error("Failed to fetch tasks");
    }

    const data = await res.json();
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", project, status],
    queryFn: fetchTasks,
  });

  const tasks = data?.data || [];

  const filteredTasks = tasks
    .filter((task) => {
      const stateName = task?.state?.name;
      return stateName?.toLowerCase() === status.toLowerCase();
    })
    .filter((task) => {
      const title = task.Title?.toLowerCase() || "";
      const description = task.Description?.toLowerCase() || "";
      const labels = task.labels || [];

      const matchesSearch =
        !searchTerm ||
        title.includes(searchTerm.toLowerCase()) ||
        description.includes(searchTerm.toLowerCase());

      const matchesLabel =
        selectedLabel === "All" ||
        labels.some(
          (l) => l?.label?.toLowerCase?.() === selectedLabel.toLowerCase()
        );

      return matchesSearch && matchesLabel;
    });

  return (
    <section className="taskboard__column">
      <h3 className="taskboard__title">{status}</h3>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading tasks.</p>}
      {!isLoading && !isError && filteredTasks.length === 0 && <p>No tasks</p>}

      {filteredTasks.map((task) => {
        const labels = task.labels || [];

        return (
          <div key={task.id} className="taskcard">
            <p className="taskcard__title">{task.Title}</p>
            <div className="taskcard__label">
              {labels.map((l) => {
                const name = l.label;
                const icons = {
                  "Front-end": "🎨",
                  "Back-end": "🧠",
                  "Infra": "🛠️",
                  "Documentation": "📄",
                };

                return (
                  <span key={l.id} className="task__label">
                    {icons[name] || "🏷️"} {name}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
