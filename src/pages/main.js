// src/components/Main.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carts from "../components/carts/Carts";
import PickWithoutCart from "../components/picksWithCart/PickWithoutCartComponent";
import LandingPage from "../components/landingpage";

const Main = ({
  handleLoginSuccess,
  isLoggedIn,
  notification,
  setNotification,
}) => {
  const [cartData, setCartData] = useState();
  const [pickData, setPickData] = useState();
  const navigate = useNavigate();

  useEffect(() => {}, [cartData]);

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
        <>
          <LandingPage onLoginSuccess={handleLoginSuccess} />
        </>
      )}
    </div>
  );
};

export default Main;
