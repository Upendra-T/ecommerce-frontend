import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidenav from '../../Sidenav/Sidenav';
import ProductDetails from './ProductDetails';
import { FaShoppingCart, FaHeart, FaShoppingBag } from 'react-icons/fa';
import '../../../styles/ProductList.css';

const SearchedProductList = ({ category, title }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchSearchedProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/prod/${category}/${title}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching searched products:', error);
      }
    };

    fetchSearchedProducts();
  }, [category, title]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className='productlist'>
      <Sidenav />
      <div className="product-list-container">
        {selectedProduct ? (
          <ProductDetails
            product={selectedProduct}
            onClose={handleCloseProductDetails}
          />
        ) : (
          products.map(product => (
            <div key={product.id} className="product-box" onClick={() => handleProductClick(product)}>
              <div className="card" style={{ width: '18rem' }}>
                <img src={product.thumbnail} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">
                    ${product.price}{' '}
                    <strike>
                      ${(
                        product.price - (product.price * (product.discountPercentage / 100))
                      ).toFixed(2)}
                    </strike>
                  </p>
                  <div className="product-icons">
                    <FaShoppingCart className="icon" />
                    <FaHeart className="icon" />
                    <FaShoppingBag className="icon" />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchedProductList;
