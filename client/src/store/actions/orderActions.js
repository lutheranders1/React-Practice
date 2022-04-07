import { post, put, get } from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const { userLogin } = getState();
    const { data } = await post(`/api/orders`, order, {
      headers: { Authorization: `Bearer ${userLogin.userInfo.token}` }
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { userLogin } = getState();
    const { data } = await get(`/api/orders/${id}`, {
      headers: { Authorization: `Bearer ${userLogin.userInfo.token}` }
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });
    const { userLogin } = getState();
    const { data } = await put(`/api/orders/${orderId}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${userLogin.userInfo.token}` }
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });
    const { userLogin } = getState();
    const { data } = await get(`/api/orders/myorders`, {
      headers: { Authorization: `Bearer ${userLogin.userInfo.token}` }
    });
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { userLogin } = getState();
    const config = {
      headers: { Authorization: `Bearer ${userLogin.userInfo.token}` }
    };
    const { data } = await get(`/api/orders`, config);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });
    const { userLogin } = getState();
    const { data } = await put(
      `/api/orders/${order._id}/deliver`,
      {},
      { headers: { Authorization: `Bearer ${userLogin.userInfo.token}` } }
    );
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};
