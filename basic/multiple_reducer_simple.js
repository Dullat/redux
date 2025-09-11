const redux = require("redux");
const createStore = redux.createStore;

const ORDER_PIZZA = "ORDER_PIZZA";
const ORDER_BURGER = "ORDER_BURGER";
const ADD_TOPPINGS = "ADD_TOPPINGS";

// actions

function orderPizza() {
  return {
    type: ORDER_PIZZA,
    shop_name: "Pizza shop",
  };
}

function orderBurger() {
  return {
    type: ORDER_BURGER,
    shop_name: "Burger shop",
  };
}

function addToppings(topping) {
  return {
    type: ADD_TOPPINGS,
    topping,
  };
}

// Reducer

const initialState = {
  pizzaBase: 100,
  toppings: ["cheese", "capsicum"],
  burgerBuns: 100,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_PIZZA:
      return {
        ...state,
        pizzaBase: state.pizzaBase - 1,
      };
    case ORDER_BURGER:
      return {
        ...state,
        burgerBuns: state.burgerBuns - 1,
      };
    case ADD_TOPPINGS:
      return {
        ...state,
        toppings: [...state.toppings, action.topping],
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
store.dispatch(orderBurger());
store.dispatch(addToppings("matata"));

unsubscribe();

store.dispatch(orderPizza());
