

---

# 📝 Redux Toolkit Notes

---

## 1. Store Setup

- `configureStore({ reducer, middleware, devTools })`
    
    - Replaces `createStore`.
        
    - Auto includes **redux-thunk**, **devTools**, and helpful checks.
        

---

## 2. Slice

- `createSlice({ name, initialState, reducers })`
    
    - Bundles **state + reducers + actions**.
        
    - Exports:
        
        - `slice.reducer` → plug into store.
            
        - `slice.actions` → auto-generated action creators.
            
- Reducers use **Immer** → write “mutating” code but RTK keeps immutability.
    

---

## 3. React Integration

- `useSelector(state => state.sliceName.key)` → read state.
    
- `useDispatch()` → get dispatch function.
    
- Dispatch actions: `dispatch(slice.actions.someAction(payload))`.
    

---

## 4. Async Logic

- `createAsyncThunk(type, payloadCreator)` → handles async calls.
    
- Auto creates lifecycle actions:
    
    - `pending`
        
    - `fulfilled`
        
    - `rejected`
        
- Handle them in slice via `extraReducers`.
    

---

## 5. Middleware

- Built-in:
    
    - `thunk` → async logic.
        
    - `serializableCheck` → warns on non-serializable state.
        
    - `immutableCheck` → warns on accidental mutation.
        
- Custom middleware = `(store) => (next) => (action) => {}`.
    

---

## 6. Selectors

- Simple: `state.slice.key`.
    
- Derived: compute from state.
    
- Use **Reselect** for memoization.
    
- Keep selectors reusable and colocated with slice.
    

---

## 7. RTK Query

- `createApi({ reducerPath, baseQuery, endpoints })`.
    
- Auto generates React hooks for queries & mutations.
    
- Handles:
    
    - Loading/error states.
        
    - Caching & invalidation.
        
    - Auto refetch on args change.
        
- Replaces most manual thunk logic for data fetching.
    

---

## 8. Best Practices

- **Feature-based structure** → `/features/posts/postsSlice.js`.
    
- **Normalize state** → use objects `{id: entity}` instead of arrays.
    
- Keep reducers **pure** → no async/side effects.
    
- Use `extraReducers` for async thunks or cross-slice actions.
    

---

## 9. Testing

- Reducers → pure function tests.
    
- Thunks → mock API & assert dispatch sequence.
    
- Selectors → test derived data.
    
- Integration → render with `<Provider store={store}>`.
    

---

# ✅ Redux Toolkit = Redux made simple

- Less boilerplate.
    
- Async baked in (`createAsyncThunk`).
    
- Data fetching powerhouse (`RTK Query`).
    
- Good defaults (middleware, devTools).
    
- Works smoothly with React hooks.
    

---
