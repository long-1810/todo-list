import checkedIcon from "../assets/images/icon-check.svg";
import crossIcon from "../assets/images/icon-cross.svg";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function ListItem(props) {
  const {
    checked,
    hover,
    id,
    value,
    toggleCompleted,
    handleMouseEnter,
    handleMouseLeave,
    deleteTodo,
    mode,
  } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const buttonCheckedStyle = {
    border: "none",
    backgroundImage:
      "linear-gradient(135deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
  };
  const textCheckedStyle =
    mode === "light"
      ? {
          color: "hsl(236, 33%, 92%)",
          textDecoration: "line-through",
          textDecorationColor: "hsl(233, 11%, 84%)",
        }
      : {
          color: "hsl(237, 14%, 26%)",
          textDecoration: "line-through",
          textDecorationColor: "hsl(233, 14%, 35%)",
        };

  const dragStyle = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      className="list-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={dragStyle}
    >
      <div className="divider-1">
        <button
          className="check"
          style={checked ? buttonCheckedStyle : {}}
          onClick={() => {
            toggleCompleted(id);
          }}
        >
          {checked && <img src={checkedIcon} alt="Checked" />}
        </button>
        <p className="todo" style={checked ? textCheckedStyle : {}}>
          {value}
        </p>
      </div>
      {hover && (
        <button className="delete" onClick={deleteTodo}>
          <img src={crossIcon} alt="Delete" />
        </button>
      )}
    </div>
  );
}
