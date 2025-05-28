export const TaskBoard = ({ tasks }) => {
  const states = ["To do", "In progress", "Ready for review", "Done"];

  return (
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
                  <span
                    className={`taskcard__label taskcard__label--${(
                      task.category || "default"
                    ).toLowerCase()}`}
                  >
                    {task.category || "No category"}
                  </span>
                </div>
              ))}
          </section>
        ))}
      </div>
  );
};
