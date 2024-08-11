// src/components/CentralPopup.js
import React from "react";
import PropTypes from "prop-types";
import KakaoLoginButton from "../login/kakaologinbutton";

const LoginPopup = ({ title, message, onLoginSuccess }) => {
  return (
    <div className="error-popup">
      <h1 className="central-popup-title">{title}</h1>
      <p className="central-popup-message">{message}</p>
      <KakaoLoginButton onLoginSuccess={onLoginSuccess} />
    </div>
  );
};

LoginPopup.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LoginPopup;
