const redux = require("redux");
const createStore = redux.createStore;

const ORDER_PIZZA = "ORDER_PIZZA";

// const action = {
//   type: ORDER_PIZZA,
//   shop_name: "Pizza shop",
// };

// Action () => {

function orderPizza() {
  return {
    type: ORDER_PIZZA,
    shop_name: "Pizza shop",
  };
}

// Reducer

const initialState = {
  pizzaBase: 100,
  toppings: ["cheese", "capsicum"],
};

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

const store = createStore(reducer); // why not state ? coz reducer alrey has initialState

console.log(store.getState());
