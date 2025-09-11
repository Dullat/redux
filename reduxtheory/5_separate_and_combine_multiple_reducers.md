

---

# 📒 Redux Reducers & Combining Reducers

---

## 🔹 What is a Reducer?

- A **reducer** is a pure function `(state, action) => newState`.
    
- It tells the store **how to update state** based on the action.
    
- It must:
    
    1. Return the current state if action is not recognized.
        
    2. Never mutate the state → always return a new object.
        

---

## 🔹 Why Split Reducers?

In small apps, one reducer is enough.  
But in larger apps:

- State tree grows (e.g., `user`, `cart`, `products`).
    
- Logic gets messy in a single reducer.
    

👉 So we split reducers into **smaller, focused reducers**:

- `pizzaReducer` manages pizza-related state.
    
- `burgerReducer` manages burger-related state.
    

---

## 🔹 Combining Reducers

Redux provides a helper:

```js
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  pizza: pizzaReducer,
  burger: burgerReducer,
});
```

This creates a **root reducer** which internally looks like:

```js
function rootReducer(state = {}, action) {
  return {
    pizza: pizzaReducer(state.pizza, action),
    burger: burgerReducer(state.burger, action),
  };
}
```

So:

- Every action is passed to **every reducer**.
    
- Each reducer only manages its **own slice of state**.
    
- If reducer doesn’t recognize the action → returns unchanged state.
    
- Redux merges them into one **state tree**.
    

---

## 🔹 Example

### Actions

```js
const ORDER_PIZZA = "ORDER_PIZZA";
const ORDER_BURGER = "ORDER_BURGER";
const ADD_TOPPINGS = "ADD_TOPPINGS";
```

### Reducers

```js
const initialPizzaState = { pizzaBase: 100, toppings: ["cheese"] };
const initialBurgerState = { burgerBuns: 50 };

function pizzaReducer(state = initialPizzaState, action) {
  switch (action.type) {
    case ORDER_PIZZA:
      return { ...state, pizzaBase: state.pizzaBase - 1 };
    case ADD_TOPPINGS:
      return { ...state, toppings: [...state.toppings, action.topping] };
    default:
      return state;
  }
}

function burgerReducer(state = initialBurgerState, action) {
  switch (action.type) {
    case ORDER_BURGER:
      return { ...state, burgerBuns: state.burgerBuns - 1 };
    default:
      return state;
  }
}
```

### Root Reducer

```js
const rootReducer = combineReducers({
  pizza: pizzaReducer,
  burger: burgerReducer,
});
```

### Store State Shape

```js
const store = createStore(rootReducer);

console.log(store.getState());

// {
//   pizza: { pizzaBase: 100, toppings: ["cheese"] },
//   burger: { burgerBuns: 50 }
// }
```

---

## 🔹 Responsibilities Recap

- **Reducer** → defines how a slice of state changes.
    
- **combineReducers** → merges slice reducers into one root reducer.
    
- **Root reducer** → called by Redux store whenever an action is dispatched.
    

---

## 🔹 Key Points to Remember

1. Reducers must be pure functions (no side effects, no mutation).
    
2. All reducers run on every action, but only matching ones update their slice.
    
3. State shape depends on keys you give to `combineReducers`.
    
    ```js
    combineReducers({ pizza: pizzaReducer, burger: burgerReducer })
    ```
    
    → creates `state.pizza` and `state.burger`.
    
4. This modular structure is the foundation of **scalable Redux apps**.
    

---

⚡ Pro Tip: In **Redux Toolkit**, you’ll use `createSlice()` instead of writing manual reducers + actions. It internally uses `combineReducers` for you.

---
