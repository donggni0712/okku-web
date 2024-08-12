// src/components/Carts.js
import React from "react";
import Cart from "../cart/Cart";
import "./carts.css";
import useGetCarts from "../../hooks/userGetCart";
import { usePopup } from "../../context/PopupContext";
import NewCartInput from "../createCart/NewCartInput";
import { getCarts } from "../../api/getCarts";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga";

const Carts = ({ cartData, setCartData, isPopup = false, handleClick }) => {
  const { getCartLoading, getCartErro } = useGetCarts(setCartData);
  const { showPopup, hidePopup } = usePopup();
  const navigate = useNavigate();
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
  const showCartsPopup = () => {
    console.log("asd ", cartData);
    showPopup(
      "bottom",
      <Carts
        cartData={cartData}
        setCartData={setCartData}
        isPopup={true}
        handleClick={handleClick}
      />
    );
  };

  const goHome = () => {
    navigate("/");
  };

  const handleAddCart = () => {
    ReactGA.event({
      category: "Create Cart",
      action: `Clicked Create Cart button`,
    });
    if (isPopup) {
      showPopup(
        "bottom",
        <NewCartInput
          onBack={showCartsPopup}
          callBackOnSave={callBackSaveCart}
          setCartData={setCartData}
          pickIds={[]}
        />
      );
    } else {
      showPopup(
        "bottom",
        <NewCartInput
          onBack={hidePopup}
          callBackOnSave={callBackSaveCart}
          setCartData={setCartData}
          pickIds={[]}
        />
      );
    }
  };

  const callBackSaveCart = async () => {
    let updatedCarts = await getCarts();
    setCartData(updatedCarts);
    hidePopup();
  };
  return (
    <div className="carts-container">
      <div className="carts">
        <Cart {...allViewCart} handleClick={goHome} />
        {cartData ? (
          cartData.carts.map((cart, index) => (
            <Cart
              cartId={cart.id}
              key={index}
              images={cart.picksImages}
              name={cart.name}
              handleClick={handleClick}
            />
          ))
        ) : (
          <></>
        )}
        <div className="add-cart">
          <Cart {...addCart} handleClick={handleAddCart} />
        </div>
      </div>
    </div>
  );
};

export default Carts;
