// src/App.js
import React, { useState } from "react";
import "./App.css";
import useGetPicks from "./hooks/userGetPick";
import useGetCarts from "./hooks/userGetCart";
import Picks from "./components/picks/Picks";
import Carts from "./components/carts/Carts";
import { PopupProvider, usePopup } from "./context/PopupContext";
import CentralPopup from "./components/popup/CentralPopup";
import BottomPopup from "./components/popup/BottomPopup";
import NewCartInput from "./components/createCart/NewCartInput";

const App = () => {
  const [cartData, setCartData] = useState();
  const [pickData, setPickData] = useState();
  const { showPopup, hidePopup } = usePopup();

  // const { getPickData, getPickLoading, getPickError } = useGetPicks();
  // const { getCartLoading, getCartErro } = useGetCarts(setCartData);

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

  return (
    <div className="App">
      <Carts
        // onAdd={showCartsPopup}
        cartData={cartData}
        setCartData={setCartData}
      />
      <div className="app-body">
        <Picks />
      </div>
    </div>
  );
};
const AppWrapper = () => (
  <PopupProvider>
    <App />
  </PopupProvider>
);

export default AppWrapper;
