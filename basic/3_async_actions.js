const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunk = require("redux-thunk").thunk;
const axios = require("axios");

const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

// state
const initialState = {
  loading: false,
  products: [],
  error: false,
};

// action creator
function fetchRequest() {
  return {
    type: FETCH_REQUEST,
  };
}

function fetchSuccess(products) {
  return {
    type: FETCH_SUCCESS,
    payload: products,
  };
}

function fetchError(error) {
  return {
    type: FETCH_ERROR,
    payload: error,
  };
}

// reducers

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// thunk action creator
const fetchProducts = () => {
  return function (dispatch) {
    dispatch(fetchRequest());
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        dispatch(fetchSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchError());
      });
  };
};

// store
const store = createStore(reducer, applyMiddleware(thunk));
store.dispatch(fetchProducts());
const newState = store.subscribe(() => console.log(store.getState()));
