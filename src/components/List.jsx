import ListItem from "./ListItem";

export default function List(props) {
  const {
    todoList,
    filterOption,
    toggleCompleted,
    setTodoList,
    deleteTodo,
    mode,
  } = props;
  let renderedList;
  let activeList = todoList.filter((todo) => !todo.checked);
  let completedList = todoList.filter((todo) => todo.checked);

  /*
    Line 35-38 -> When the mouse move to another item, 
    handleMouseEnter and handleMouseLeave is called at the same time
    => Cannot set the old hovered item to {..., hover: false}
    => When the mouse enters a new item, must check if that's the only
    item with hover: true and forcefully set all other items' hover to false
  */
  function handleMouseEnter(array, id) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      const currentItem = array[i];
      if (currentItem.id === id) {
        newArray.push({
          ...currentItem,
          hover: true,
        });
      } else {
        newArray.push({
          ...currentItem,
          hover: false,
        });
      }
    }
    if (filterOption === "all") {
      setTodoList(newArray);
    } else if (filterOption === "active") {
      activeList = newArray;
    } else if (filterOption === "completed") {
      completedList = newArray;
    }
  }

  function handleMouseLeave(array, id) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      const currentItem = array[i];
      if (currentItem.id === id) {
        newArray.push({
          ...currentItem,
          hover: false,
        });
      } else {
        newArray.push(currentItem);
      }
    }
    if (filterOption === "all") {
      setTodoList(newArray);
    } else if (filterOption === "active") {
      activeList = newArray;
    } else if (filterOption === "completed") {
      completedList = newArray;
    }
  }

  switch (filterOption) {
    case "all":
      renderedList = todoList.map((todo) => {
        return (
          <ListItem
            key={todo.id}
            checked={todo.checked}
            hover={todo.hover}
            id={todo.id}
            value={todo.value}
            toggleCompleted={toggleCompleted}
            handleMouseEnter={() => {
              handleMouseEnter(todoList, todo.id);
            }}
            handleMouseLeave={() => {
              handleMouseLeave(todoList, todo.id);
            }}
            deleteTodo={() => {
              deleteTodo(todo.id);
            }}
            mode={mode}
          />
        );
      });
      break;

    case "active":
      renderedList = activeList.map((todo) => {
        return (
          <ListItem
            key={todo.id}
            checked={todo.checked}
            hover={todo.hover}
            id={todo.id}
            value={todo.value}
            toggleCompleted={toggleCompleted}
            handleMouseEnter={() => {
              handleMouseEnter(activeList, todo.id);
            }}
            handleMouseLeave={() => {
              handleMouseLeave(activeList, todo.id);
            }}
            deleteTodo={() => {
              deleteTodo(todo.id);
            }}
            mode={mode}
          />
        );
      });
      break;

    case "completed":
      renderedList = completedList.map((todo) => {
        return (
          <ListItem
            key={todo.id}
            checked={todo.checked}
            hover={todo.hover}
            id={todo.id}
            value={todo.value}
            toggleCompleted={toggleCompleted}
            handleMouseEnter={() => {
              handleMouseEnter(completedList, todo.id);
            }}
            handleMouseLeave={() => {
              handleMouseLeave(completedList, todo.id);
            }}
            deleteTodo={() => {
              deleteTodo(todo.id);
            }}
            mode={mode}
          />
        );
      });
  }

  return (
    <div className="list-container">
      {renderedList.length !== 0 && renderedList}
    </div>
  );
}
