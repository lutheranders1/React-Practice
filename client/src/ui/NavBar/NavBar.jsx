import React from 'react';
import './NavBar.css';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from "../../store/actions/authActions";


const totalPrice = cart => {
  return cart.reduce(
    (accum, product) => accum + product.price * product.quantity,
    0
  );
};

const NavBar = props => (
  <nav className="NavBar-Wrapper">
    <div>
      <Link to="/">
        <p>ShopingReact</p>
      </Link>
    </div>
    {!props.auth.isAuthenticated ?
        <Link to='/login'> Login </Link> :
      <Link to='/logout'>Logout</Link>
    }

    <Link to='/checkout'>Checkout </Link>
    <Link to="/cart">
      <div className="Cart-Info">
        <span className="Cart-Item-Counter">{props.cart.length}</span>
        <p>Cart: ${totalPrice(props.cart)}</p>
      </div>
    </Link>
  </nav>
);

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, null)(NavBar);