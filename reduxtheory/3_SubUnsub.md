

---

## Code (annotated)

```js
const store = createStore(reducer); 
// ✅ You pass reducer, not state.
// Store will run reducer once with undefined → use initialState.

console.log(store);
// ✅ Shows you the store object with methods: getState, dispatch, subscribe.
```

---

### 1. Registering a Listener

```js
const unsubscribe = store.subscribe(() =>
  console.log("Updated state", store.getState())
);
```

- You just told the store:  
    “Hey, whenever state changes, run this function.”
    
- Every time you `dispatch`, Redux will call this function.
    
- `store.subscribe` returns an **unsubscribe function** → that’s how you can stop listening.
    

---

### 2. Dispatching Actions

```js
store.dispatch(orderPizza());
store.dispatch(orderPizza());
store.dispatch(orderPizza());
```

- Each dispatch → calls reducer → updates state → runs your subscriber.
    
- Subscriber logs:
    
    ```
    Updated state { pizzaBase: 9 }
    Updated state { pizzaBase: 8 }
    Updated state { pizzaBase: 7 }
    ```
    

---

### 3. Unsubscribing

```js
unsubscribe();
```

- This removes your listener from `listeners[]` inside the store.
    
- From now on, **state will still update**, but **your log function won’t run anymore**.
    

---

### 4. Dispatch After Unsub

```js
store.dispatch(orderPizza());
```

- State is updated internally (`pizzaBase: 6`),
    
- But since you unsubscribed, nothing is logged.
    

---

## ✅ Expected Output

Assuming `initialState = { pizzaBase: 10 }`

```
{ getState: [Function], dispatch: [Function], subscribe: [Function] }

Updated state { pizzaBase: 9 }
Updated state { pizzaBase: 8 }
Updated state { pizzaBase: 7 }

(no log here, because unsubscribed)
```

---

## 🔍 Tips for Exploring Store Methods

### Check initial state:

```js
console.log("Initial State:", store.getState());
```

### Dispatch with payload:

```js
store.dispatch({ type: "ORDER_PIZZA", payload: { topping: "cheese" } });
```

### Subscribe multiple listeners:

```js
const sub1 = store.subscribe(() => console.log("Listener 1:", store.getState()));
const sub2 = store.subscribe(() => console.log("Listener 2:", store.getState()));

store.dispatch(orderPizza());

sub1(); // unsubscribe first listener
store.dispatch(orderPizza()); // only Listener 2 logs now
```

### Manual unsubscribe:

If you forget to call `unsubscribe()`, the listener will keep running forever.  
That’s why **unsubscribe is super important in React** (components unmounting).

---

## 🔑 Key Understanding

- **subscribe(listener)** → adds listener.
    
- **unsubscribe()** → removes it.
    
- **dispatch(action)** → triggers reducer → updates state → notifies all active listeners.
    
- Even if you unsubscribe, **state still changes** — you just stop being notified.
    

---

# In React Component

**store.subscribe**, **unsubscribe**, and the lifecycle of updates.

---

### 1. **The Store Object**

When you do:

```js
const store = createStore(reducer);
```

You get back an object that exposes **4 core methods**:

1. `getState()` → returns the current state
    
2. `dispatch(action)` → updates state by passing action → reducer → new state
    
3. `subscribe(listener)` → registers a listener (a callback function that runs when state changes)
    
4. `replaceReducer(nextReducer)` → (advanced) lets you swap the reducer
    

---

### 2. **subscribe & unsubscribe**

```js
const unsubscribe = store.subscribe(() =>
  console.log("Updated state", store.getState())
);
```

- Every time you dispatch an action → state changes → **all subscribed listeners run**.
    
- `subscribe` returns a function (`unsubscribe`). Calling it removes that listener from the list.
    

So:

```js
unsubscribe(); // now listener is removed
```

---

### 3. **Your Example Flow**

```js
store.dispatch(orderPizza()); // listener fires, logs updated state
store.dispatch(orderPizza()); // listener fires again
store.dispatch(orderPizza()); // listener fires again

unsubscribe(); // stop listening

store.dispatch(orderPizza()); // state updates, BUT listener won’t run anymore
```

👉 Even though `unsubscribe()` removes the logging listener, the **state is still updated internally**. You just don’t see logs anymore. If you call:

```js
console.log(store.getState());
```

after the last dispatch, you’ll see the state did change.

---

### 4. **Why is this Useful?**

- You can attach multiple listeners → UI frameworks (like React) attach re-render functions here.
    
- `unsubscribe` is critical when a component unmounts (so you don’t keep stale listeners in memory).
    

---

### 5. **Try This Experiment**

Add multiple listeners and see how unsubscribe affects only one of them:

```js
const listener1 = () => console.log("Listener 1", store.getState());
const listener2 = () => console.log("Listener 2", store.getState());

const unsub1 = store.subscribe(listener1);
const unsub2 = store.subscribe(listener2);

store.dispatch(orderPizza()); // both listeners fire

unsub1(); // remove listener1

store.dispatch(orderPizza()); // only listener2 fires
```

---

⚡ So, the store keeps:

- **state** (internal memory)
    
- **listeners[]** (array of functions to call on every state update)
    

Dispatch updates **both**: state + triggers listeners.

---
