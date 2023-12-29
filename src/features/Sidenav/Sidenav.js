import React from 'react';
import { Link } from 'react-router-dom'; 
import '../../styles/Sidenav.css'; 

const Sidenav = () => {
  return (
    <div className="sidebar">
      <h2>ALL CATEGORIES</h2>
      <ul>
        <li><Link to="/category/Accessories">Accessories</Link></li>
        <li><Link to="/category/Hydraulic">Hydraulic</Link></li>
        <li><Link to="/category/Lamp">Lamp</Link></li>
        <li><Link to="/category/Cryotronics">Cryotronics</Link></li>
        <li><Link to="/category/Induction">Induction</Link></li>
        <li><Link to="/category/Avionics">Avionics</Link></li>
        <li><Link to="/category/Circuits">Circuits</Link></li>
        <li><Link to="/category/Electronics">Electronics</Link></li>
        <li><Link to="/category/Handwatch">Handwatch</Link></li>
      </ul>
    </div>
  );
};

export default Sidenav;
