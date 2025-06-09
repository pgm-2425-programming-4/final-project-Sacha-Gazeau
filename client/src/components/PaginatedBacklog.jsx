import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Backlog from "./Backlog";
import { Pagination } from "./Pagination";
import { API_TOKEN, API_URL } from "../constants/constants";

export function PaginatedBacklog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["backlogTasks", currentPage, pageSize],
    queryFn: async () => {
      const res = await fetch(
        `${API_URL}/tasks?populate=*&pagination[page]=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      return res.json();
    },
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading tasks.</p>;

  const tasks = data.data;
  const pageCount = data.meta.pagination.pageCount;
  console.log(data.data);
  return (
    <>
      <h2>Backlog taken</h2>
      <Backlog tasks={tasks} />
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChanged={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1); // reset to page 1 when size changes
        }}
      />
    </>
  );
}
