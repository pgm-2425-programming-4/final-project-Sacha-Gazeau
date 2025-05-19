import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBacklog = async (page = 1, pageSize = 10) => {
  const res = await axios.get(`http://localhost:1337/api/tasks`, {
    params: {
      "filters[status][name][$eq]": "Backlog",
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
      populate: "*",
    },
  });
  return res.data;
};

export default function PaginatedBacklog() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["backlog"],
    queryFn: () => fetchBacklog(1),
  });

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur lors du chargement des tâches.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Tâche</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        {data.data.map((task) => (
          <tr key={task.id}>
            <td>{task.attributes.title}</td>
            <td>{task.attributes.status.data.attributes.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
