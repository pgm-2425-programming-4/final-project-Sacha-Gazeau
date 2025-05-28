// src/components/PaginatedBacklog.jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { API_URL, API_TOKEN } from "../constants/constants";
import { TaskBoard } from "./TaskBoard";

const PaginatedBacklog = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["backlog", page],
    queryFn: async () => {
      const res = await axios.get(
        `${API_URL}/tasks?pagination[page]=1&pagination[pageSize]=10`,
        {
          headers: {
            Authorization: API_TOKEN,
          },
        }
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Laden...</p>;
  if (isError) return <p>Fout bij het laden</p>;

  const tasks = data.data;

  return (
    <>
      <TaskBoard tasks={tasks} />

      <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
        Vorige
      </button>
      <span> Pagina {page} </span>
      <button onClick={() => setPage((p) => p + 1)}>Volgende</button>
    </>
  );
};

export default PaginatedBacklog;
