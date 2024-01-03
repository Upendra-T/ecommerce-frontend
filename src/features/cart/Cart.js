import React, { useState, useEffect, useContext } from 'react';
import { Form } from 'react-bootstrap';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { uid, token } = useContext(UserContext);
  const navigate = useNavigate();

  // Address state and functions
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [showAddNewAddress, setShowAddNewAddress] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!uid) {
          alert('Please log in');
          return;
        }

        const response = await axios.get(`http://localhost:8080/carts?uid=${uid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCartItems(response.data.cartItems);
      } catch (error) {
        console.error('Fetch cart items error:', error);
      }
    };

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

    fetchCartItems();
    fetchAddresses();
  }, [uid, token]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, cartItem) => total + (cartItem.totalPrice || 0), 0);
  };

  const handleBuyNow = async () => {
    try {
      if (!uid) {
        console.log('Please log in to proceed with the purchase');
        return;
      }

      if (!selectedAddress) {
        alert('Please select an address to proceed with the order.');
        return;
      }

      const response = await axios.post('http://localhost:8080/cartorder/cart', {
        uid,
        address: selectedAddress.address,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Purchase successful:', response.data);
      alert('Order placed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Buy Now error:', error);
      alert('Error placing the order. Please try again.');
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      if (!uid) {
        console.log('Please log in to remove the product');
        return;
      }

      const response = await axios.delete('http://localhost:8080/carts', {
        data: { uid, pid: productId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(response.data.cart.products);
      alert('Removed from cart');
      navigate('/');
    } catch (error) {
      console.error('Remove product error:', error);
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
    <section className="h-100" style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5 h-100">
        <MDBCol md="10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
              Shopping Cart
            </MDBTypography>
            <div>
              <p className="mb-0">
                <span className="text-muted">Sort by:</span>
                <a href="#!" className="text-body">
                  price
                  <MDBTypography tag="i" fas icon="angle-down" className="mt-1" />
                </a>
              </p>
            </div>
          </div>

          {cartItems.map((cartItem) => (
            <MDBCard key={cartItem._id} className="rounded-3 mb-4">
              <MDBCardBody className="p-4">
                {cartItem.products && cartItem.products.map((item) => (
                  <MDBCol key={item.pid} md="12">
                    <MDBCol md="2">
                      <img
                        src={item.pthumbnail || 'placeholder_image_url'}
                        alt={item.ptitle || 'Product Title Not Available'}
                        className="img-fluid"
                      />
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBTypography tag="h6" className="mb-0">
                        {item.ptitle || 'Product Title Not Available'}
                      </MDBTypography>
                      <p className="text-muted">Price: ${item.pprice?.toFixed(2) || 0}</p>
                      <p className="text-muted">Quantity: {item.quantity || 0}</p>
                    </MDBCol>
                    <MDBCol md="4" className="text-end">
                      <p className="mb-0">Amount: ${item.pprice * item.quantity?.toFixed(2) || 0}</p>
                      <MDBBtn color="danger" size="sm" onClick={() => handleRemoveProduct(item.pid)}>
                        Remove
                      </MDBBtn>
                    </MDBCol>
                  </MDBCol>
                ))}
              </MDBCardBody>
            </MDBCard>
          ))}

          <MDBCard className="mb-4">
            <MDBCardBody className="p-4 d-flex justify-content-between">
              <MDBTypography tag="h5" className="mb-0">
                Total Price:
              </MDBTypography>
              <MDBTypography tag="h5" className="mb-0">
                ${calculateTotalPrice().toFixed(2)}
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>

          {/* Address Section */}
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
            {/* Add New Address Section */}
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
            <MDBBtn color="warning" block size="lg" onClick={handleBuyNow}>
              Buy Now
            </MDBBtn>
            <br/><br/>
            <MDBBtn color="secondary" onClick={() => navigate(-1)}>
              Back
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBContainer>
    </section>
  );
};

export default Cart;
