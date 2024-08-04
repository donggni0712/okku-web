// src/components/CentralPopup.js
import React from "react";
import PropTypes from "prop-types";

const CentralPopup = ({ message, button1, button2 }) => {
  return (
    <div className="central-popup">
      <p>{message}</p>
      <button onClick={button1.onClick}>{button1.text}</button>
      <button onClick={button2.onClick}>{button2.text}</button>
    </div>
  );
};

CentralPopup.propTypes = {
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
