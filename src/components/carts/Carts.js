// src/components/Carts.js
import React from "react";
import Cart from "../cart/Cart";
import "./carts.css";

const Carts = ({ carts, onAdd }) => {
  const allViewCart = {
    images: [
      "https://velog.velcdn.com/images/donggni0712/post/78796e22-ec1e-421b-840d-29060d4d6b49/image.png",
    ],
    name: "내 픽",
  };
  const addCart = {
    images: [
      "https://velog.velcdn.com/images/donggni0712/post/2be73667-7ed3-4e54-8f01-be0cbc450a83/image.png",
    ],
    name: "카트 추가",
  };

  return (
    <div className="carts-container">
      <div className="carts">
        <Cart {...allViewCart} />
        {carts.map((cart, index) => (
          <Cart key={index} images={cart.picksImages} name={cart.name} />
        ))}
        <div className="add-cart" onClick={onAdd}>
          <Cart {...addCart} />
        </div>
      </div>
    </div>
  );
};

export default Carts;
