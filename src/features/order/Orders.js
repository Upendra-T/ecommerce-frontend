import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from '../../contexts/UserContext';
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const {token}=useContext(UserContext);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/orders/user?uid=${userId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Fetch orders error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId,token]);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (orders.length === 0) {
    return <div>No orders available.</div>;
  }

  const renderOrders = () => {
    const rows = [];
    for (let i = 0; i < orders.length; i += 3) {
      const rowOrders = orders.slice(i, i + 3);
      const cols = rowOrders.map((order) => (
        <MDBCol key={order._id} className="col-md-4 col-lg-4 col-xl-4">
          <MDBCard className="rounded-3 mb-4">
            <MDBCardBody className="p-4">
              <img
                src={order.pthumbnail || "placeholder_image_url"}
                alt={order.ptitle || "Product Thumbnail Not Available"}
                className="img-fluid rounded-3 mb-3"
                style={{ width: "150px", height: "150px" }}
              />
              <MDBTypography tag="h6" className="mb-0">
                Order Date: {new Date(order.orderDate).toLocaleString()}
              </MDBTypography>
              <p className="text-muted">Product: {order.ptitle}</p>
              <p className="text-muted">Quantity: {order.quantity}</p>
              <p className="text-muted">Address: {order.address}</p>
              <p className="mb-0">Total Price: ${order.totalPrice.toFixed(2)}</p>
              
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      ));
      rows.push(<MDBRow key={i} className="mb-4">{cols}</MDBRow>);
    }
    return rows;
  };

  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        {renderOrders()}
      </MDBContainer>
    </section>
  );
};

export default Orders;
