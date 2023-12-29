import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: 0,
    stock: 1,
    discountPercentage: 0,
    rating: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setProductData((prevData) => ({
      ...prevData,
      images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in productData) {
        if (key === 'images') {
          for (const image of productData.images) {
            formData.append('images', image);
          }
        } else {
          formData.append(key, productData[key]);
        }
      }

      await axios.post('http://localhost:8080/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProductData({
        title: '',
        description: '',
        price: 0,
        stock: 1,
        discountPercentage: 0,
        rating: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: [],
      });

      window.alert('Product added successfully');
      navigate('/');

    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={productData.title} onChange={handleChange} required />

        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={productData.description} onChange={handleChange}></textarea>

        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" value={productData.price} onChange={handleChange} required />

        <label htmlFor="stock">Stock:</label>
        <input type="number" id="stock" name="stock" value={productData.stock} onChange={handleChange} required />

        <label htmlFor="discountPercentage">Discount Percentage:</label>
        <input type="number" id="discountPercentage" name="discountPercentage" value={productData.discountPercentage} onChange={handleChange} required />

        <label htmlFor="rating">Rating:</label>
        <input type="number" id="rating" name="rating" value={productData.rating} onChange={handleChange} required />

        <label htmlFor="brand">Brand:</label>
        <input type="text" id="brand" name="brand" value={productData.brand} onChange={handleChange} required />

        <label htmlFor="category">Category:</label>
        <input type="text" id="category" name="category" value={productData.category} onChange={handleChange} required />

        <label htmlFor="thumbnail">Thumbnail URL:</label>
        <input type="text" id="thumbnail" name="thumbnail" value={productData.thumbnail} onChange={handleChange} required />

        <label htmlFor="images">Product Images:</label>
        <input type="file" id="images" name="images" onChange={handleFileChange} multiple />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
