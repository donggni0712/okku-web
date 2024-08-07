// src/components/Main.js
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Carts from "../components/carts/Carts";
import { usePopup } from "../context/PopupContext";
import CentralPopup from "../components/popup/CentralPopup";
import BottomPopup from "../components/popup/BottomPopup";
import KakaoLoginButton from "../components/login/kakaologinbutton";
import { setTokens } from "../service/authService";
import { movePick } from "../api/movePick";
import PickWithoutCart from "../components/picksWithCart/PickWithoutCartComponent";

const Main = ({
  handleLoginSuccess,
  isLoggedIn,
  notification,
  setNotification,
}) => {
  const [cartData, setCartData] = useState();
  const [pickData, setPickData] = useState();
  const { showPopup, hidePopup } = usePopup();
  const navigate = useNavigate();
  const handleCentralPopup = () => {
    showPopup(
      "central",
      <CentralPopup
        message="저장하시겠습니까?"
        button1={{ text: "예", onClick: () => alert("예 클릭됨") }}
        button2={{ text: "아니오", onClick: () => alert("아니오 클릭됨") }}
      />
    );
  };
  useEffect(() => {
    console.log("cartData changed: ", cartData);
  }, [cartData]);

  const handleBottomPopup = () => {
    showPopup(
      "bottom",
      <BottomPopup
        button1={{ text: "카트에 담기", onClick: () => alert("버튼 1 클릭됨") }}
        button2={{ text: "픽 삭제", onClick: () => alert("버튼 2 클릭됨") }}
        button3={{ text: "픽 비교", onClick: () => alert("버튼 3 클릭됨") }}
      />
    );
  };

  const handleClickToCartMove = (cartId) => {
    navigate(`/cart/${cartId}`); // Change URL to /cart
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <Carts
            cartData={cartData}
            setCartData={setCartData}
            handleClick={handleClickToCartMove}
            notification={notification}
            setNotification={setNotification}
          />
          <div className="app-body">
            <PickWithoutCart
              pickData={pickData}
              setPickData={setPickData}
              cartData={cartData}
              setCartData={setCartData}
              notification={notification}
              setNotification={setNotification}
            />
          </div>
        </>
      ) : (
        <KakaoLoginButton onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default Main;
