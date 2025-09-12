import React from "react";
import { orderPizza } from "./redux/pizza/PizzaActions";
import { connect } from "react-redux";

function PizzaBox(props) {
  console.log(props);
  return (
    <div>
      <p>Total Pizza bases left : 100</p>
      <button className="btn">Make pizza</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  // access to state in store
  return {
    pizzaBase: state.pizzaBase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderPizza: () => dispatch(orderPizza()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PizzaBox);
