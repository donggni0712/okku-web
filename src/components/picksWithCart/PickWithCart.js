import React, { useState } from "react";
import "./pickWithCart.css";
import Picks from "../picks/Picks";
import NewPickInput from "../addPick/NewPickInput";
import { usePopup } from "../../context/PopupContext";
import CentralPopup from "../popup/CentralPopup";
import Carts from "../carts/Carts";
import { movePick } from "../../api/movePick";
import { getCarts } from "../../api/getCarts";
import { deletePicks } from "../../api/deletePicks";
import { getPicks } from "../../api/getPicks";
import Notification from "../popup/Notification";

const PickWithCart = ({
  pickData,
  setPickData,
  cartData,
  setCartData,
  cartId,
  setNotification,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPicks, setSelectedPicks] = useState([]);
  const { showPopup, hidePopup } = usePopup();

  const showAddPickPopup = () => {
    showPopup(
      "bottom",
      <NewPickInput
        onBack={hidePopup}
        callBackOnSave={callBackAddCart}
        cartId={cartId}
      />
    );
  };

  const showChooseAdd = () => {
    showPopup("bottom", <div></div>);
  };

  const callBackAddCart = (pick) => {
    let tempPickData = pickData;
    tempPickData.picks = [pick, ...pickData.picks];

    setPickData(tempPickData);
    setNotification("옷을 Pick! 했습니다.");
    hidePopup();
  };

  const togglePickSelection = (pick) => {
    setSelectedPicks((prevSelected) =>
      prevSelected.includes(pick)
        ? prevSelected.filter((item) => item !== pick)
        : [...prevSelected, pick]
    );
  };

  const handledelete = () => {
    showPopup(
      "central",
      <CentralPopup
        message="삭제하시겠습니까?"
        button1={{
          text: "예",
          onClick: async () => {
            await deletePicks(
              selectedPicks.map((el) => el.id),
              "",
              true
            );
            const carts = await getCarts();
            const picks = await getPicks();
            setCartData(carts);
            setPickData(picks);
            setIsEditing(false);
            setSelectedPicks([]);
            setNotification("픽이 삭제되었습니다.");
            hidePopup();
          },
        }}
        button2={{ text: "아니오", onClick: hidePopup }}
      />
    );
  };

  const showCartPopup = () => {
    showPopup(
      "bottom",
      <Carts
        cartData={cartData}
        setCartData={setCartData}
        isPopup={true}
        handleClick={showAddPickToCartPopup}
      />
    );
  };
  const handleEditToggle = () => {
    setIsEditing((prev) => {
      if (prev) {
        setSelectedPicks([]);
      }
      return !prev;
    });
  };
  const showAddPickToCartPopup = async (cartId) => {
    showPopup(
      "central",
      <CentralPopup
        message="픽을 카트에 담겠습니까?"
        button1={{
          text: "예",
          onClick: async () => {
            await movePick(
              selectedPicks.map((el) => el.id),
              "",
              cartId,
              false
            );
            const carts = await getCarts();
            setCartData(carts);
            setIsEditing(false);
            setSelectedPicks([]);
            setNotification("픽이 카트에 담겼습니다.");
            hidePopup();
          },
        }}
        button2={{ text: "아니오", onClick: hidePopup }}
      />
    );
  };

  const handleCompare = () => {
    showPopup(
      "central",
      <CentralPopup
        message="비교 뷰 미완"
        button1={{ text: "예", onClick: () => alert("예 클릭됨") }}
        button2={{ text: "아니오", onClick: () => alert("아니오 클릭됨") }}
      />
    );
  };

  return (
    <div className="picks-wrapper">
      <div className="header">
        <div className="header-left">
          <p>내 픽</p>
        </div>
        <div className="header-right">
          <button className="add-button" onClick={showAddPickPopup}>
            옷 추가
          </button>
          <button className="edit-button" onClick={handleEditToggle}>
            {isEditing ? "취소" : "선택"}
          </button>
        </div>
      </div>
      {isEditing && <div className="overlay"></div>}
      <div className={`about-picks`}>
        <Picks
          pickData={pickData}
          setPickData={setPickData}
          cartId={cartId}
          isEditing={isEditing}
          selectedPicks={selectedPicks}
          togglePickSelection={togglePickSelection}
        />
        {isEditing && (
          <div className="edit-popup-button">
            <button onClick={showCartPopup}>픽 이동</button>
            <button onClick={handledelete}>픽 삭제</button>
            <button onClick={handleCompare}>옷 비교</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickWithCart;
