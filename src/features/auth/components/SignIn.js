// components/SignIn.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import '../../../styles/SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('../signup');
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:8080/users/login/', {
        email,
        password,
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      const { token, uid, usertype } = response.data;
       console.log("utype in signin"+usertype);
      userContext.signIn(token, uid,usertype);

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone" />
        </MDBCol>
        <MDBCol col='4' md='6'>
          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLgEmail' type='email' size="lg" onChange={(e) => setEmail(e.target.value)} value={email} />
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLgPassword' type='password' size="lg" onChange={(e) => setPassword(e.target.value)} value={password} />

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="/fpwd" className="text-decoration-none">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" onClick={handleSignIn}>Sign in</MDBBtn>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR NEW USER</p>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" onClick={handleRegister} style={{ backgroundColor: '#3b5998' }}>
            <MDBIcon fab icon="facebook-f" className="mx-2" />
            REGISTER
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      {error && <div className="error">{error}</div>}
    </MDBContainer>
  );
};

export default SignIn;
