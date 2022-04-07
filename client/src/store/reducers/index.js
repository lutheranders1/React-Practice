import { combineReducers } from 'redux';
import productsReducer from './products';
import cartReducer from './cart'; 
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
  errors: errorReducer
});

export default rootReducer;