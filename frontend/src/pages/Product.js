import React from 'react';
import { Typography } from "@mui/material";
import './ProductList.css'; // Add this for custom styling
import hen from '../assets/images/hens.jpg'
import catFishs from '../assets/images/images-3.jpeg'
import catFish from '../assets/images/images.jpeg'
import turkey from '../assets/images/turkey-2.jpg'

const ProductList = () => {
  // Dynamic product data with images
  const products = [
    {
      id: 1,
      name: "Organic Chicken",
      category: "Poultry",
      price: 20.0,
      stock: 50,
      img: hen,
    //   img: "https://via.placeholder.com/150/FF6347/FFFFFF?text=Chicken",
  
    },
    {
      id: 2,
      name: "Fresh Tilapia",
      category: "Fish",
      price: 15.0,
      stock: 100,
      img: catFishs,
    //   img: "https://via.placeholder.com/150/4682B4/FFFFFF?text=Tilapia",
    },
    {
      id: 3,
      name: "Broiler Feed",
      category: "Feed",
      price: 25.0,
      stock: 200,
      img: catFish,
    //   img: "https://via.placeholder.com/150/32CD32/FFFFFF?text=Feed",
    },
    {
      id: 4,
      name: "Vitamin Supplements",
      category: "Medicine",
      price: 30.0,
      stock: 30,
      img: turkey,
    //   img: "https://via.placeholder.com/150/FF4500/FFFFFF?text=Supplements",
    },
  ];

  return (
    <div className="product-list-container">
      {/* <h2>Product Listing</h2> */}
         <Typography variant="h4" gutterBottom className='text-center'>
         Products
        </Typography>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.img} alt={product.name} className="product-image" />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price.toFixed(2)}</p>
              <p>Stock: {product.stock} available</p>
              <button className="buy-button">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
