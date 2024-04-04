import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
  return (
    <div className="container mt-3">
      <ul className="list-group">
        {cartItems.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {item.title} - ${item.price}
            <button className="btn btn-danger" onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
