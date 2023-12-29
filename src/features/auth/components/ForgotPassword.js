import React, { useState } from 'react';
import '../../../styles/ForgotPassword.css'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    try {

      const response = await fetch('http://localhost:8080/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Error sending reset password email');
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <p className="subtitle">Enter your email to receive a password reset link.</p>
      <div className="input-container">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="button" onClick={handleForgotPassword}>
        Send Reset Link
      </button>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default ForgotPassword;
