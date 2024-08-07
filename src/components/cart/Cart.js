// src/components/Cart.js
import React from "react";
import PropTypes from "prop-types";
import "./cart.css";
const Cart = ({ cartId, images, name, handleClick }) => {
  const dummyImage = "https://via.placeholder.com/100"; // Replace with actual dummy image URL
  const filledImages = [
    ...images,
    ...Array(6 - images.length).fill(dummyImage),
  ];

  return (
    <div className="cart" onClick={() => handleClick(cartId)}>
      <div className="cart-images">
        {filledImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Item ${index}`}
            className={`image-${index}`}
          />
        ))}
      </div>
      <p className="cart-name">{name}</p>
    </div>
  );
};

Cart.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
};

export default Cart;
