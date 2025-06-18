export default function Backlog({ tasks }) {
  return (
    <div className="backlog">
      <table className="backlog__table">
        <thead className="backlog__thead">
          <tr className="backlog__header-row">
            <th className="backlog__header">Title</th>
            <th className="backlog__header">Description</th>
            <th className="backlog__header">Deadline</th>
            <th className="backlog__header">Status</th>
          </tr>
        </thead>
        <tbody className="backlog__tbody">
          {tasks.map((task) => (
            <tr key={task.id} className="backlog__row">
              <td className="backlog__cell">{task.title}</td>
              <td className="backlog__cell">{task.description || "-"}</td>
              <td className="backlog__cell">
                {task.publishedAt
                  ? new Date(task.publishedAt).toLocaleDateString()
                  : "-"}
              </td>
              <td className="backlog__cell">{task.state?.title || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
