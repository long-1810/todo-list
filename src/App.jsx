import { useEffect, useState } from "react";
import sunIcon from "./assets/images/icon-sun.svg";
import moonIcon from "./assets/images/icon-moon.svg";
import InputField from "./components/InputField";
import List from "./components/List";
import Functionalities from "./components/Functionalities";
import { nanoid } from "nanoid";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  verticalListSortingStrategy,
  SortableContext,
  arrayMove,
} from "@dnd-kit/sortable";

export default function App() {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todoList")) || []
  );
  const [filterOption, setFilterOption] = useState("all");
  const [inputFieldValue, setInputFieldValue] = useState("");
  const [mode, setMode] = useState("light");

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  function handleFormChange(event) {
    return setInputFieldValue(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (inputFieldValue !== "") {
      setTodoList((oldTodoList) => [
        ...oldTodoList,
        {
          id: nanoid(),
          value: inputFieldValue,
          checked: false,
          hover: false,
        },
      ]);
      setInputFieldValue("");
    }
  }

  function clearCompleted() {
    let newTodoList = [];
    for (let i = 0; i < todoList.length; i++) {
      if (!todoList[i].checked) {
        newTodoList.push(todoList[i]);
      }
    }
    setTodoList(newTodoList);
  }

  function toggleCompleted(id) {
    let newTodoList = [];
    for (let i = 0; i < todoList.length; i++) {
      const currentTodo = todoList[i];
      if (currentTodo.id === id) {
        newTodoList.push({
          ...currentTodo,
          checked: !currentTodo.checked,
        });
      } else {
        newTodoList.push(currentTodo);
      }
    }
    setTodoList(newTodoList);
  }

  function deleteTodo(id) {
    let newTodoList = [];
    for (let i = 0; i < todoList.length; i++) {
      const currentTodo = todoList[i];
      if (currentTodo.id !== id) {
        newTodoList.push(currentTodo);
      }
    }

    setTodoList(newTodoList);
  }

  function toggleMode() {
    setMode((oldMode) => (oldMode === "dark" ? "light" : "dark"));
  }

  function onDragEnd(event) {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setTodoList((oldTodoList) => {
      const oldIndex = oldTodoList.findIndex(
        (oldTodo) => oldTodo.id === active.id
      );
      const newIndex = oldTodoList.findIndex(
        (oldTodo) => oldTodo.id === over.id
      );
      return arrayMove(todoList, oldIndex, newIndex);
    });
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <div className={"bg-color " + (mode === "light" ? "light" : "")}>
      <div className="bg-img">
        <div className="container">
          <nav>
            <h1>TODO</h1>
            <button className="toggle" onClick={toggleMode}>
              <img
                src={mode === "light" ? moonIcon : sunIcon}
                alt="Toggler"
                id="icon-toggle"
              />
            </button>
          </nav>
          <main>
            <InputField
              addListItem={handleFormSubmit}
              inputFieldValue={inputFieldValue}
              setInputFieldValue={handleFormChange}
            />
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
              sensors={sensors}
            >
              <SortableContext
                items={todoList}
                strategy={verticalListSortingStrategy}
              >
                <List
                  todoList={todoList}
                  filterOption={filterOption}
                  toggleCompleted={toggleCompleted}
                  setTodoList={setTodoList}
                  deleteTodo={deleteTodo}
                  mode={mode}
                />
              </SortableContext>
            </DndContext>

            <Functionalities
              todoList={todoList}
              changeFilterOption={setFilterOption}
              clearCompleted={clearCompleted}
              filterOption={filterOption}
            />
          </main>
          <footer>Drag and drop to reorder list</footer>
        </div>
      </div>
    </div>
  );
}
