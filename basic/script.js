const redux = require("redux");
const createStore = redux.createStore;

const ORDER_PIZZA = "ORDER_PIZZA";

// const action = {
//   type: ORDER_PIZZA,
//   shop_name: "Pizza shop",
// };

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

// Store needs to hold application state
const store = createStore(reducer); // why not state ? coz reducer alrey has initialState

// methods exposed by store
console.log(store);

// Register listener
const unsubscribe = store.subscribe(() =>
  console.log("Updated state", store.getState()),
);

// dispatch action , Allows state to updated
store.dispatch(orderPizza());
store.dispatch(orderPizza());
store.dispatch(orderPizza());

unsubscribe();

store.dispatch(orderPizza());
