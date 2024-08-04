// src/App.js
import React from "react";
import "./App.css";
import useGetPicks from "./hooks/userGetPick";
import useGetCarts from "./hooks/userGetCart";
import Picks from "./components/picks/Picks";
import Carts from "./components/carts/Carts";

const App = () => {
  const { getPickData, getPickLoading, getPickError } = useGetPicks();
  const { getCartData, getCartLoading, getCartErro } = useGetCarts();

  if (getPickLoading || getCartLoading) {
    return <div>Loading...</div>;
  }

  if (getPickError || getCartErro) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="App">
      <Carts carts={getCartData.carts} onAdd={null} />
      <div className="app-body">
        <Picks picks={getPickData.picks} />
      </div>
    </div>
  );
};

export default App;
