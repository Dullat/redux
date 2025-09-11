
---

# 📒 Redux: `createStore`, Reducer, and Initial State

---

## 1. Why `createStore(reducer)` and not `createStore(state)`?

* Redux’s store doesn’t hold state directly.
* Instead, it needs a **reducer function** that tells it:

  * How to create the **initial state**.
  * How to update state when actions are dispatched.
* Reducer is the "state manager," store is the "state holder."

---

## 2. Role of the Reducer

A reducer is a pure function:

```js
(state = initialState, action) => newState
```

* Takes in current `state` + an `action`.
* Returns the **next state**.
* Must be **pure**: no side effects, no mutations, same input = same output.

Example:

```js
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_PIZZA:
      return {
        ...state,
        pizzaBase: state.pizzaBase - 1,
      };
    default:
      return state;
  }
};
```

---

## 3. How does Redux get the **initial state**?

When you call:

```js
const store = createStore(reducer);
```

Redux does the following internally:

```js
let currentState;

// Call reducer once with undefined state and special action
currentState = reducer(undefined, { type: "@@redux/INIT" });
```

* Since `state` is `undefined`, your reducer falls back to the default:

  ```js
  (state = initialState, action) => { ... }
  ```
* That’s how your `initialState` is injected into the store.
* From this point, the store holds that state.

---

## 4. What happens on dispatch?

Whenever you dispatch an action:

```js
store.dispatch({ type: ORDER_PIZZA });
```

Redux will:

1. Call the reducer with the current state and the action:

   ```js
   newState = reducer(currentState, action);
   ```
2. Replace the old state with `newState`.
3. Notify all subscribers that the state changed.

---

## 5. Why not pass state directly?

* `createStore` does allow a second argument:

  ```js
  const store = createStore(reducer, preloadedState);
  ```
* This is useful for:

  * **Hydration**: loading state from server/localStorage.
  * **Testing**: starting with custom state.
* But normally, you define `initialState` inside the reducer, so the reducer always knows the default shape.

---

## 6. Flow Visualization

1. **Store creation**:

   * `createStore(reducer)`
   * Calls reducer: `reducer(undefined, { type: "@@redux/INIT" })`
   * Reducer returns `initialState`
   * Store saves it as `currentState`.

2. **State updates**:

   * `dispatch(action)`
   * Calls reducer: `reducer(currentState, action)`
   * Reducer returns new state
   * Store updates state and notifies subscribers.

---

## ✅ Key Takeaways

* **Store doesn’t store state directly.** It always delegates to the reducer.
* **Initial state** is set when the reducer runs with `undefined` as state and a special `INIT` action.
* **Dispatch** → Store calls reducer with `(oldState, action)` → gets `newState`.
* You *can* pass a `preloadedState` as the 2nd argument to `createStore`, but not necessary in simple cases.

---

👉 This is the **core idea of Redux**. Everything else (Redux Toolkit, middleware, async handling) is built on top of this foundation.

---

