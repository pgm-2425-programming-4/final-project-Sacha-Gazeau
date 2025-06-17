import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Backlog from "../../components/Backlog";
import { API_URL, API_TOKEN } from "../../constants/constants";

export const Route = createFileRoute("/projects/$projectId/backlog")({
  component: BacklogPage,
});

function BacklogPage() {
  const { projectId } = Route.useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch(
        `${API_URL}/tasks?filters[project][id][$eq]=${projectId}&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      const json = await res.json();
      setTasks(json.data);
    }

    fetchTasks();
  }, [projectId]);

  return <Backlog tasks={tasks} />;
}
