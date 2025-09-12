const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const loggerRedux = require("redux-logger");
const logger = loggerRedux.createLogger();

// action
const REDUCE_PLATES = "REDUCE_PLATES";

const getPlateAction = {
  type: REDUCE_PLATES,
};

// Reducer
const initialState = {
  plates: 100,
};

const reducerPlates = (state = initialState, action) => {
  switch (action.type) {
    case REDUCE_PLATES:
      return {
        ...state,
        plates: state.plates - 1,
      };
    default:
      return state;
  }
};

// createStore

const store = createStore(reducerPlates, applyMiddleware(logger));

store.dispatch(getPlateAction);
store.dispatch(getPlateAction);
store.dispatch(getPlateAction);

console.log(store.getState());
