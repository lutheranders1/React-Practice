import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import { get } from 'axios';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, payOrder, deliverOrder } from '../../store/actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../../store/constants/orderConstants';
import { Message, Loader } from '../../components';

const OrderScreen = ({ match, history }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading: ldgDetails, error: errDetails, order } = useSelector((state) => state.orderDetails);
  const { loading: ldgPay, success: sucPay } = useSelector((state) => state.orderPay);
  const { loading: ldgDeliver, success: sucDeliver } = useSelector((state) => state.orderDeliver);
  const dispatch = useDispatch();
  const orderId = match.params.id;

  if (!ldgDetails) {
    //   Calculate prices
    const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    };

    if (!order || sucPay || sucDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, sucPay, sucDeliver, order, history, userInfo]);

  if (ldgDetails || ldgDeliver || ldgPay) {
    return <Loader />;
  }
  if (errDetails) {
    return <Message variant="danger">{errDetails}</Message>;
  }
  return (
    <>
      <h1>Order No: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {/* Shipping info section */}
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            {/* Payment method section */}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            {/* Order items section */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length !== 0 ? (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Message>Order is empty</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        {/* Order summary section */}
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {sdkReady ? (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={(paymentResult) => {
                        dispatch(payOrder(orderId, paymentResult));
                      }}
                    />
                  ) : (
                    <Loader />
                  )}
                </ListGroup.Item>
              )}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={() => {
                      dispatch(deliverOrder(order));
                    }}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
