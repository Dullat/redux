

---

# 📒 Redux Core Concepts and Responsibilities

---

## 1. **State**

- The **single source of truth** in Redux.
    
- A plain JavaScript object that represents the entire app’s data at a point in time.
    
- Immutable: you never directly change it; instead, you return a **new state** via reducer.
    
- Example:
    
    ```js
    const initialState = {
      pizzaBase: 10,
      toppings: 5,
      orders: [],
    };
    ```
    

---

## 2. **Action**

- Describes **what happened** in the app.
    
- Always has a `type` property (string constant).
    
- Can also carry extra information via `payload`.
    
- Example:
    
    ```js
    { type: "ORDER_PIZZA", payload: { topping: "cheese" } }
    ```
    
- **Responsibilities:**
    
    - Define _what change_ is requested.
        
    - Carry any extra data needed to perform the change.
        

---

## 3. **Reducer**

- A pure function: `(state, action) => newState`.
    
- Decides **how state changes** based on the action type.
    
- Never mutates state, always returns a new object.
    
- Example:
    
    ```js
    const reducer = (state = initialState, action) => {
      switch (action.type) {
        case "ORDER_PIZZA":
          return {
            ...state,
            pizzaBase: state.pizzaBase - 1,
          };
        default:
          return state;
      }
    };
    ```
    
- **Responsibilities:**
    
    - Provide the **initial state** (via `state = initialState`).
        
    - Define **state transitions** (based on action types).
        
    - Always return a **new state object**, not mutate existing one.
        

---

## 4. **Store**

The heart of Redux. Created using `createStore(reducer)`.

It has **4 main responsibilities**:

1. **Hold the state** of the application.
    
    - Internally keeps the current state object.
        
    - Example: `store.getState()`
        
2. **Allow access to state** via `getState()`.
    
    - Lets components read the latest state.
        
3. **Allow state to be updated** via `dispatch(action)`.
    
    - Triggers the reducer to calculate the next state.
        
    - Updates internal state with new result.
        
4. **Allow components to subscribe** to state changes.
    
    - `store.subscribe(listener)` lets you run a function whenever the state updates (e.g. re-render UI).
        
    - Returns an unsubscribe function.
        
5. **(Internally)** Initializes the state.
    
    - Calls reducer once with `undefined` and `@@redux/INIT` action to load initial state.
        

**Example:**

```js
import { createStore } from "redux";

const store = createStore(reducer);

console.log(store.getState()); // access state
store.dispatch({ type: "ORDER_PIZZA" }); // update state
store.subscribe(() => console.log("State updated:", store.getState()));
```

---

## 5. **Flow of Data in Redux**

1. A **user interaction** triggers `dispatch(action)`.
    
2. Store sends the **current state** + the **action** to the **reducer**.
    
3. Reducer returns a **new state** (based on action type).
    
4. Store saves the new state internally.
    
5. Store notifies all **subscribers**, so UI can re-render with fresh data.
    

---

## ✅ Key Takeaways

- **State**: Single source of truth, immutable object.
    
- **Action**: Plain object that describes “what happened.”
    
- **Reducer**: Pure function that decides “how state changes.”
    
- **Store**: The object that ties everything together with 4 main responsibilities:
    
    - Holds state.
        
    - Allows state access via `getState()`.
        
    - Allows state update via `dispatch(action)`.
        
    - Allows listening via `subscribe(listener)`.
        

---
