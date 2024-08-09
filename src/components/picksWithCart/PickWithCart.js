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
import ErrorPopup from "../popup/ErrorPopup";

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
        title="옷을 카트에서 삭제하시겠습니까?"
        message="전체 목록에서는 옷이 유지됩니다."
        button1={{
          text: "예",
          onClick: async () => {
            await deletePicks(
              selectedPicks.map((el) => el.id),
              cartId,
              false
            );
            const carts = await getCarts();
            const picks = await getPicks(cartId);
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

  const showCartPopup = async () => {
    let tempCart = await getCarts();
    tempCart.carts = tempCart.carts.filter((cart) => cart.id !== cartId);
    setCartData(tempCart);
    showPopup(
      "bottom",
      <Carts
        cartData={tempCart}
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

  const showAddPickToCartPopup = async (clickedCartId) => {
    showPopup(
      "central",
      <CentralPopup
        title="다른 카트로 옮길까요?"
        message="옮겨진 옷은 기존 카트에서는 사라져요."
        button1={{
          text: "여기도 남길게요",
          onClick: async () => {
            try {
              await movePick(
                selectedPicks.map((el) => el.id),
                cartId, // 현재 최상단 카트의 ID
                clickedCartId,
                false
              );
              const carts = await getCarts();
              setCartData(carts);
              setIsEditing(false);
              setSelectedPicks([]);
              setNotification("픽이 카트에 담겼습니다.");
              hidePopup();
            } catch (error) {
              hidePopup(); // 기존 팝업 닫기
              showPopup(
                "error",
                <ErrorPopup
                  title="중복된 픽"
                  message="이미 카트에 담겨있는 픽입니다."
                  onClick={hidePopup}
                />
              );
            }
          },
        }}
        button2={{
          text: "확인",
          onClick: async () => {
            try {
              await movePick(
                selectedPicks.map((el) => el.id),
                cartId, // 현재 최상단 카트의 ID
                clickedCartId,
                true
              );
              const carts = await getCarts();
              const picks = await getPicks(cartId);
              setPickData(picks);
              setCartData(carts);
              setIsEditing(false);
              setSelectedPicks([]);
              setNotification("픽이 이동되었습니다.");
              hidePopup();
            } catch (error) {
              hidePopup(); // 기존 팝업 닫기
              showPopup(
                "error",
                <ErrorPopup
                  title="중복된 픽"
                  message="이미 카트에 담겨있는 픽입니다."
                  onClick={hidePopup}
                />
              );
            }
          },
        }}
      />
    );
  };

  return (
    <div className="picks-wrapper">
      <div className="header">
        <div className="header-left">
          <p></p>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default PickWithCart;
