// src/components/picks/NewPickInput.js
import React, { useState } from "react";
import "./newPickInput.css"; // Import the CSS file for styling
import { addPick } from "../../api/addPick";
import { movePick } from "../../api/movePick";
import { usePopup } from "../../context/PopupContext";
import InvitePopup from "../popup/InvitePopup";
import ErrorPopup from "../popup/ErrorPopup";
import PickErrorPopup from "../popup/PickErrorPopup";

const NewPickInput = ({ onBack, callBackOnSave, cartId }) => {
  const [pickUrl, setPickUrl] = useState("");
  const { showPopup, hidePopup } = usePopup();
  const handleSave = async () => {
    try {
      const pick = await addPick(pickUrl);
      if (cartId && cartId != "") {
        await movePick([pick.id], "", cartId, false);
      }

      callBackOnSave(pick);
    } catch (err) {
      if (err.response.status == 402) {
        showPopup(
          "error",
          <InvitePopup
            title="친구를 초대하고 무한으로 즐기세요!"
            message="공유한 링크를 통해 친구가 가입하면 
          오꾸를 제한없이 사용할 수 있습니다!"
          />
        );
      } else {
        showPopup("error", <PickErrorPopup />);
      }
    }
  };

  return (
    <div className="new-pick-input">
      <div className="header">
        <button className="back-button" onClick={onBack}>
          &lt;
        </button>
        <h2 className="title">추가할 상품을 본 url을 붙여넣으세요!</h2>
        <button className="save-button" onClick={handleSave}>
          Pick!
        </button>
      </div>
      <textarea
        className="text"
        value={pickUrl}
        onChange={(e) => setPickUrl(e.target.value)}
        placeholder="https://okku.kr"
      />
    </div>
  );
};

export default NewPickInput;
