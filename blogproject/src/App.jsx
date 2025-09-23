import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>Blog Project</h1>
      <Outlet />
    </main>
  );
}

export default App;
