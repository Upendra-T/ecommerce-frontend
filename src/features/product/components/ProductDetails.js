import React, { useState, useEffect, useContext } from 'react';
import { Form } from 'react-bootstrap';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../../contexts/UserContext';

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [showAddNewAddress, setShowAddNewAddress] = useState(false);
  const navigate = useNavigate();
  const { uid, token } = useContext(UserContext);
  console.log(uid+"inpagdet");
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/address`, {
          params: {
            uid,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setAddresses(response.data.addresses);
        
        if (response.data.defaultAddress) {
          setSelectedAddress(response.data.defaultAddress);
        }
      } catch (error) {
        console.error('Fetch Addresses error:', error);
      }
    };
  
    fetchAddresses();
  },[uid,token]);
  

  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:8080/carts', {
        pid: product._id,
        uid,
        quantity,
        addressId: selectedAddress?._id,
      }, {
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
      const response = await axios.post('http://localhost:8080/orders', {
        pid: product._id,
        uid,
        quantity,
        address: selectedAddress.address,
      }, {
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

  const handleAddressChange = (addressId) => {
    const selected = addresses.find((address) => address._id === addressId);
    setSelectedAddress(selected);
  };

  const handleAddNewAddress = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/address`, {
        uid,
        address: newAddress,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAddresses([...addresses, response.data.address]);
      setSelectedAddress(response.data.address);
      setNewAddress('');

      console.log('Add New Address response:', response.data);
      alert('New address added successfully!');
    } catch (error) {
      console.error('Add New Address error:', error);
      alert('Error adding the new address. Please try again.');
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

          {showAddNewAddress && (
            <Form.Group controlId="newAddress" className="mb-4">
              <Form.Label>Add New Address:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new address"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </Form.Group>
          )}

          <Form.Group controlId="addressSelector" className="mb-4">
            <Form.Label>Select Address:</Form.Label>
            <Form.Control as="select" value={selectedAddress?._id} onChange={(e) => handleAddressChange(e.target.value)}>
              <option value="" disabled>Select an address</option>
              {selectedAddress && (
                <option value={selectedAddress._id}>
                  {selectedAddress.address} (Default)
                </option>
              )}
              {addresses.map((address) => (
                <option key={address._id} value={address._id}>
                  {address.address}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <div className="mb-4">
            {/* Buttons */}
            {showAddNewAddress && (
              <MDBBtn color="primary" onClick={handleAddNewAddress}>
                Save New Address
              </MDBBtn>
            )}
            <MDBBtn color={showAddNewAddress ? 'secondary' : 'primary'} onClick={() => setShowAddNewAddress(!showAddNewAddress)}>
              {showAddNewAddress ? 'Cancel' : 'Add New Address'}
            </MDBBtn>
            <br/><br/>
            <MDBBtn color="primary" className="me-3" onClick={handleAddToCart}>
              Add to Cart
            </MDBBtn>
            <MDBBtn color="success" onClick={handleBuyNow}>
              Buy Now
            </MDBBtn>
            <br/><br/>
            <MDBBtn color="secondary" onClick={() => navigate(-1)}>
              Back
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ProductDetails;
