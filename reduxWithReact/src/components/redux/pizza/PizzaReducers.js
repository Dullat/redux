import {
  ORDER_PIZZA,
  ORDER_PIZZA_SUCCESS,
  ORDER_PIZZA_ERROR,
} from "./PizzaTypes";
const initialState = {
  loading: false,
  pizzaBase: 100,
  error: "",
};

const pizzaReducer = (state = initialState, action) => {
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

export default pizzaReducer;
