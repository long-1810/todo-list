export default function Functionalities(props) {
  const { todoList, changeFilterOption, clearCompleted, filterOption } = props;

  function remainingItems() {
    let counter = 0;
    for (let i = 0; i < todoList.length; i++) {
      if (!todoList[i].checked) {
        counter++;
      }
    }
    return counter;
  }

  return (
    <>
      <div className="functionalities-container large-screen">
        <p id="items-remaining">{remainingItems()} items left</p>
        <div className="filter-container">
          <a
            className={filterOption === "all" ? "clicked" : ""}
            href="#"
            id="all"
            onClick={() => {
              changeFilterOption("all");
            }}
          >
            All
          </a>
          <a
            className={filterOption === "active" ? "clicked" : ""}
            href="#"
            id="active"
            onClick={() => {
              changeFilterOption("active");
            }}
          >
            Active
          </a>
          <a
            className={filterOption === "completed" ? "clicked" : ""}
            href="#"
            id="completed"
            onClick={() => {
              changeFilterOption("completed");
            }}
          >
            Completed
          </a>
        </div>
        <a href="#" id="clear-completed" onClick={clearCompleted}>
          Clear completed
        </a>
      </div>

      <div className="functionalities-container small-screen">
        <div className="row-1">
          <p id="items-remaining">{remainingItems()} items left</p>
          <a href="#" id="clear-completed" onClick={clearCompleted}>
            Clear completed
          </a>
        </div>

        <div className="row-2">
          <div className="filter-container">
            <a
              className={filterOption === "all" ? "clicked" : ""}
              href="#"
              id="all"
              onClick={() => {
                changeFilterOption("all");
              }}
            >
              All
            </a>
            <a
              className={filterOption === "active" ? "clicked" : ""}
              href="#"
              id="active"
              onClick={() => {
                changeFilterOption("active");
              }}
            >
              Active
            </a>
            <a
              className={filterOption === "completed" ? "clicked" : ""}
              href="#"
              id="completed"
              onClick={() => {
                changeFilterOption("completed");
              }}
            >
              Completed
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
