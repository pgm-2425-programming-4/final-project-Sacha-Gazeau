// src/components/PaginatedBacklog.jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const PaginatedBacklog = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["backlog", page],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:1337/api/tasks?pagination[page]=${page}&pagination[pageSize]=10&filters[status][name][$eq]=Backlog`
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Laden...</p>;
  if (isError) return <p>Fout bij het laden</p>;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Taak</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((task) => (
            <tr key={task.id}>
              <td>{task.attributes.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
        Vorige
      </button>
      <span> Pagina {page} </span>
      <button onClick={() => setPage((p) => p + 1)}>Volgende</button>
    </>
  );
};

export default PaginatedBacklog;
