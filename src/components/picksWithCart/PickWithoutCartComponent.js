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
import ErrorPopup from "../popup/ErrorPopup";
import InvitePopup from "../popup/InvitePopup";
import ReactGA from "react-ga";

const PickWithoutCart = ({
  pickData,
  setPickData,
  cartData,
  setCartData,
  notification,
  setNotification,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPicks, setSelectedPicks] = useState([]);
  const { showPopup, hidePopup } = usePopup();

  const showAddPickPopup = () => {
    ReactGA.event({
      category: "Add Pick",
      action: `Clicked MoAddve pick button`,
      label: `All Pick Page`,
    });
    showPopup(
      "bottom",
      <NewPickInput
        onBack={hidePopup}
        callBackOnSave={callBackAddCart}
        cartId={""}
      />
    );
  };

  const callBackAddCart = (pick) => {
    try {
      let tempPickData = { ...pickData };
      tempPickData.picks = [pick, ...pickData.picks];

      setPickData(tempPickData);
      setNotification("옷을 Pick! 했습니다.");
      hidePopup();
    } catch (err) {
      showPopup(
        "error",
        <InvitePopup
          title="아이템은 최대 9개까지 픽 가능합니다"
          message="친구가 회원가입하면 아이템을 무제한으로 픽할 수 있습니다!"
        />
      );
    }
  };

  const togglePickSelection = (pick) => {
    setSelectedPicks((prevSelected) =>
      prevSelected.includes(pick)
        ? prevSelected.filter((item) => item !== pick)
        : [...prevSelected, pick]
    );
  };

  const handleDelete = () => {
    ReactGA.event({
      category: "Delete Pick",
      action: `Clicked Delete pick button`,
      label: `All Pick Page`,
    });
    showPopup(
      "central",
      <CentralPopup
        title="픽을 삭제하시겠습니까?"
        message="픽이 담긴 모든 카트에서도 해당 픽이 삭제됩니다."
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
    ReactGA.event({
      category: "Move Pick",
      action: `Clicked Move pick button`,
      label: `Move Pick Page`,
    });
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

  const showAddPickToCartPopup = async (cartId) => {
    showPopup(
      "central",
      <CentralPopup
        title="픽을 카트에 담겠습니까?"
        button1={{
          text: "예",
          onClick: async () => {
            try {
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
            } catch (error) {
              hidePopup(); // 기존 팝업 닫기

              if (error.response && error.response.status === 400) {
                showPopup(
                  "error",
                  <ErrorPopup
                    title="중복된 픽"
                    message="이미 카트에 담겨있는 픽입니다."
                    onClick={hidePopup}
                  />
                );
              } else {
                alert("Error adding pick to cart:", error);
                setNotification("카트에 픽을 담는 중 문제가 발생했습니다.");
              }
            }
          },
        }}
        button2={{ text: "아니오", onClick: hidePopup }}
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

  return (
    <div className="picks-wrapper">
      <div className="header">
        <div className="header-left">
          <p>전체 픽</p>
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
        <div className={`picks-container ${isEditing ? "is-editing" : ""}`}>
          <Picks
            pickData={pickData}
            setPickData={setPickData}
            cartId={""}
            isEditing={isEditing}
            selectedPicks={selectedPicks}
            togglePickSelection={togglePickSelection}
          />
        </div>
        {isEditing && (
          <div className="edit-popup-button">
            <button onClick={showCartPopup}>픽 이동</button>
            <button onClick={handleDelete}>픽 삭제</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickWithoutCart;
