import React from "react";
import "./pick.css"; // Create a CSS file for styling

const Pick = ({ image, price, name }) => {
  return (
    <div className="pick">
      <img src={image} alt={name} className="pick-image" />
      <div className="pick-price">{price}</div>
      <div className="pick-name">{name}</div>
    </div>
  );
};

export default Pick;
