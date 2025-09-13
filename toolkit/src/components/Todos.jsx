import {} from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";

const Todos = ({ setEditTodo }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  return (
    <div>
      <h1>Todos</h1>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text} <button onClick={() => setEditTodo(todo)}>update</button>
          <button onClick={() => dispatch(removeTodo(todo.id))}>delete</button>
        </li>
      ))}
    </div>
  );
};

export default Todos;
