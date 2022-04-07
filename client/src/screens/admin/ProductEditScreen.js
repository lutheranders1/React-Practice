import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { post } from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, updateProduct } from '../../store/actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../../store/constants/productConstants';
import { Message, Loader, FormContainer } from '../../components';

const ProductEditScreen = ({ match, history }) => {
  const [info, setInfo] = useState({ name: '', price: 0, brand: '', category: '', countInStock: 0, description: '' });
  const { name, price, brand, category, countInStock, description } = info;
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const { loading: ldgDetails, error: errDetails, product } = useSelector((state) => state.productDetails);
  const { loading: ldgUpdate, error: errUpdate, success } = useSelector((state) => state.productUpdate);
  const dispatch = useDispatch();
  const productId = match.params.id;

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId));
    } else {
      setInfo(product);
      setImage(product.image);
    }
  }, [dispatch, history, productId, product, success]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const { data } = await post('/api/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setImage(data);
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ _id: productId, name, price, image, brand, category, description, countInStock }));
  };

  const changeHandler = (e) => setInfo({ ...info, [e.target.name]: e.target.value });

  if (ldgUpdate || ldgDetails) {
    return <Loader />;
  }
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Add / Edit Product</h1>
        {errUpdate && <Message variant="danger">{errUpdate}</Message>}
        {errDetails && <Message variant="danger">{errDetails}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" name="name" placeholder="Enter name" value={name} onChange={changeHandler} />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" placeholder="Enter price" value={price} onChange={changeHandler} />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              name="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler} />
            {uploading && <Loader />}
          </Form.Group>
          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control type="text" name="brand" placeholder="Enter brand" value={brand} onChange={changeHandler} />
          </Form.Group>
          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              name="countInStock"
              placeholder="Enter countInStock"
              value={countInStock}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              placeholder="Enter category"
              value={category}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Enter description"
              value={description}
              onChange={changeHandler}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Add / Update Product
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
