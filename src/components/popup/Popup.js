import React from "react";
import PropTypes from "prop-types";
import "./popup.css";

const Popup = ({ type, content, onClose }) => {
  if (!type) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className={`popup-content popup-${type}`}
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>
  );
};

Popup.propTypes = {
  type: PropTypes.string,
  content: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
