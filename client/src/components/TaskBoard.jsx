export const TaskBoard = ({ tasks }) => {
  // Obtenir les states uniques présents dans les tâches
  const states = [...new Set(tasks.map((task) => task.state))];

  return (
    <main className="taskboard">
      <div className="taskboard__columns">
        {states.map((state) => (
          <section
            key={state}
            className={`taskboard__column taskboard__column--${state
              .toLowerCase()
              .replaceAll(" ", "")}`}
          >
            <h3 className="taskboard__title">{state}</h3>
            {tasks
              .filter((task) => task.state === state)
              .map((task) => (
                <div key={task.id} className="taskcard">
                  <p className="taskcard__title">{task.title}</p>
                  <span className="taskcard__label taskcard__label--default">
                    {task.task_types || "No category"}
                  </span>
                </div>
              ))}
          </section>
        ))}
      </div>
    </main>
  );
};
