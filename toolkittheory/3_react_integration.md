

---

# 🔗 React Integration with Redux Toolkit

When using **Redux Toolkit + React-Redux**, we follow 3 main steps:

---

## **1. Setup the Store**

```js
// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer, // add more slices here later
  },
});
```

---

## **2. Provide the Store to React**

Wrap your app with `<Provider>` so all components can access the store.

```jsx
// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

---

## **3. Connect Components (Hooks API)**

Use **`useSelector`** (read state) and **`useDispatch`** (update state).

```jsx
// src/features/counter/Counter.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "./counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.value); // read state
  const dispatch = useDispatch(); // get dispatch function

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}

export default Counter;
```

---

# 🔹 Workflow Recap

1. Define **slice** (state + reducers + actions).
    
2. Add slice reducer to **store**.
    
3. Wrap app with `<Provider store={store}>`.
    
4. Use `useSelector` to read state.
    
5. Use `useDispatch` to update state.
    

---

# ✅ Example State Tree

```js
state = {
  counter: { value: 0 },
  auth: { user: null },
  todos: { items: [] }
}
```

---

⚡ **Key point**:  
With Redux Toolkit + Hooks, you don’t need `connect`, `mapStateToProps`, `mapDispatchToProps` anymore. Everything is cleaner.

---
