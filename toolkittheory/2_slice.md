

---

# 🧩 Redux Toolkit Slice

A **slice** is:

- A piece of state (like `counter`, `todos`, `auth`)
    
- The reducers that can change that state
    
- The action creators automatically generated for you
    

You make slices using **`createSlice`**.

---

## **1. Anatomy of a Slice**

```js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",          // Slice name (unique key in store)
  initialState: { value: 0 }, // Slice state
  reducers: {               // Reducers (state mutations)
    increment: (state) => {
      state.value += 1; // Immer lets us "mutate" safely
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Export actions & reducer
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

---

## **2. What Happens Behind the Scenes**

When you create a slice:

- RTK auto-generates:
    
    - **Reducer function** (for the store)
        
    - **Action creators** (for dispatching)
        
    - **Action types** (like `"counter/increment"`)
        

For example, `increment()` actually creates:

```js
{ type: "counter/increment" }
```

And `incrementByAmount(5)` creates:

```js
{ type: "counter/incrementByAmount", payload: 5 }
```

---

## **3. Benefits of createSlice**

✅ No need to manually define `action.type` constants  
✅ No need to write separate `action creators`  
✅ Uses **Immer.js** → you can "mutate" state directly  
✅ Cleaner and shorter than vanilla Redux

---

## **4. Multiple Slices**

Each slice handles its own piece of state:

```js
import counterReducer from "./counterSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});
```

So `state.counter.value` and `state.auth.user` are now available in React.

---

## **5. Typical Folder Structure**

```
/src
  /app
    store.js
  /features
    /counter
      counterSlice.js
    /auth
      authSlice.js
  App.js
```

---

✅ **Slice = state + reducers + actions (auto-generated).**  
That’s why Redux Toolkit feels so much lighter than old Redux.

---
