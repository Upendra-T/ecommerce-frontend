import React from 'react';
import { Link } from 'react-router-dom'; 
import '../../styles/Sidenav.css'; 

const Sidenav = () => {
  return (
    <div className="sidebar">
      <h2>ALL CATEGORIES</h2>
      <ul>
      <li><Link to="/category/Accessories">Accessories</Link></li>
      <li><Link to="/category/home-decoration">Home decoration</Link></li>
      <li><Link to="/category/groceries">Groceries</Link></li>
      <li><Link to="/category/skincare">Skincare</Link></li>
      <li><Link to="/category/fragrances">Fragrances</Link></li>
      <li><Link to="/category/laptops">Laptops</Link></li>
      <li><Link to="/category/smartphones">Smartphones</Link></li>
      <li><Link to="/category/Electronics">Electronics</Link></li>

      </ul>
    </div>
  );
};

export default Sidenav;
