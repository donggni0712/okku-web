// src/components/CentralPopup.js
import React from "react";
import PropTypes from "prop-types";

const CentralPopup = ({ title, message, button1, button2 }) => {
  return (
    <div className="central-popup">
      <h1 className="central-popup-title">{title}</h1>
      <p className="central-popup-message">{message}</p>
      <button onClick={button1.onClick}>{button1.text}</button>
      <button onClick={button2.onClick}>{button2.text}</button>
    </div>
  );
};

CentralPopup.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  button1: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
  button2: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
};

export default CentralPopup;
