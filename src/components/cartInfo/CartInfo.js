// src/components/CartInfo.js
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./cartinfo.css";

const CartInfo = ({ cartName, userName, handleDeleteCart }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="cart-info">
      <div className="cart-header">
        <button className="back-button" onClick={handleBack}>
          &lt;
        </button>
        <button className="delete-button" onClick={handleDeleteCart}></button>
      </div>
      <div className="cart-details">
        <h2 className="cart-name">{cartName}</h2>
        <p className="user-name">{userName}</p>
      </div>
    </div>
  );
};

CartInfo.propTypes = {
  cartName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CartInfo;
