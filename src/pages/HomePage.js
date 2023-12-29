// Home.js
import React from 'react';
import Carousels from './Carousels';
import Sidenav from '../features/Sidenav/Sidenav';
import '../styles/Home.css'
const HomePage = () => {
  return (
    <div className="home-container">
    <Sidenav/><Carousels/>
    </div>
  );
};

export default HomePage;
