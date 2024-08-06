import React, { useState, useEffect } from "react";
import "./App.css";
import useGetPicks from "./hooks/userGetPick";
import useGetCarts from "./hooks/userGetCart";
import Picks from "./components/picks/Picks";
import Carts from "./components/carts/Carts";
import { PopupProvider, usePopup } from "./context/PopupContext";
import CentralPopup from "./components/popup/CentralPopup";
import BottomPopup from "./components/popup/BottomPopup";
import NewCartInput from "./components/createCart/NewCartInput";
import KakaoLoginButton from "./components/login/kakaologinbutton";
import { setTokens } from "./service/authService";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartData, setCartData] = useState();
  const [pickData, setPickData] = useState();
  const { showPopup, hidePopup } = usePopup();

  useEffect(() => {
    // 카카오 로그인 여부 확인
    if (window.Kakao.Auth.getAccessToken()) {
      setIsLoggedIn(true);
      setTokens(
        window.Kakao.Auth.getAccessToken(),
        localStorage.getItem("refreshToken")
      );
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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

  const handleBottomPopup = () => {
    showPopup(
      "bottom",
      <BottomPopup
        button1={{ text: "버튼 1", onClick: () => alert("버튼 1 클릭됨") }}
        button2={{ text: "버튼 2", onClick: () => alert("버튼 2 클릭됨") }}
        button3={{ text: "버튼 3", onClick: () => alert("버튼 3 클릭됨") }}
      />
    );
  };

  const handleLoginSuccess = (tokens) => {
    setIsLoggedIn(true);
    console.log("dd");
    console.log(tokens);
    setTokens(tokens.accessToken, tokens.refreshToken);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <Carts cartData={cartData} setCartData={setCartData} />
          <div className="app-body">
            <Picks />
          </div>
        </>
      ) : (
        <KakaoLoginButton onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

const AppWrapper = () => (
  <PopupProvider>
    <App />
  </PopupProvider>
);

export default AppWrapper;
