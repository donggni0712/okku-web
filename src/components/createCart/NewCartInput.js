// src/components/carts/NewCartInput.js
import React, { useState } from "react";
import "./newCartInput.css"; // Import the CSS file for styling
import { createCart } from "../../api/createCart";
import { getCarts } from "../../api/getCarts";
// import backButtonImage from ;

const NewCartInput = ({ onBack, callBackOnSave, pickIds, setCartData }) => {
  const [cartName, setCartName] = useState("");

  const handleSave = async () => {
    const createdCart = await createCart(cartName, pickIds);
    const tempCarts = await getCarts();
    setCartData(tempCarts);
    callBackOnSave();
  };

  return (
    <div className="new-cart-input">
      <div className="header">
        <button className="back-button">
          <img
            src="assets/back-button.png"
            alt="<"
            className="back-button-img"
            onClick={onBack}
          />
        </button>
        <h2 className="title">새 카트의 이름을 입력해주세요</h2>
        <button className="save-button" onClick={handleSave}>
          저장
        </button>
      </div>
      <textarea
        className="text"
        value={cartName}
        onChange={(e) => setCartName(e.target.value)}
        placeholder="새 카트 이름 입력"
      />
    </div>
  );
};

export default NewCartInput;
