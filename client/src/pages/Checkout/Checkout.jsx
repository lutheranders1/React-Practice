import React, { Component } from "react";
import "./Checkout.css";
import BuySomething from "../../ui/BuySomething/BuySomething";

import { connect } from 'react-redux';

class Checkout extends Component {
  state = {
    name: "you",
    email: "",
    country: "",
    modalIsOpen: false
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {

    if (!this.props.cart.length)
      return <BuySomething message="Cart is empty to checkout!" />
    
    return (
      <div className="Checkout-Wrapper">
          <i className="fa fa-times Close-Modal" onClick={this.closeModal}></i>
          <p style={{ color: "#000", padding: '20px' }}>
            Thanks <strong>{this.state.name}</strong> for testing my simple Online Shopping Cart!
          </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps, null)(Checkout);
