// src/components/Carts.js
import React, { useState } from "react";
import Cart from "../cart/Cart";
import "./carts.css";
import useGetCarts from "../../hooks/userGetCart";
import { usePopup } from "../../context/PopupContext";
import NewCartInput from "../createCart/NewCartInput";

const Carts = ({ cartData, setCartData, isPopup = false }) => {
  const { getCartLoading, getCartErro } = useGetCarts(setCartData);
  const { showPopup, hidePopup } = usePopup();
  if (getCartLoading) {
    return <div>Loading...</div>;
  }

  if (getCartErro) {
    return <div>Error fetching data</div>;
  }
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
  const showCartsPopup = (cartData) => {
    console.log(cartData);
    showPopup(
      "bottom",
      <Carts cartData={cartData} setCartData={setCartData} isPopup={true} />
    );
  };
  const handleAddCart = () => {
    console.log(isPopup);
    if (isPopup) {
      showPopup(
        "bottom",
        <NewCartInput
          onBack={showCartsPopup}
          callBackOnSave={callBackSaveCart}
          pickIds={[]}
        />
      );
    } else {
      showPopup(
        "bottom",
        <NewCartInput
          onBack={hidePopup}
          callBackOnSave={callBackSaveCart}
          pickIds={[]}
        />
      );
    }
  };
  // const handleSaveCart = (cartName, cartData, setCartData) => {

  //   showCartsPopup();
  // };
  const callBackSaveCart = (cartName, pickIds) => {
    const updatedCarts = [...cartData, { name: cartName, pickIds: pickIds }];
    setCartData(updatedCarts);
    hidePopup();
  };

  return (
    <div className="carts-container">
      <div className="carts">
        <Cart {...allViewCart} />
        {cartData.map((cart, index) => (
          <Cart key={index} images={cart.picksImages} name={cart.name} />
        ))}
        <div className="add-cart" onClick={handleAddCart}>
          <Cart {...addCart} />
        </div>
      </div>
    </div>
  );
};

export default Carts;
