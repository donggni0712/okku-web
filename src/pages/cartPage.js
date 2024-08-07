// src/components/Main.js
import React, { useState, useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
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
import { deleteCart } from "../api/deleteCart";
import { getCarts } from "../api/getCarts";

const CartPage = ({ isLoggedIn, handleLoginSuccess, setNotification }) => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState();
  const { cartId } = useParams();
  const [pickData, setPickData] = useState();
  const { showPopup, hidePopup } = usePopup();

  const handleDeleteCart = () => {
    showPopup(
      "central",
      <CentralPopup
        title="카트를 삭제하시겠습니까?"
        message="옷이 담긴 모든 카트에서도 해당 옷이 삭제됩니다."
        button1={{
          text: "예",
          onClick: async () => {
            await deleteCart(cartId);
            setNotification("카트를 삭제했습니다.");
            hidePopup();
            navigate(-1);
          },
        }}
        button2={{ text: "아니오", onClick: hidePopup }}
      />
    );
    console.log("Cart deleted");
  };
  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <CartInfo
            cartName={pickData ? pickData.cart.name : "로딩중"}
            userName={pickData ? pickData.cart.host.name : "로딩중"}
            handleDeleteCart={handleDeleteCart}
          />
          <div className="app-body">
            <PickWithCart
              pickData={pickData}
              setPickData={setPickData}
              cartId={cartId}
              cartData={cartData}
              setCartData={setCartData}
              setNotification={setNotification}
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
