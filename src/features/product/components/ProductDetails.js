import React, { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { MDBCol, MDBContainer, MDBRow, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import '../../../styles/ProductDetails.css';
import axios from 'axios';
import { UserContext } from '../../../contexts/UserContext';

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { uid } = useContext(UserContext);
  const {token}=useContext(UserContext);
  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:8080/carts', {
        pid: product._id,
        uid,
        quantity,
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Add to Cart response:', response.data);
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Add to Cart error:', error);
      alert('Error adding the product to the cart. Please try again.');
    }
  };

  const handleBuyNow = async () => {
    try {
      console.log('Buy Now:', {
        product,
        quantity,
      });

      const response = await axios.post('http://localhost:8080/orders', {
        pid: product._id,
        uid,
        quantity,
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Order response:', response.data);
      alert('Order placed successfully!');

    } catch (error) {
      console.error('Buy Now error:', error);
      alert('Error placing the order. Please try again.');
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBRow>
        <MDBCol md="6">
          <img src={product.thumbnail} alt={product.title} className="img-fluid" />
        </MDBCol>
        <MDBCol md="6">
          <MDBTypography tag="h2" className="mb-3">
            {product.title}
          </MDBTypography>
          <p className="mb-4">{product.description}</p>
          <Form.Group controlId="quantitySelector" className="mb-4">
            <Form.Label>Quantity:</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
          <div className="mb-4">
            <MDBBtn color="primary" className="me-3" onClick={handleAddToCart}>
              Add to Cart
            </MDBBtn>
            <MDBBtn color="success" onClick={handleBuyNow}>
              Buy Now
            </MDBBtn>
          </div>
          <MDBBtn color="secondary" onClick={() => navigate(-1)}>
            Back
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ProductDetails;
