// src/components/BottomPopup.js
import React from "react";
import PropTypes from "prop-types";

const BottomPopup = ({ button1, button2 }) => {
  return (
    <div className="bottom-popup">
      <button className="popup-button" onClick={button1.onClick}>
        {button1.text}
      </button>
      <button className="popup-button" onClick={button2.onClick}>
        {button2.text}
      </button>
    </div>
  );
};

BottomPopup.propTypes = {
  button1: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
  button2: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
};

export default BottomPopup;
