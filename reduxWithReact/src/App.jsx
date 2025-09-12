import { useState } from "react";
import store from "./components/redux/store";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PizzaBox from "./components/PizzaBox";
import { Provider } from "react-redux";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>hello world</p>
      <Provider store={store}>
        <PizzaBox></PizzaBox>
      </Provider>
    </>
  );
}

export default App;
