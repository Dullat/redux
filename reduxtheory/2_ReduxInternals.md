A **mini hand-made implementation of `createStore`** in about 20 lines:

```js
function createStore(reducer) {
  let state;               // holds the current state
  let listeners = [];      // keeps track of subscribers

  // 1. return the current state
  const getState = () => state;

  // 2. dispatch an action → run reducer → update state → notify listeners
  const dispatch = (action) => {
    state = reducer(state, action);   // get new state
    listeners.forEach((listener) => listener()); // notify subscribers
  };

  // 3. subscribe a listener (like re-render function)
  const subscribe = (listener) => {
    listeners.push(listener);
    // return an unsubscribe function
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  // 4. initialize state by dispatching a dummy action
  dispatch({ type: "@@redux/INIT" });

  return { getState, dispatch, subscribe };
}
```

---

### 🔍 How it works

```js
// Example reducer
const reducer = (state = { pizzaBase: 10 }, action) => {
  switch (action.type) {
    case "ORDER_PIZZA":
      return { ...state, pizzaBase: state.pizzaBase - 1 };
    default:
      return state;
  }
};

// Create store with our custom function
const store = createStore(reducer);

// Subscribe to state changes
store.subscribe(() => {
  console.log("State changed:", store.getState());
});

// Initial state
console.log("Initial:", store.getState());

// Dispatch an action
store.dispatch({ type: "ORDER_PIZZA" });
store.dispatch({ type: "ORDER_PIZZA" });
```

---

### ✅ Output

```
Initial: { pizzaBase: 10 }
State changed: { pizzaBase: 9 }
State changed: { pizzaBase: 8 }
```

---

### 📌 Notes

- `state` is private inside the store → can only be accessed via `getState()`.
    
- `dispatch()`:
    
    - Calls reducer with `(currentState, action)`.
        
    - Saves the new state.
        
    - Notifies all subscribers.
        
- `subscribe(listener)` lets external code react to changes (e.g., UI re-render).
    
- Store starts by dispatching a fake action (`@@redux/INIT`) → reducer runs with `undefined` → gives **initial state**.
    

---

# Deep
Let’s break down the **mini `createStore` implementation line by line** so you see _exactly_ how Redux works under the hood.

---

## 📝 Hand-made `createStore` with Annotations

```js
function createStore(reducer) {
  let state;               // 🟢 Holds the current state of the app
  let listeners = [];      // 🟢 Stores all subscriber functions (observers)

  // 1️⃣ Return the current state
  const getState = () => state;

  // 2️⃣ Dispatch an action: run reducer, update state, notify listeners
  const dispatch = (action) => {
    // Call reducer with current state and action
    state = reducer(state, action);  

    // Notify all subscribers that state has changed
    listeners.forEach((listener) => listener());
  };

  // 3️⃣ Subscribe a listener (like re-render function in React)
  const subscribe = (listener) => {
    listeners.push(listener);   // Save listener

    // Return unsubscribe function (important!)
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  // 4️⃣ Initialize the state
  // Trick: dispatch a fake action so reducer runs once
  dispatch({ type: "@@redux/INIT" });

  // 5️⃣ Return store API
  return { getState, dispatch, subscribe };
}
```

---

## 🧠 Step-by-Step Flow

### 🔹 1. State & Listeners

```js
let state;
let listeners = [];
```

- `state`: holds the **entire app’s data**.
    
- `listeners`: keeps a list of functions that should run when the state changes (like re-rendering UI).
    

---

### 🔹 2. `getState()`

```js
const getState = () => state;
```

- A function that **returns the current state**.
    
- Components use this to read data.
    

---

### 🔹 3. `dispatch(action)`

```js
const dispatch = (action) => {
  state = reducer(state, action);  
  listeners.forEach((listener) => listener());
};
```

- Core of Redux:
    
    1. Calls the reducer with `(state, action)`.
        
    2. Reducer returns a **new state**.
        
    3. Store updates its internal `state`.
        
    4. All subscribers (`listeners`) are notified → they can re-render.
        

---

### 🔹 4. `subscribe(listener)`

```js
const subscribe = (listener) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};
```

- Lets external code **listen for changes** in state.
    
- Useful in React: the UI can re-render whenever the state changes.
    
- Returns an **unsubscribe** function so you can stop listening.
    

---

### 🔹 5. Initial State Trick

```js
dispatch({ type: "@@redux/INIT" });
```

- When store is created, `state` is `undefined`.
    
- We immediately call reducer with:
    
    - `state = undefined`
        
    - `action = { type: "@@redux/INIT" }`
        
- Reducer sees `state = undefined`, uses its default → `initialState`.
    

This ensures the store starts with the correct initial state.

---

### 🔹 6. Store API

```js
return { getState, dispatch, subscribe };
```

- The store exposes **3 methods**:
    
    1. `getState()` → read state.
        
    2. `dispatch(action)` → update state.
        
    3. `subscribe(listener)` → listen to updates.
        

---

## ✅ Example in Action

```js
// Reducer
const reducer = (state = { pizzaBase: 10 }, action) => {
  switch (action.type) {
    case "ORDER_PIZZA":
      return { ...state, pizzaBase: state.pizzaBase - 1 };
    default:
      return state;
  }
};

// Create store
const store = createStore(reducer);

// Subscribe to updates
const unsubscribe = store.subscribe(() => {
  console.log("Updated State:", store.getState());
});

// Logs initial state
console.log("Initial State:", store.getState());

// Dispatch actions
store.dispatch({ type: "ORDER_PIZZA" });
store.dispatch({ type: "ORDER_PIZZA" });

// Stop listening
unsubscribe();
```

---

### 🖥 Output

```
Initial State: { pizzaBase: 10 }
Updated State: { pizzaBase: 9 }
Updated State: { pizzaBase: 8 }
```

---

## 🔑 Final Takeaways

- **Store = container** that manages state.
    
- **Reducer = brain** that calculates new state.
    
- **Actions = events** describing what happened.
    
- **Dispatch = messenger** that sends actions to reducer.
    
- **Subscribe = observer pattern** that lets UI react to changes.
    

---
