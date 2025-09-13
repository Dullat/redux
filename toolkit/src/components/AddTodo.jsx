import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../features/todo/todoSlice";

const AddTodo = ({ editTodo, setEditTodo }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (editTodo !== null) {
      dispatch(updateTodo({ id: editTodo.id, text: input }));
      setEditTodo(null);
    } else dispatch(addTodo(input));
    setInput("");
  };

  useEffect(() => {
    if (editTodo !== null) {
      setInput(editTodo.text);
    }
  }, [editTodo]);

  return (
    <form onSubmit={addTodoHandler}>
      <input
        type="text"
        name="todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">{editTodo ? "updateTodo" : "addTodo"}</button>
    </form>
  );
};

export default AddTodo;
