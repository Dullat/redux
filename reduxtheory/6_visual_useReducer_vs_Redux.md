

1. **React’s `useReducer` hook**
    
2. **Redux reducer flow with multiple reducers**
    

---

## 🔹 1. `useReducer` Hook Flow

```mermaid
flowchart TB
    E[Event Handler] --> A[Action]
    A --> D["currentState,dispatch(action)"]

    subgraph Reducer
        R[Reducer Function]
    end

    D --> R
    R -->|currentState + action| NS[New State]
    NS --> UI[UI Re-render]
    UI -.->|Triggers new events| E

```

---

## 🔹 2. Redux Flow with Multiple Reducers

```mermaid
flowchart TB
    E[Event Handler] --> AG["Action Creator (optional)"]
    AG --> A[Action]
    A --> D["dispatch(action)"]
    D --> S[Store]

    subgraph Reducers
        R1[Reducer 1]
        R2[Reducer 2]
        R3[Reducer 3]
    end

    S --> R1
    S --> R2
    S --> R3

    R1 & R2 & R3 --> M[Combine Reducers]
    M --> NS[Next State in Store]
    NS --> UI[UI Re-render]
    UI -.->|Triggers new events| E

```

---

⚡ Difference in words:

- **useReducer** → action goes directly to one reducer function.
    
- **Redux** → action flows through `dispatch` → store → multiple reducers (combined). Each reducer handles its slice, results are merged into a new state → re-render happens.
    

---
# Redux with React

```mermaid
flowchart TB
    subgraph React_Component
        E["Event Handler (onClick, etc.)] --> UD[useDispatch()"]
        US["useSelector()"] --> UI[UI Render]
    end

    UD --> A[Action]
    A --> D["action, dispatch(action)"]
    D --> S[Store]

    subgraph Reducers
        R1[Reducer 1]
        R2[Reducer 2]
        R3[Reducer 3]
    end

    S --> R1
    S --> R2
    S --> R3
    R1 & R2 & R3 --> M[Combine Reducers]
    M --> NS[Next State in Store]

    NS --> US
    UI -.->|Triggers new events| E

```