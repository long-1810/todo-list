export default function InputField(props) {
  const { inputFieldValue, setInputFieldValue, addListItem } = props;
  return (
    <form onSubmit={addListItem}>
      <button className="add-item"></button>
      <input
        maxLength="30"
        autoComplete="off"
        type="text"
        name="add-item"
        id="add-item"
        placeholder="Create a new todo"
        value={inputFieldValue}
        onChange={setInputFieldValue}
      />
    </form>
  );
}
