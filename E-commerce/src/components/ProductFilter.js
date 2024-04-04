import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductFilter = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'https://dummyjson.com/products';
        if (selectedCategory !== 'All') {
          url += `/category/${selectedCategory}`;
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
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearch = () => {
    setSearchQuery(searchQuery);
  };

  const handleAddToCart = (product) => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity++;
      setCart(updatedCart);
    } else {
      setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleIncrementQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity++;
    setCart(updatedCart);
  };

  const handleDecrementQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
      setCart(updatedCart);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3>Categories</h3>
          <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="All">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <h3>Search Products</h3>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
            />
            <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <h3>Product List</h3>
          <ul className="list-group">
            {products.map((product, index) => (
              <li key={index} className="list-group-item">
                <img src={`https://dummyjson.com/image/400x200/282828?text=${encodeURIComponent(product.title)}`} alt={product.title} />
                <br />
                <strong>Name:</strong> {product.title}
                <br />
                <strong>Price:</strong> ${product.price.toLocaleString()}
                <br />
                <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <h3>Cart</h3>
          {cart.length > 0 ? (
            <ul className="list-group">
              {cart.map((item, index) => (
                <li key={index} className="list-group-item">
                  <strong>Name:</strong> {item.title}
                  <br />
                  <strong>Price:</strong> ${item.price.toLocaleString()}
                  <br />
                  <strong>Quantity:</strong> {item.quantity}
                  <br />
                  <button className="btn btn-primary me-2" onClick={() => handleIncrementQuantity(index)}>+</button>
                  <button className="btn btn-primary me-2" onClick={() => handleDecrementQuantity(index)}>-</button>
                  <button className="btn btn-danger" onClick={() => handleRemoveFromCart(index)}>Remove</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your Cart is empty</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;