import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon,MDBCard,MDBCardBody,MDBCardImage} from "mdb-react-ui-kit";


const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    address: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/users/register", formData);
      console.log("User registered:", response.data);
      alert("Registration sucessful Signin to continue");
      navigate('/');
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <MDBInput label='Email' id='form1' type='email' className='w-100' name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg' />
                <MDBInput label='Password' id='form2' type='password' name="password" value={formData.password} onChange={handleChange} required />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg' />
                <MDBInput label='Confirm Password' id='form3' type='password' name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput label='User Type' id='form4' type='text' name="userType" value={formData.userType} onChange={handleChange} required />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="map-marker-alt me-3" size='lg' />
                <MDBInput label='Address' id='form5' type='text' name="address" value={formData.address} onChange={handleChange} required />
              </div>

              <MDBBtn className='mb-4' size='lg' type="submit" onClick={handleSubmit}>Register</MDBBtn>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default SignUpForm;
