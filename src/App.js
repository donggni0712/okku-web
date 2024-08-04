// src/App.js
import React from "react";
import "./App.css";
import useGetPicks from "./hooks/userGetPick";
import useGetCarts from "./hooks/userGetCart";
import Picks from "./components/picks/Picks";
import Carts from "./components/carts/Carts";
import { PopupProvider, usePopup } from "./context/PopupContext";
import CentralPopup from "./components/popup/CentralPopup";
import BottomPopup from "./components/popup/BottomPopup";

const App = () => {
  const { getPickData, getPickLoading, getPickError } = useGetPicks();
  const { getCartData, getCartLoading, getCartErro } = useGetCarts();
  const { showPopup } = usePopup();

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

  const handleCartsPopup = () => {
    showPopup(
      "bottom",
      <Carts carts={getCartData.carts} onAdd={handleCartsPopup} />
    );
  };

  if (getPickLoading || getCartLoading) {
    return <div>Loading...</div>;
  }

  if (getPickError || getCartErro) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="App">
      <Carts carts={getCartData.carts} onAdd={handleCartsPopup} />
      <div className="app-body">
        <Picks picks={getPickData.picks} />
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
