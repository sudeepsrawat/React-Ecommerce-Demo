// App.js
import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductFilter from './components/ProductFilter';
import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  return (
    <div className="App">
      <ProductFilter onSearch={handleSearch} />
      <ProductList searchQuery={searchQuery} addToCart={addToCart} />
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
}

export default App;
