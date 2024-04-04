import React, { useState, useEffect } from 'react';

const ProductList = ({ category, searchQuery, addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'https://dummyjson.com/products';
        if (category !== 'All') {
          url = `https://dummyjson.com/products/category/${category}`;
        }
        if (searchQuery) {
          url += `/search?q=${encodeURIComponent(searchQuery)}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error('Products array not found in the received data:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [category, searchQuery]);

  return (
    <div className="container mt-3">
      <ul className="list-group">
        {products.map((product, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>Name:</strong> {product.title}
              <br />
              <strong>Price:</strong> ${product.price.toLocaleString()}
            </div>
            <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
