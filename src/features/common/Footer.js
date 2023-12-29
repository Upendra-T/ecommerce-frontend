// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="column">
        <h4>CONTACT US</h4>
        <p>1093 Marigold Lane, Coral Way, Miami, Florida, 33169</p>
        <p>610-403-403</p>
        <p>company@example.com</p>
      </div>

      <div className="column">
        <h4>MY ACCOUNT</h4>
        <ul>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/my-account">My Account</Link></li>
          <li><Link to="/checkout">Checkout</Link></li>
          <li><Link to="/downloads">Downloads</Link></li>
          <li><Link to="/account-details">Account details</Link></li>
        </ul>
      </div>

      <div className="column">
        <h4>CATEGORIES</h4>
        <ul>
        <li><Link to="/category/laptops">Laptops</Link></li>
      <li><Link to="/category/Accessories">Accessories</Link></li>
      <li><Link to="/category/home-decoration">Home decoration</Link></li>
      <li><Link to="/category/groceries">Groceries</Link></li>
      <li><Link to="/category/skincare">Skincare</Link></li>
      <li><Link to="/category/fragrances">Fragrances</Link></li>
        </ul>
      </div>

      <div className="column">
        <h4>INFORMATION</h4>
        <ul>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/delivery">Delivery Information</Link></li>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
        </ul>
      </div>


      <div className="copyright">
        <p>
          Radio Hydraulic Lamp Pro Electron Atomtronics Avionics Cryotronics Induction Spintronics Accessories Electronics Chairs Induction
          Avionics Bar Table Spintronics Bioelectronics Circuits
        </p>
        <p>Designed by Demo Theme. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
