// src/components/CentralPopup.js
import React from "react";
import PropTypes from "prop-types";

const PickErrorPopup = () => {
  return (
    <div className="central-popup">
      <h1 className="central-popup-title">지원하지 않는 쇼핑몰입니다</h1>
      <a href="https://open.kakao.com/o/g3EpAvFg" className="shopping-button">
        <img src="assets/shopping.png" />
        쇼핑몰 추가해달라고 하기
      </a>
    </div>
  );
};

export default PickErrorPopup;
