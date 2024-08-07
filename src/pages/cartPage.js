// src/components/Main.js
import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { usePopup } from "../context/PopupContext";
import CentralPopup from "../components/popup/CentralPopup";
import BottomPopup from "../components/popup/BottomPopup";
import KakaoLoginButton from "../components/login/kakaologinbutton";
import { setTokens } from "../service/authService";
import PickWithoutCart from "../components/picksWithCart/PickWithoutCartComponent";
import CartInfo from "../components/cartInfo/CartInfo";
import PickWithCart from "../components/picksWithCart/PickWithCart";
import { getPicks } from "../api/getPicks";
import useGetPicks from "../hooks/userGetPick";

const CartPage = ({ isLoggedIn, handleLoginSuccess }) => {
  const [cartData, setCartData] = useState();
  const { cartId } = useParams();
  const [pickData, setPickData] = useState();
  const { showPopup, hidePopup } = usePopup();

  const handleDeleteCart = () => {
    showPopup(
      "central",
      <CentralPopup
        message="카트를 삭제하시겠습니까?"
        button1={{ text: "예", onClick: () => alert("예 클릭됨") }}
        button2={{ text: "아니오", onClick: () => alert("아니오 클릭됨") }}
      />
    );
    console.log("Cart deleted");
  };
  console.log("a");
  console.log(pickData);
  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <CartInfo
            cartName={pickData ? pickData.cart.name : "로딩중"}
            userName={pickData ? pickData.cart.host.name : "로딩중"}
            onDelete={handleDeleteCart}
          />
          <div className="app-body">
            <PickWithCart
              pickData={pickData}
              setPickData={setPickData}
              cartId={cartId}
              cartData={cartData}
              setCartData={setCartData}
            />
          </div>
        </div>
      ) : (
        <KakaoLoginButton onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default CartPage;
