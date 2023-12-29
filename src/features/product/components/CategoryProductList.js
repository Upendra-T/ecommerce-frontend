import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../styles/ProductList.css'; 
import Sidenav from '../../Sidenav/Sidenav';
import ProductDetails from './ProductDetails'; 

const CategoryProductList = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  console.log("careo"+category);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        
        const response = await axios.get(`http://localhost:8080/products/${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductsByCategory();
  }, [category]);


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
                  <p className="card-text">{product.description}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryProductList;
