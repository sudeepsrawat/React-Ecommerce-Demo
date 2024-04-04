import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetails = ({ onAddToCart }) => {
  const location = useLocation();
  const product = location.state && location.state.product;

  if (!product) {
    return <div>No product found</div>;
  }

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div>
      <h2>Product Details</h2>
      <div>
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <p>{product.description}</p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={() => window.history.back()} style={{ marginLeft: '10px' }}>Back to Products</button>
      </div>
    </div>
  );
};

export default ProductDetails;
