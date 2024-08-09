import React from "react";
import PropTypes from "prop-types";
import "./pick.css";

const Pick = ({ image, price, name, isSelected, isEditing, onClick }) => {
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className={`pick ${isSelected ? "selected" : ""}`} onClick={onClick}>
      <div className="pick-image-container">
        {isEditing && isSelected && <div className="checkmark">✔</div>}
        <img src={image} alt={name} className="pick-image" />
      </div>
      <div className="pick-price">{formatPrice(price)} 원</div>
      <div className="pick-name">{name}</div>
    </div>
  );
};

Pick.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  isEditing: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Pick;
