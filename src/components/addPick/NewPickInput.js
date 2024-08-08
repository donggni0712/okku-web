// src/components/picks/NewPickInput.js
import React, { useState } from "react";
import "./newPickInput.css"; // Import the CSS file for styling
import { addPick } from "../../api/addPick";
import { movePick } from "../../api/movePick";

const NewPickInput = ({ onBack, callBackOnSave, cartId }) => {
  const [pickUrl, setPickUrl] = useState("");

  const handleSave = async () => {
    console.log("call");
    const pick = await addPick(pickUrl);
    if (cartId && cartId != "") {
      console.log("move", cartId);
      await movePick([pick.id], "", cartId, false);
    }
    console.log(pick);
    callBackOnSave(pick);
  };

  return (
    <div className="new-pick-input">
      <div className="header">
        <button className="back-button">
          <img
            src="assets/back-button.png"
            alt="<"
            className="back-button-img"
            onClick={onBack}
          />
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
