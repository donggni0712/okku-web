import React from "react";
import "./pickInfo.css";

const PickInfo = ({ pick }) => {
  return (
    <div className="product-info">
      <img src={pick.image} alt={pick.name} className="product-image" />
      <div className="product-details">
        <h2 className="product-name">{pick.name}</h2>
        <p className="product-price">{pick.price}</p>
        <a href={pick.url} target="_blank" rel="noopener noreferrer">
          <button className="purchase-button">구매하러 가기</button>
        </a>
      </div>
    </div>
  );
};

export default PickInfo;
