import { useState } from "react";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  const [editTodo, setEditTodo] = useState(null);
  return (
    <>
      <Provider store={store}>
        <div>hlo world</div>
        <AddTodo editTodo={editTodo} setEditTodo={setEditTodo} />
        <Todos setEditTodo={setEditTodo} />
      </Provider>
    </>
  );
}

export default App;
