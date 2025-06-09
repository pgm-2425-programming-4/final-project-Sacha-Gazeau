export const TaskBoard = ({ tasks }) => {
  const states = [...new Set(tasks.data.map((task) => task.state?.title))];

  return (
    <main className="taskboard">
      <div className="taskboard__columns">
        {states.map((state) => (
          <section key={state} className="taskboard__column">
            <h3 className="taskboard__title">{state}</h3>
            {tasks.data
              .filter((task) => task.state?.title === state)
              .map((task) => (
                <div key={task.id} className="taskcard">
                  <p className="taskcard__title">{task.title}</p>
                  <div className="taskcard__types">
                    {task.task_types?.length > 0 ? (
                      task.task_types.map((type) => (
                        <span
                          key={type.id}
                          className="taskcard__label taskcard__label--default"
                        >
                          {type.name}
                        </span>
                      ))
                    ) : (
                      <span className="taskcard__label taskcard__label--default">
                        No category
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </section>
        ))}
      </div>
    </main>
  );
};
