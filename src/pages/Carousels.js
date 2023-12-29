import React from 'react';
import { Carousel } from 'react-bootstrap';
import "../styles/Carsouels.css"

const Carousels = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/1093236/pexels-photo-1093236.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="First slide"
          style={{ height: '400px', width: '700px' }}
        />
        <Carousel.Caption>
          <h3>Exicting Products</h3>
          <p>Buy now</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://c0.wallpaperflare.com/preview/454/428/963/airpod-iphone-nespresso-gadget.jpg"  
          alt="Second slide"
          style={{ height: '400px', width: '700px' }}
        />
        <Carousel.Caption>
          <h3>80-90% Discount</h3>
          <p>Discount on all products</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/1072851/pexels-photo-1072851.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Third slide"
          style={{ height: '400px', width: '700px' }}
        />
        <Carousel.Caption>
          <h3>Shop now</h3>
          <p>
            All type of products available
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;
