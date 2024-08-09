// src/components/CentralPopup.js
import React from "react";
import PropTypes from "prop-types";

const ErrorPopup = ({ title, message, onClick }) => {
  return (
    <div className="central-popup">
      <h1 className="central-popup-title">{title}</h1>
      <p className="central-popup-message">{message}</p>
      <button onClick={onClick}>확인</button>
    </div>
  );
};

ErrorPopup.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ErrorPopup;
