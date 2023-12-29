import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = ({ uid, token }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      if (!password || !confirmPassword) {
        setMessage('Please enter both password and confirm password');
        return;
      }

      if (password !== confirmPassword) {
        setMessage('Password and confirm password do not match');
        return;
      }

      // Send a POST request to your backend to reset the password
      const response = await axios.post('http://localhost:8080/users/reset-password', {
        token,
        password,
      });

      // Handle the response as needed
      setMessage(response.data.message);
    } catch (error) {
      console.error('Reset password error:', error);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <div>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleResetPassword}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
