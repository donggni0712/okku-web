// src/context/PopupContext.js
import React, { createContext, useContext, useState } from "react";
import Popup from "../components/popup/Popup";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState({ type: null, content: null });

  const showPopup = (type, content) => {
    setPopup({ type, content });
  };

  const hidePopup = () => {
    setPopup({ type: null, content: null });
  };

  return (
    <PopupContext.Provider value={{ showPopup, hidePopup }}>
      {children}
      <Popup type={popup.type} content={popup.content} onClose={hidePopup} />
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  return useContext(PopupContext);
};
