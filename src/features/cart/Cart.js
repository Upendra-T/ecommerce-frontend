import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';
import axios from "axios";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";



const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { uid } = useContext(UserContext);
  const {token}=useContext(UserContext);
  const navigate = useNavigate();
  console.log(token);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!uid) {
          alert("Please log in");
          return;
        }
  
        const response = await axios.get(`http://localhost:8080/carts?uid=${uid}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
  
        setCartItems(response.data.cartItems);
      } catch (error) {
        console.error("Fetch cart items error:", error);
      }
    };
  
    fetchCartItems(); 
  }, [uid, token]); 

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, cartItem) => total + (cartItem.totalPrice || 0), 0);
  };

  const handleBuyNow = async () => {
    try {
      if (!uid) {
        console.log("Please log in to proceed with the purchase");
        return;
      }

      const response = await axios.post("http://localhost:8080/cartorder/cart", { uid },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Purchase successful:", response.data);
      alert("order successfully placed");
      navigate("/");
    } catch (error) {
      console.error("Buy Now error:", error);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      if (!uid) {
        console.log("Please log in to remove the product");
        return;
      }

      const response = await axios.delete("http://localhost:8080/carts", { data: { uid, pid: productId },
      headers: {
        Authorization: `Bearer ${token}`,
      }, });
      setCartItems(response.data.cart.products);
      alert('removed from cart');
      navigate('/');
    } catch (error) {
      console.error("Remove product error:", error);
    }
  };

  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                Shopping Cart
              </MDBTypography>
              <div>
                <p className="mb-0">
                  <span className="text-muted">Sort by:</span>
                  <a href="#!" className="text-body">
                    price <MDBIcon fas icon="angle-down" className="mt-1" />
                  </a>
                </p>
              </div>
            </div>
            {cartItems.map((cartItem) => (
              <MDBCard key={cartItem._id} className="rounded-3 mb-4">
                <MDBCardBody className="p-4">
                  {cartItem.products && cartItem.products.map((item) => (
                    <MDBRow key={item.pid} className="justify-content-between align-items-center">
                      <MDBCol md="2">
                        <img
                          src={item.pthumbnail || "placeholder_image_url"}
                          alt={item.ptitle || "Product Title Not Available"}
                          className="img-fluid"
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBTypography tag="h6" className="mb-0">
                          {item.ptitle || "Product Title Not Available"}
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
                    </MDBRow>
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

            <MDBBtn color="warning" block size="lg" onClick={handleBuyNow}>
              Buy Now
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Cart;
