
We’ll do it in **two ways**:

1. **Pure Redux with manual subscribe/unsubscribe** (to see how it works under the hood).
    
2. **React-Redux hooks (`useSelector`, `useDispatch`)** (the modern, clean way you’ll actually use it in projects).
    

---

## 1. Pure Redux in a React Component

Here we manage subscription manually inside `useEffect`.

```jsx
import React, { useEffect, useState } from "react";
import { createStore } from "redux";

// --- Redux setup ---
const ORDER_PIZZA = "ORDER_PIZZA";

const orderPizza = () => ({ type: ORDER_PIZZA });

const initialState = { pizzaBase: 10 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_PIZZA:
      return { ...state, pizzaBase: state.pizzaBase - 1 };
    default:
      return state;
  }
};

const store = createStore(reducer);

// --- React Component ---
function PizzaShop() {
  const [pizzaCount, setPizzaCount] = useState(store.getState().pizzaBase);

  useEffect(() => {
    // subscribe to store updates
    const unsubscribe = store.subscribe(() => {
      setPizzaCount(store.getState().pizzaBase);
    });

    // cleanup = unsubscribe on unmount
    return unsubscribe;
  }, []);

  return (
    <div>
      <h1>Pizza Shop</h1>
      <p>Pizzas left: {pizzaCount}</p>
      <button onClick={() => store.dispatch(orderPizza())}>Order Pizza</button>
    </div>
  );
}

export default PizzaShop;
```

👉 Here you can see:

- The component **subscribes** to the store on mount.
    
- When state changes, `setPizzaCount` updates React state, causing a re-render.
    
- On unmount, `unsubscribe` cleans up.
    

This is the **raw flow** of how React-Redux works internally.

---

## 2. The Modern Way (React-Redux Hooks)

With the `react-redux` library, you don’t need manual subscription — it does it for you.

```bash
npm install react-redux
```

### Redux Setup (same as before)

```js
import { createStore } from "redux";

const ORDER_PIZZA = "ORDER_PIZZA";
export const orderPizza = () => ({ type: ORDER_PIZZA });

const initialState = { pizzaBase: 10 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_PIZZA:
      return { ...state, pizzaBase: state.pizzaBase - 1 };
    default:
      return state;
  }
};

export const store = createStore(reducer);
```

### React App

```jsx
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, orderPizza } from "./store";

function PizzaShop() {
  const pizzaCount = useSelector((state) => state.pizzaBase);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Pizza Shop</h1>
      <p>Pizzas left: {pizzaCount}</p>
      <button onClick={() => dispatch(orderPizza())}>Order Pizza</button>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PizzaShop />
    </Provider>
  );
}
```

👉 With `useSelector` and `useDispatch`, React-Redux automatically subscribes/unsubscribes for you.

---

⚡ Key takeaway:

- **Manual subscribe/unsubscribe** (good for learning, not used in production).
    
- **React-Redux hooks** (industry standard).
    

---
