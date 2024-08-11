// src/components/CentralPopup.js
import React from "react";
import PropTypes from "prop-types";
import KakaoLoginButton from "../login/kakaologinbutton";
import InviteButton from "../login/Invitebutton";

const InvitePopup = ({ title, message }) => {
  return (
    <div className="error-popup">
      <h1 className="central-popup-title">{title}</h1>
      <p className="central-popup-message">{message}</p>
      <InviteButton />
    </div>
  );
};

InvitePopup.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default InvitePopup;
