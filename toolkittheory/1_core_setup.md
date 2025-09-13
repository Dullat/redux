

---

# ⚡ Core Setup of Redux Toolkit

We’ll break it into **4 steps**:

---

## **1. Install**

```bash
npm install @reduxjs/toolkit react-redux
```

---

## **2. Create a Slice**

👉 A slice = `state + reducers + auto-generated actions`.

```js
// features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter", // unique slice name
  initialState: { value: 0 }, // initial state
  reducers: {
    increment: (state) => {
      state.value += 1; // safe because RTK uses Immer
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// export actions and reducer
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

---

## **3. Configure Store**

👉 Combine all slices and set up store with `configureStore`.

```js
// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer, // more slices go here
  },
});
```

---

## **4. Provide Store to React**

👉 Wrap your app in `<Provider>` (from `react-redux`).

```jsx
// index.js
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

## **5. Use in Components**

👉 Access state & dispatch with hooks:

```jsx
// App.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "./features/counter/counterSlice";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}

export default App;
```

---

# ✅ What You’ve Set Up

1. **Slice** → holds state & actions (`createSlice`).
    
2. **Store** → combines slices (`configureStore`).
    
3. **Provider** → makes store available to React.
    
4. **Hooks** → `useSelector` for state, `useDispatch` for actions.
    

---

This is the **core Redux Toolkit loop**.  
From here, you add:

- `createAsyncThunk` → async logic.
    
- `createApi` → RTK Query for data fetching.
    

---
