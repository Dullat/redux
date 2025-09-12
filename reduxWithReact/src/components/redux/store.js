import { createStore } from "redux";
import pizzaReducer from "./pizza/PizzaReducers";
export default createStore(pizzaReducer);
