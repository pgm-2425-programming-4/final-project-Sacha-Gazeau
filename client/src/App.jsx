
import "./styles/main.css";

function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="sidebar__title">Projects</h2>
        <ul className="sidebar__list">
          <li className="sidebar__item">PGM3</li>
          <li className="sidebar__item">PGM4</li>
        </ul>
      </aside>

      <main className="taskboard">
        <header className="taskboard__header">
          <div className="taskboard__filters">
            <select className="taskboard__select">
              <option>All</option>
              <option>Back-end</option>
            </select>
            <input
              type="text"
              placeholder="Search tasks..."
              className="taskboard__search"
            />
          </div>
          <div className="taskboard__actions">
            <p className="taskboard__project">Active project: PGM3</p>
            <button className="btn btn--add">Add new task</button>
            <button className="btn btn--backlog">View backlog</button>
          </div>
        </header>

        <div className="taskboard__columns">
          <section className="taskboard__column taskboard__column--todo">
            <h3 className="taskboard__title">To do</h3>
            <div className="taskcard">
              <p className="taskcard__title">Create pipeline</p>
              <span className="taskcard__label taskcard__label--infra">
                Infra
              </span>
            </div>
          </section>

          <section className="taskboard__column taskboard__column--progress">
            <h3 className="taskboard__title">In progress</h3>
            <div className="taskcard">
              <p className="taskcard__title">Set up Strapi</p>
              <span className="taskcard__label taskcard__label--backend">
                Back-end
              </span>
            </div>
          </section>

          <section className="taskboard__column taskboard__column--review">
            <h3 className="taskboard__title">Ready for review</h3>
            <div className="taskcard">
              <p className="taskcard__title">Add Prettier</p>
              <span className="taskcard__label taskcard__label--frontend">
                Front-end
              </span>
            </div>
          </section>

          <section className="taskboard__column taskboard__column--done">
            <h3 className="taskboard__title">Done</h3>
            <div className="taskcard">
              <p className="taskcard__title">Initialize Git</p>
              <span className="taskcard__label taskcard__label--infra">
                Infra
              </span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
