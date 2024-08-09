// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PopupProvider } from "./context/PopupContext";
import Main from "./pages/main";
import CartPage from "./pages/cartPage";
import { setTokens } from "./service/authService";
import Notification from "./components/popup/Notification";
import PickPage from "./pages/pickPage";
import PickPageWithoutLogin from "./pages/pickPageWithoutLogin";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    if (window.Kakao.Auth && window.Kakao.Auth.getAccessToken()) {
      setIsLoggedIn(true);
      setTokens(
        window.Kakao.Auth.getAccessToken(),
        localStorage.getItem("refreshToken")
      );
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLoginSuccess = (tokens) => {
    setIsLoggedIn(true);
    setTokens(tokens.accessToken, tokens.refreshToken);
  };
  return (
    <Router>
      <PopupProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                handleLoginSuccess={handleLoginSuccess}
                isLoggedIn={isLoggedIn}
                notification={notification}
                setNotification={setNotification}
              />
            }
          />
          <Route
            path="/cart/:cartId"
            element={
              <CartPage
                handleLoginSuccess={handleLoginSuccess}
                isLoggedIn={isLoggedIn}
                notification={notification}
                setNotification={setNotification}
              />
            }
          />
          <Route
            path="/pick/:pickId"
            element={
              <PickPage
                handleLoginSuccess={handleLoginSuccess}
                isLoggedIn={isLoggedIn}
                notification={notification}
                setNotification={setNotification}
              />
            }
          />
          <Route
            path="/demo"
            element={
              <PickPageWithoutLogin
                handleLoginSuccess={handleLoginSuccess}
                isLoggedIn={isLoggedIn}
                notification={notification}
                setNotification={setNotification}
              />
            }
          />
        </Routes>
      </PopupProvider>
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </Router>
  );
};

export default App;
