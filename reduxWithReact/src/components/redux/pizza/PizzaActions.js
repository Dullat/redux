import {
  ORDER_PIZZA,
  ORDER_PIZZA_SUCCESS,
  ORDER_PIZZA_ERROR,
} from "./PizzaTypes";

const orderPizza = () => {
  return {
    type: ORDER_PIZZA,
  };
};

export { orderPizza };
