import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import '../../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const userContext = useContext(UserContext);
  const { usertype } = userContext;
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({ category: 'all', productName: '' });

  const handleSignOut = () => {
    userContext.signOut();
    navigate('/');
  };

  const handleSearch = () => {
    navigate(`/searchedproducts/${searchData.category}/${searchData.productName}`);

  };

  return (
    <div>
      <header className="header">
        <Link to="/" className="brand">
          <img src="https://pixeltemplate.com/wordpress/shopeur/wp-content/themes/Shopeur/images/webi/logo.png" alt="Shopeur Logo" style={{ height: '40px', width: '100px' }} className="icontitle" />
        </Link>
        <div className="search-bar">
          {/* Dropdown List for Categories */}
          <select
            className="categories-dropdown"
            value={searchData.category}
            onChange={(e) => setSearchData({ ...searchData, category: e.target.value })}
          >
            <option value="all">All Categories</option>
            <option value="Accessories">Accessories</option>
            <option value="home-decoration">Home decoration</option>
            <option value="groceries">Groceries</option>
            <option value="skincare">Skincare</option>
            <option value="fragrances">fragrances</option>
            <option value="laptops">Laptops</option>
            <option value="smartphones">Smartphones</option>
            <option value="Electronics">Electronics</option>
          </select>

          <input
            type="text"
            placeholder="Search Products..."
            className="search-input"
            value={searchData.productName}
            onChange={(e) => setSearchData({ ...searchData, productName: e.target.value })}
          />
      
          <button type="button" className="search-button yellow-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="user-cart">
          {userContext.uid ? (
            <>
              <p className="welcome" style={{color:"black"}}>Welcome</p>
              <Link to="/cart" className="cart-link">
                <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                My Cart
              </Link>
              <button type="button" onClick={handleSignOut} className="sign-out-button">
                Sign Out
              </button>
            </>
          ) : (
            <div className="sign-in-container">
              <Link to="/signin" className="col-md-12 mb-4">
                <button type="button" className="btn btn-elegant">
                  <FontAwesomeIcon icon={faUser} className="pr-2" />
                  My Account (Signin)
                </button>
              </Link>
             
              <Link to="/cart" className="cart-link">
                <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                Cart
              </Link>
            </div>
          )}
        </div>
      </header>

  
      <nav className="horizontal-navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li>
            <Link to="/blog">Blog</Link>
            <ul className="dropdown">
              <li><Link to="/blog/category1">Category 1</Link></li>
              <li><Link to="/blog/category2">Category 2</Link></li>
            </ul>
          </li>
          <li>
            <Link to="/pages">Pages</Link>
            <ul className="dropdown">
              <li><Link to="/pages/about">About</Link></li>
              <li><Link to="/pages/contact">Contact</Link></li>
            </ul>
          </li>
          <li><Link to="/contactus">Contact Us</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          {usertype === 'seller' && (
            <li><Link to="/addproduct">Add Product</Link></li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
